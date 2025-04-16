import Link from 'next/link';
import { FaQuestion, FaBriefcase, FaHome } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        {/* Fun 404 Header */}
        <div className="relative mb-6">
          <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400">404</h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
            <FaQuestion className="text-6xl text-red-500 opacity-30" />
          </div>
        </div>
        
        {/* Funny Job Interview Message */}
        <h2 className="text-2xl font-semibold mb-4">Interview Not Found</h2>
        
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Looks like this job position has been filled... or never existed.
          Our HR team is currently reviewing your application to find this page.
        </p>
        
        {/* Job Rejection Letter */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
          <p className="text-sm italic text-gray-700 dark:text-gray-300">
            Dear Applicant,<br/><br/>
            We regret to inform you that the page you're looking for has decided to pursue opportunities elsewhere.
            While your URL was impressive, we've moved in a different directory.<br/><br/>
            Sincerely,<br/>
            The 404 Department
          </p>
        </div>
        
        {/* Resume Options */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/">
            <div className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
              <FaHome className="mr-2" />
              Back to Homepage
            </div>
          </Link>
          
          <Link href="/jobs">
            <div className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300">
              <FaBriefcase className="mr-2" />
              Browse Jobs
            </div>
          </Link>
        </div>
        
        {/* Fun Footnote */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
          * This page is currently on a coffee break. Please try again when it returns to the office.
        </p>
      </div>
    </div>
  );
}