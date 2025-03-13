import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MdLocationOn, MdWork, MdAttachMoney, MdLabel, MdCalendarToday, MdPerson, MdTrendingUp, MdLanguage, MdTimer } from "react-icons/md";
import { FaExternalLinkAlt, FaArrowLeft, FaBuilding, FaBriefcase, FaGraduationCap, FaRegThumbsUp, FaUserTie, FaRegLightbulb,FaRegStar,FaRegHandshake, FaClock } from "react-icons/fa";
import { toast } from 'react-toastify';
import Error from "next/error";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

const JobDetails = ({ job, similarJobs, recentJobs, errorCode }) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.info("Please Login to Apply", {
        position: "top-right",
        autoClose: 3000,
      });
      
      router.push({
        pathname: '/login',
        query: { from: router.asPath, applyAfterLogin: true },
      });
      return;
    }
    
    window.open(job.applyLink, '_blank');
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const getDaysRemaining = (expiryDateString) => {
    if (!expiryDateString) return null;
    const expiryDate = new Date(expiryDateString);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const SimilarJobsSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Similar Jobs You Might Like</h2>
      {similarJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {similarJobs.map((similarJob) => (
            <Link
              href={`/jobs/${similarJob._id}`}
              key={similarJob._id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow block"
            >
              <div className="flex items-start mb-2">
                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center mr-4">
                  {similarJob.companyLogo ? (
                    <img
                      src={similarJob.companyLogo}
                      alt={`${similarJob.companyName} logo`}
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <FaBuilding className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white line-clamp-1">{similarJob.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{similarJob.companyName}</p>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                <span className="flex items-center">
                  <MdLocationOn className="mr-1" />
                  {Array.isArray(similarJob.location) 
                    ? similarJob.location[0] 
                    : similarJob.location || "Location not specified"}
                </span>
                <span className="flex items-center">
                  <MdWork className="mr-1" />
                  {similarJob.jobType || "Job type not specified"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No similar jobs found at the moment.
        </p>
      )}
    </div>
  );

  const RecentJobsSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Recent Jobs</h2>
      {recentJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentJobs.map((recentJob) => (
          <Link
            href={`/jobs/${recentJob._id}`}
            key={recentJob._id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start mb-2">
              <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center mr-4">
                {recentJob.companyLogo ? (
                  <img
                    src={recentJob.companyLogo}
                    alt={`${recentJob.companyName} logo`}
                    className="w-full h-full object-contain rounded-md"
                  />
                ) : (
                  <FaBuilding className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium dark:text-white line-clamp-1">{recentJob.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{recentJob.companyName}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
              <span className="flex items-center">
                <MdLocationOn className="mr-1" />
                {Array.isArray(recentJob.location) 
                  ? recentJob.location[0] 
                  : recentJob.location || "Location not specified"}
              </span>
              <span className="flex items-center">
                <MdWork className="mr-1" />
                {recentJob.jobType || "Job type not specified"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No recent jobs found at the moment.
      </p>
    )}
  </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16 dark:text-white">
        {/* Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-3">
            <button
              onClick={handleBack}
              className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Jobs
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2">
            {/* Company Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <div className="w-full aspect-square max-w-[200px] mx-auto md:mx-0 bg-white rounded-xl p-4 flex items-center justify-center">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.companyName} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <FaBuilding className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold dark:text-white mb-2">{job.title}</h1>
                    <h2 className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                      {job.companyName}
                    </h2>
                    {job.expiryDate && (
                      <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                        <FaClock className="mr-2" />
                        <span>
                          {getDaysRemaining(job.expiryDate) > 0 
                            ? `${getDaysRemaining(job.expiryDate)} days remaining to apply` 
                            : "Application deadline has passed"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Job highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdLocationOn className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Location</span>
                        <span className="dark:text-gray-300 break-words">
                          {Array.isArray(job.location)
                            ? job.location.join(", ")
                            : job.location || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdAttachMoney className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Salary</span>
                        <span className="dark:text-gray-300 break-words">
                          {job.salary || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdWork className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Job Type</span>
                        <span className="dark:text-gray-300 break-words">
                          {job.jobType || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdLabel className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Industry</span>
                        <span className="dark:text-gray-300 break-words">
                          {job.niche || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Removed the Quick apply button for mobile */}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Job Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {job.shortDescription || "No short description available"}
                </p>
                <h3 className="text-lg font-medium mb-4 dark:text-white">Detailed Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {job.lengthyDescription || "No detailed description available"}
                </p>
              </div>
            </div>

            {/* Experience and Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Experience & Requirements</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FaUserTie className="text-blue-500 dark:text-blue-400 mr-3" />
                  <h3 className="text-lg font-medium dark:text-white">Experience Level</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-8">
                  {job.experienceLevel || "Not specified"}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FaGraduationCap className="text-blue-500 dark:text-blue-400 mr-3" />
                  <h3 className="text-lg font-medium dark:text-white">Required Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2 ml-8">
                  {Array.isArray(job.skills) && job.skills.length > 0 ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300">
                      No skills specified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FaRegThumbsUp className="text-blue-500 dark:text-blue-400 mr-3" />
                  <h3 className="text-lg font-medium dark:text-white">Benefits</h3>
                </div>
                <div className="flex flex-wrap gap-2 ml-8">
                  {Array.isArray(job.benefits) && job.benefits.length > 0 ? (
                    job.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 rounded-full text-sm"
                      >
                        {benefit}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300">
                      No benefits specified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* About the Company Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg p-2">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyName} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <FaBuilding className="w-full h-full text-gray-400" />
                  )}
                </div>
                <h2 className="text-xl font-semibold dark:text-white">About {job.companyName}</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {job.companyDescription || "No company description available"}
                </p>
              </div>

              {/* Company details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdLanguage className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Website</span>
                    <a 
                      href={job.companyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                    >
                      {job.companyWebsite || "Not available"}</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <FaBriefcase className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Industry</span>
                    <span className="dark:text-gray-300 break-words">
                      {job.industry || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Now Section - New section at the bottom of the content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Ready to Apply?</h2>
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If this position matches your skills and career goals, we encourage you to apply now.
                </p>
                <div className="flex items-center mb-4">
                  <MdTimer className="text-blue-500 dark:text-blue-400 mr-2" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Job posted: {formatDate(job.createdAt)}
                  </p>
                </div>
                {job.expiryDate && (
                  <div className="flex items-center mb-4">
                    <MdCalendarToday className="text-blue-500 dark:text-blue-400 mr-2" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Application deadline: {formatDate(job.expiryDate)}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleApply}
                className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative flex items-center">
                  Apply Now
                  <FaExternalLinkAlt className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                You'll be redirected to the company's application page
              </p>
            </div>

            {/* Similar Jobs Section */}
            < SimilarJobsSection />

            {/* Recent Jobs Section */}
            < RecentJobsSection />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Moved the Apply Now Card to the bottom of the sidebar */}
            
            {/* Job Overview Card */}
            {/* Job Overview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Job Overview</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdLocationOn className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Location</span>
                    <span className="dark:text-gray-300 break-words">
                      {Array.isArray(job.location)
                        ? job.location.join(", ")
                        : job.location || "Not specified"}
                      {job.remoteOption && " (Remote option available)"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdWork className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Job Type</span>
                    <span className="dark:text-gray-300 break-words">
                      {job.jobType || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdAttachMoney className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Salary</span>
                    <span className="dark:text-gray-300 break-words">
                      {job.salary || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <FaUserTie className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Experience</span>
                    <span className="dark:text-gray-300 break-words">
                      {job.experienceLevel || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdLabel className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Industry</span>
                    <span className="dark:text-gray-300 break-words">
                      {job.niche || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MdCalendarToday className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Posted</span>
                    <span className="dark:text-gray-300 break-words">
                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords/Tags Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Job Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.keywords) && job.keywords.length > 0 ? (
                  job.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  Array.isArray(job.skills) && job.skills.length > 0 ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300">
                      No keywords specified
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Contact Card */}
            {job.recruiterContact && (job.recruiterContact.email || job.recruiterContact.phone) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">Contact Recruiter</h2>
                <div className="space-y-4">
                  {job.recruiterContact.email && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdPerson className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Email</span>
                        <a 
                          href={`mailto:${job.recruiterContact.email}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {job.recruiterContact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {job.recruiterContact.phone && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <MdPerson className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Phone</span>
                        <a 
                          href={`tel:${job.recruiterContact.phone}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {job.recruiterContact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* "Why You'll Love This Job" Card - New section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Why You'll Love This Job</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <FaRegLightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="font-medium dark:text-gray-200">Growth Opportunity</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Expand your skills and advance your career with a growing company.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <FaRegStar className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="font-medium dark:text-gray-200">Impactful Work</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Make a real difference with your contributions to the team.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <FaRegHandshake className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="font-medium dark:text-gray-200">Collaborative Culture</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Join a supportive team that values your input and ideas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Now Card - Moved to the bottom */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Interested?</h2>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Don't miss this opportunity! Apply before the deadline.
                </p>
                {job.expiryDate && (
                  <div className="flex items-center mb-4">
                    <MdCalendarToday className="text-blue-500 dark:text-blue-400 mr-2" />
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Application deadline: {formatDate(job.expiryDate)}
                    </p>
                  </div>
                )}
              </div>
              {/*<button
                onClick={handleApply}
                className="group relative w-full inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative flex items-center">
                  Apply Now
                  <FaExternalLinkAlt className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>*/}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                You'll be redirected to the company's application page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const { id } = context.params;

    // Fetch main job
    const job = await Job.findById(id).lean();
    if (!job) {
      return { props: { errorCode: 404 } };
    }

    // Helper function to safely convert dates
    const safeDate = (date) => {
      if (!date) return null;
      try {
        return new Date(date).toISOString();
      } catch {
        return null;
      }
    };

    // Serialize job with safe date handling
    const serializedJob = {
      ...job,
      _id: job._id.toString(),
      createdAt: safeDate(job.createdAt),
      updatedAt: safeDate(job.updatedAt),
      expiryDate: safeDate(job.expiryDate),
      skills: job.skills || [],
      location: job.location || [],
      benefits: job.benefits || [],
      recruiterContact: job.recruiterContact ? {
        email: job.recruiterContact.email || null,
        phone: job.recruiterContact.phone || null
      } : null
    };

    // Fetch similar jobs
    const similarJobs = await Job.find({
      _id: { $ne: id },
      $or: [
        { niche: job.niche },
        { skills: { $in: job.skills } },
        { industry: job.industry }
      ],
    })
    .limit(4)
    .select('title companyName location jobType companyLogo _id createdAt')
    .lean();

    // Fetch recent jobs
    const recentJobs = await Job.find({
      _id : {$ne : id}
    })
      .sort({ _id: -1 })
      .limit(4)
      .select('title companyName location jobType companyLogo _id createdAt')
      .lean();

    // Serialization function for arrays
    const serializeJobs = (jobs) => jobs.map(job => ({
      ...job,
      _id: job._id.toString(),
      createdAt: safeDate(job.createdAt),
      location: job.location || [],
      companyLogo: job.companyLogo || null
    }));

    return {
      props: {
        job: serializedJob,
        similarJobs: serializeJobs(similarJobs),
        recentJobs: serializeJobs(recentJobs),
        errorCode: null
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        job: null,
        similarJobs: [],
        recentJobs: [],
        errorCode: 500
      }
    };
  }
}

export default JobDetails;