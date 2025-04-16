import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaLaptopHouse,
  FaCalendarAlt,
} from "react-icons/fa";
import Fuse from "fuse.js";
// SEO helper functions
const generateMetaDescription = (selectedCity, selectedNiche, searchKeyword, totalJobs = 0) => {
  let description = `Browse ${totalJobs} open positions`;
  if (searchKeyword) {
    description = `${totalJobs} ${searchKeyword} jobs available`;
  }
  if (selectedCity && selectedCity !== "All") {
    description += ` in ${selectedCity}`;
  }
  if (selectedNiche && selectedNiche !== "All") {
    description += ` for ${selectedNiche} positions`;
  }
  return description + ". Find your next career opportunity with us.";
};

const generateJobListingSchema = (jobs, baseUrl) => ({
  "@context": "https://schema.org",
  "@type": "JobPostingCollection",
  "itemListElement": jobs.map((job) => {
    // Date validation utility
    const safeDate = (dateString) => {
      if (!dateString) return null; // Return null if the date is missing
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date; // Return null if the date is invalid
    };

    // Validate both dates
    const datePosted = safeDate(job.createdAt);
    const validThrough = safeDate(job.expiryDate);

    return {
      "@type": "JobPosting",
      "@id": `${baseUrl}/jobs/${job.slug}`,
      "title": job.title,
      "description": job.shortDescription,
      "employmentType": job.jobType,
      "datePosted": datePosted ? datePosted.toISOString() : null, // Convert to ISO 8601 if valid
      "validThrough": validThrough ? validThrough.toISOString() : null, // Convert to ISO 8601 if valid
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.companyName,
        "sameAs": job.companyWebsite || baseUrl,
        "logo": job.companyLogo,
        "description": job.companyDescription,
      },
      "jobLocation": job.location && job.location.length > 0 ? {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location[0] || "Unknown City",
          "addressRegion": job.location[1] || "Unknown Region",
          "addressCountry": "IN",
        },
      } : null,
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.salary || 0,
          "unitText": "YEAR",
        },
      },
      "skills": job.skills ? job.skills.join(", ") : "",
      "experienceRequirements": "EntryLevel", // Hardcoded for fresher jobs
      "industry": job.industry,
      "jobBenefits": job.benefits ? job.benefits.join(", ") : "",
      "applicantLocationRequirements": job.remoteOption ? "Remote" : "On-site",
      "keywords": job.keywords ? job.keywords.join(", ") : "",
    };
  }),
});

// Simple JSON sanitization for inline scripts
const sanitizeJSON = (data) => {
  return JSON.stringify(data, null, 2)  // Add indentation for readability
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
};

// City variations mapping (if needed later)
const cityVariations = {
  ahmedabad: ["ahmedabad", "ahmedabad gujarat"],
  bangalore: ["bangalore", "bengaluru", "banglore", "bengalooru", "bengaluru karnataka", "bangalore karnataka"],
  bhubaneswar: ["bhubaneswar", "bhubaneswar odisha"],
  chennai: ["chennai", "madras", "chennai tamil nadu"],
  coimbatore: ["coimbatore", "kovai"],
  delhi: ["delhi", "new delhi", "delhi ncr", "new delhi india"],
  gurugram: ["gurugram", "gurgaon", "gurgaon haryana", "gurugram haryana"],
  hyderabad: ["hyderabad", "hyderbad", "hyderabad telangana"],
  indore: ["indore", "indore madhya pradesh"],
  jaipur: ["jaipur", "jaipur rajasthan"],
  kochi: ["kochi", "cochin"],
  kolkata: ["kolkata", "calcutta", "kolkata west bengal"],
  lucknow: ["lucknow", "lucknow uttar pradesh"],
  mumbai: ["mumbai", "bombay", "mumbai maharashtra", "bombay maharashtra"],
  mysuru: ["mysuru", "mysore"],
  nagpur: ["nagpur", "nagpur maharashtra"],
  noida: ["noida", "noida uttar pradesh", "noida up", "gautam buddha nagar"],
  pune: ["pune", "poona", "pune maharashtra"],
  thiruvananthapuram: ["thiruvananthapuram", "trivandrum"],
  vadodara: ["vadodara", "baroda"],
  visakhapatnam: ["visakhapatnam", "vizag", "visakhapatnam andhra pradesh"],
};


// -------------------
// Server-side Data Fetching
// -------------------

import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export async function getServerSideProps(context) {
  const { query } = context;
  const selectedCity = query.city || "All";
  const selectedNiche = query.niche || "All";
  const searchKeyword = query.q || "";
  const currentPage = query.page ? parseInt(query.page) : 1;
  const limit = parseInt(query.limit || 6);

  try {
    await dbConnect();
    
    const queryObj = {};
    
    // Match city filter with variations
    if (selectedCity && selectedCity !== "All") {
      const cityVariants = cityVariations[selectedCity.toLowerCase()] || [selectedCity]; // Fallback to selectedCity if not in map
      queryObj.location = { $in: cityVariants.map(variant => new RegExp(variant, "i")) }; // Case-insensitive match
    }

    // Niche filter (updated to support multiple niches)
    if (selectedNiche && selectedNiche !== "All") {
      const niches = selectedNiche.split(',').map(niche => niche.trim());
      queryObj.niche = { $in: niches };
    }

    // Keyword search (already working)
    if (searchKeyword) {
      queryObj.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { lengthyDescription: { $regex: searchKeyword, $options: "i" } },
        { shortDescription: { $regex: searchKeyword, $options: "i" } },
        { companyName: { $regex: searchKeyword, $options: "i" } },
        { jobType: { $regex: searchKeyword, $options: "i" } },
        { skills: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const totalJobs = await Job.countDocuments(queryObj);
    const skip = (currentPage - 1) * limit;
    
    const jobs = await Job.find(queryObj)
      .select("-__v")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return {
      props: {
        initialSelectedCity: selectedCity,
        initialSelectedNiche: selectedNiche,
        initialSearchKeyword: searchKeyword,
        initialCurrentPage: currentPage,
        initialJobs: JSON.parse(JSON.stringify(jobs)),
        initialTotalPages: Math.ceil(totalJobs / limit),
        initialTotalJobs: totalJobs,
        initialAppliedJobs: [],
      },
    };
  } catch (error) {
    return {
      props: {
        initialSelectedCity: selectedCity,
        initialSelectedNiche: selectedNiche,
        initialSearchKeyword: searchKeyword,
        initialCurrentPage: currentPage,
        initialJobs: [],
        initialTotalPages: 0,
        initialTotalJobs: 0,
        initialAppliedJobs: [],
        error: error.message,
      },
    };
  }
}

// -------------------
// The Fully SSR Jobs Page Component
// -------------------

const Jobs = ({
  initialSelectedCity,
  initialSelectedNiche,
  initialSearchKeyword,
  initialCurrentPage,
  initialJobs,
  initialTotalPages,
  initialTotalJobs,
}) => {
  const router = useRouter();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  // State for controlled inputs
  const [searchInput, setSearchInput] = useState(initialSearchKeyword);
  const [selectedCity, setSelectedCity] = useState(initialSelectedCity);
  const [selectedNiche, setSelectedNiche] = useState(initialSelectedNiche);

  // Autocomplete states
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSearchData, setAllSearchData] = useState([]);
  const [fuse, setFuse] = useState(null);
  const searchRef = useRef(null);
  
  const jobs = initialJobs;
  const totalPages = initialTotalPages;
  const totalJobs = initialTotalJobs;
  const currentPage = initialCurrentPage;

  // Generate structured data for job listings
  const jobListingSchema = generateJobListingSchema(initialJobs, baseUrl);

   // Fetch all job titles and company names for autocomplete on component mount
   useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetch('/api/jobs/titles');
        const data = await response.json();
        if (data.success && Array.isArray(data.searchData)) {
          setAllSearchData(data.searchData);
          
          // Initialize Fuse with the fetched data
          const fuseOptions = {
            keys: ['title', 'companyName'],
            threshold: 0.3,
            distance: 100,
            includeScore: true
          };
          setFuse(new Fuse(data.searchData, fuseOptions));
        }
      } catch (error) {
        console.error("Failed to fetch search data:", error);
      }
    };
    
    fetchSearchData();
  }, []);

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // Debouncing effect for search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Only update if current page hasn't changed
      if (currentPage === initialCurrentPage) {
        updateQueryParams();
      }
    }, 500);
  
    return () => clearTimeout(debounceTimer);
  }, [searchInput, selectedCity, selectedNiche, currentPage, initialCurrentPage]);


    // Filter suggestions based on search input
    useEffect(() => {
      if (searchInput && searchInput.trim() !== '' && fuse) {
        setLoading(true);
        
        // Use Fuse.js for fuzzy search
        const results = fuse.search(searchInput);
        
        // Extract results and sort by score (lower is better)
        const filteredSuggestions = results
          .slice(0, 5)
          .map(result => {
            const item = result.item;
            // Format suggestion to show both title and company
            return `${item.title} - ${item.companyName}`;
          });
        
        setSuggestions(filteredSuggestions);
        setShowSuggestions(filteredSuggestions.length > 0);
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, [searchInput, fuse]);

  // Add these effects to keep state in sync with URL params
useEffect(() => {
  setSearchInput(initialSearchKeyword);
}, [initialSearchKeyword]);

useEffect(() => {
  setSelectedCity(initialSelectedCity);
}, [initialSelectedCity]);

useEffect(() => {
  setSelectedNiche(initialSelectedNiche);
}, [initialSelectedNiche]);

  // Update URL query params
  const updateQueryParams = () => {
    const query = { ...router.query }; // Preserve existing query params
    
    // Only update page if filters have changed
    if (searchInput !== initialSearchKeyword || 
        selectedCity !== initialSelectedCity || 
        selectedNiche !== initialSelectedNiche) {
      query.page = 1;
    }
  
    // Update other filters
    query.q = searchInput || undefined;
    query.city = selectedCity !== "All" ? selectedCity : undefined;
    query.niche = selectedNiche !== "All" ? selectedNiche : undefined;
  
    router.push({
      pathname: "/jobs",
      query,
    }, undefined, { shallow: false });
  };

  // Handle input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // If suggestion format is "title - company", extract just the title
    const title = suggestion.split(' - ')[0];
    setSearchInput(title);
    setShowSuggestions(false);
    
    router.push({
      pathname: "/jobs",
      query: {
        ...router.query,
        q: title,
        page: 1
      }
    }, undefined, { shallow: false });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNicheChange = (e) => {
    setSelectedNiche(e.target.value);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining until expiry
  //Dead Code
 {/*const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Generate canonical URL using current filters
  const generateCanonicalUrl = () => {
    const params = new URLSearchParams();
    if (selectedCity && selectedCity !== "All") params.set("city", selectedCity);
    if (selectedNiche && selectedNiche !== "All") params.set("niche", selectedNiche);
    if (searchInput) params.set("q", searchInput);
    params.set("page", currentPage.toString());
    return `${baseUrl}/jobs?${params.toString()}`;
  };*/}

  // When a user clicks on a job, save the scroll position and navigate to the details page.
  const handleViewDetails = (slug) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jobsScrollPosition", window.scrollY.toString());
    }
    window.location.href = `/jobs/${slug}`;
  };
  return (
    <>
      <Head>
        <title>
          {searchInput
            ? `${searchInput} Jobs ${selectedCity !== "All" ? `in ${selectedCity}` : ""} | Vitamin Job`
            : `Job Openings ${selectedCity !== "All" ? `in ${selectedCity}` : ""} | Vitamin Job`}
        </title>
        <meta
          name="description"
          content={generateMetaDescription(
            selectedCity,
            selectedNiche,
            searchInput,
            totalJobs
          )}
        />
        <meta 
          name="robots" 
          content={
            selectedCity === "All" && 
            selectedNiche === "All" && 
            !searchInput && 
            currentPage === 1 
              ? "index, follow" 
              : "noindex, follow"
          }
        />
        <link 
          rel="canonical" 
          href={
            selectedCity === "All" && 
            selectedNiche === "All" && 
            !searchInput && 
            currentPage === 1
              ? `${baseUrl}/jobs`
              : `${baseUrl}/jobs`
          }
        />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJSON(jobListingSchema) }}
        />
        
      </Head>
  
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
        {/* Hidden H1 for SEO purposes */}
        <h1 className="sr-only">
          {searchInput
            ? `${searchInput} Jobs ${selectedCity !== "All" ? `in ${selectedCity}` : ""}`
            : `Job Openings ${selectedCity !== "All" ? `in ${selectedCity}` : ""}`}
        </h1>
  
        <div className="fixed top-16 left-0 right-0 z-10 bg-gray-100 dark:bg-gray-900 px-4 py-2">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative" ref={searchRef}>
                    <label htmlFor="job-search" className="sr-only">
                      Search jobs
                    </label>
                    <input
                      id="job-search"
                      name="q"
                      type="text"
                      placeholder="Search jobs, companies, skills, or keywords..."
                      value={searchInput}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Search jobs"
                      autoComplete="off"
                    />
                    
                    {/* Autocomplete suggestions */}
                    {showSuggestions && (
                      <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                        {loading ? (
                          <div className="p-3 text-gray-600 dark:text-gray-300">
                            Loading...
                          </div>
                        ) : (
                          <ul>
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city-filter" className="sr-only">
                      Filter by city
                    </label>
                    <select
                      id="city-filter"
                      name="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Cities</option>
                      {Object.keys(cityVariations).map((city) => (
                        <option key={city} value={city}>
                          {city.charAt(0).toUpperCase() + city.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="niche-filter" className="sr-only">
                      Filter by niche
                    </label>
                    <select id="niche-filter" 
                            name="niche" 
                            value={selectedNiche} 
                            onChange={handleNicheChange}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                      <option value="All">All Niches</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto px-6 pb-4 pt-64 max-w-7xl md:pt-36">
          <div className="grid grid-cols-12 gap-4">
            {/* Left sidebar for ads */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-44 bg-white dark:bg-gray-800" />
            </div>
  
            {/* Job Listings */}
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-6 flex justify-between items-center">
                {(selectedCity !== "All" || 
                  selectedNiche !== "All" || 
                  searchInput) && (
                  <Link
                    href="/jobs"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Clear All Filters
                  </Link>
                )}
              </div>
              {jobs.length > 0 ? (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" 
         aria-label="Job listings" 
         aria-live="polite">
      {jobs.map((job) => (
        <article
          key={job._id}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${
            job.featuredJob ? "border-2 border-blue-500" : ""
          }`}
        >
          {/* Featured Job Badge */}
          {job.featuredJob && (
            <div className="bg-blue-500 text-white text-center py-1 px-4 text-sm font-medium">
              Featured Job
            </div>
          )}

          <div className="p-6 flex-1 flex flex-col">
            {/* Company Info */}
            <div className="flex items-start mb-4">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                  {job.companyName.charAt(0)}
                </div>
              )}
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {job.companyName}
                </p>
              </div>
            </div>

            {/* Job Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 flex-1">
              {job.shortDescription || "No description available"}
            </p>

            {/* Details Grid - Reorganized for consistency */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-2 text-blue-500 flex-shrink-0" />
                <span className="truncate">{job.location?.join(", ") || "N/A"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaMoneyBillWave className="mr-2 text-green-500 flex-shrink-0" />
                <span className="truncate">{job.salary || "Not specified"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaBriefcase className="mr-2 text-purple-500 flex-shrink-0" />
                <span className="truncate">{job.jobType || "Full Time"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaLaptopHouse className="mr-2 text-indigo-500 flex-shrink-0" />
                <span className="truncate">{job.remoteOption ? "Remote" : "On-site"}</span>
              </div>
            </div>

            {/* Skills - Limited to 3 items */}
            {job.skills?.length > 0 && (
              <div className="mb-5">
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <FaCalendarAlt className="mr-1" />
                  {formatDate(job.createdAt)}
                </div>
                <button
                  onClick={() => handleViewDetails(job.slug)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Pagination with better UI for many pages */}
{totalPages > 1 && (
  <div className="mt-8 flex justify-center">
    <nav className="flex items-center space-x-2" aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={{
            pathname: "/jobs",
            query: { ...router.query, page: currentPage - 1 },
          }}
          rel="prev"
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
        >
          <span className="mr-1">←</span> Previous
        </Link>
      )}
      
      {/* First page */}
      {currentPage > 3 && (
        <>
          <Link
            href={{
              pathname: "/jobs",
              query: { ...router.query, page: 1 },
            }}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            1
          </Link>
          
          {/* Ellipsis if needed */}
          {currentPage > 4 && (
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}
      
      {/* Pages around current page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => page >= Math.max(1, currentPage - 1) && page <= Math.min(totalPages, currentPage + 1))
        .map(page => (
          <Link
            key={page}
            href={{
              pathname: "/jobs",
              query: { ...router.query, page },
            }}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </Link>
        ))
      }
      
      {/* Ellipsis if needed */}
      {currentPage < totalPages - 3 && (
        <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
      )}
      
      {/* Last page */}
      {currentPage < totalPages - 2 && (
        <Link
          href={{
            pathname: "/jobs",
            query: { ...router.query, page: totalPages },
          }}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {totalPages}
        </Link>
      )}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={{
            pathname: "/jobs",
            query: { ...router.query, page: currentPage + 1 },
          }}
          rel="next"
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
        >
          Next <span className="ml-1">→</span>
        </Link>
      )}
    </nav>
  </div>
)}
  </>
) : (
  <div className="text-center py-12">
    <p className="text-xl text-gray-600 dark:text-gray-400">
      No jobs found matching your criteria. Try adjusting your filters.
    </p>
  </div>
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

export default Jobs;