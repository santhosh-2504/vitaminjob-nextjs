import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoadmaps, clearRoadmapErrors } from '@/store/slices/roadmapSlice.js';
import { clearAllUserErrors } from '@/store/slices/userSlice.js';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner.jsx';
import { useRouter } from 'next/router';
import { Download } from 'lucide-react';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const RoadmapPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Start with default page 1
  const searchInputRef = useRef(null);

  // Load saved page number after component mounts
  useEffect(() => {
    const savedPage = localStorage.getItem('roadmapPageNumber');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);

  // Apply debouncing to search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { roadmaps, loading, error, totalPages } = useSelector((state) => state.roadmap);

  const { user, error: userError } = useSelector((state) => state.user);

  // Clear errors when component mounts or unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (userError && userError !== "Please login to access this resource") {
      toast.error(userError);
      dispatch(clearAllUserErrors());
    }
  }, [userError, dispatch]);

  // Reset page only for filter changes, not for navigation back
  useEffect(() => {
    if (selectedNiche !== "All" || debouncedSearchTerm !== "") {
      setCurrentPage(1);
      localStorage.setItem('roadmapPageNumber', '1');
    }
  }, [selectedNiche, debouncedSearchTerm]);

  // Modify the fetch effect to ensure it uses the saved page
  useEffect(() => {
    if (error && error !== "User not authenticated") {
      toast.error(error);
      dispatch(clearRoadmapErrors());
    }

    const savedPage = localStorage.getItem('roadmapPageNumber');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
    
    dispatch(fetchRoadmaps(selectedNiche, debouncedSearchTerm, currentPage));
  }, [dispatch, error, selectedNiche, debouncedSearchTerm, currentPage]);

  const handleDownload = (url) => {
    try {
        const googleDriveIdMatch = url.match(/[-\w]{25,}/);
        const googleDriveId = googleDriveIdMatch ? googleDriveIdMatch[0] : null;
        const directDownloadUrl = googleDriveId 
            ? `https://drive.google.com/uc?export=download&id=${googleDriveId}` 
            : url;

        const link = document.createElement('a');
        link.href = directDownloadUrl;
        link.setAttribute('download', 'roadmap.pdf'); // Suggests a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download error:", error);
        toast.error("Failed to start download");
    }
};

  const niches = ['All', 'Frontend', 'Backend', 'Web Development', 'Cloud Computing', 'Programming', 'DevOps'];

  // Add effect to maintain focus after re-render
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [roadmaps]); // Re-focus when roadmaps are filtered

  // Add useEffect for scroll behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Update handlePageChange to save page number
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('roadmapPageNumber', newPage.toString());
    }
  };

  // Restore scroll position when returning to roadmaps list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScrollPosition = localStorage.getItem('roadmapsScrollPosition');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
          localStorage.removeItem('roadmapsScrollPosition');
        }, 0);
      }
    }
  }, []);

  return (
    <>
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
      {/* Fixed Search Section */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-gray-100 dark:bg-gray-900 px-4 py-2">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search roadmaps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {niches.map((niche) => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-42 max-w-7xl md:pt-28">
        <div className="grid grid-cols-12 gap-4">
          {/* Left sidebar for ads */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-44 bg-white dark:bg-gray-800" />
          </div>

          {/* Main content */}
          <div className="col-span-12 lg:col-span-8">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Spinner />
              </div>
            ) : (
              <>
                {/* Roadmaps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roadmaps.map((roadmap) => (
                    <div
                      key={roadmap._id}
                      className="relative bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                    >
                      <div className="p-4 pb-16">
                        {/* Header with Title and Star */}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                            {roadmap.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {roadmap.description}
                        </p>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(roadmap.url)}
                        className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {roadmaps.length === 0 && (
                  <div className="flex flex-col items-center justify-center space-y-4 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                    <img
                      src="./notfound.png"
                      alt="no-roadmaps-found"
                      className="max-w-xs opacity-70"
                    />
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      No roadmaps found matching your criteria
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {roadmaps.length > 0 && (
                  <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white transition`}
                    >
                      Previous
                    </button>

                    <span className="text-gray-600 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white transition`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right sidebar for ads */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-44 bg-white dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RoadmapPage;