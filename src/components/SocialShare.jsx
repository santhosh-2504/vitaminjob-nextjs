import { useState } from "react";
import { FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter, FaCopy, FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';

const SocialShare = ({ job }) => {
  const [copied, setCopied] = useState(false);
  
  // Current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Create sharing URLs for different platforms
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(`${job.title} at ${job.companyName}`)}&summary=${encodeURIComponent(`Check out this ${job.title} position at ${job.companyName}. ${job.shortDescription || ''}`)}`;
  
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`*${job.title} at ${job.companyName}*\n\nLocation: ${Array.isArray(job.location) ? job.location.join(", ") : job.location || "Not specified"}\nJob Type: ${job.jobType || "Not specified"}\nSalary: ${job.salary || "Not specified"}\n\n${job.shortDescription || ''}\n\nApply here: ${currentUrl}`)}`;
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this job opportunity: ${job.title} at ${job.companyName}`)}`;

  // Function to copy job details to clipboard
  const copyToClipboard = () => {
    // Format the job details as plain text
    const jobDetails = `
Job Title: ${job.title}
Company: ${job.companyName}
Location: ${Array.isArray(job.location) ? job.location.join(", ") : job.location || "Not specified"}
Job Type: ${job.jobType || "Not specified"}
Salary: ${job.salary || "Not specified"}
Experience Level: ${job.experienceLevel || "Not specified"}

Apply here: ${currentUrl}
    `;
    
    // Copy to clipboard
    navigator.clipboard.writeText(jobDetails.trim())
      .then(() => {
        setCopied(true);
        toast.success("Job details copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy job details", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Share This Job</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <a 
            href={linkedInUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          
          <a 
            href={whatsAppUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>
          
          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={18} />
          </a>
          
          <a 
            href={twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
            aria-label="Share on Twitter/X"
          >
            <FaTwitter size={18} />
          </a>
        
        
          <button
  onClick={copyToClipboard}
  className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
  aria-label="Copy job details"
>
  {copied ? (
    <FaCheck size={18} />
  ) : (
    <FaCopy size={18} />
  )}
</button>

        </div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Help someone in your network find their next opportunity
      </p>
    </div>
  );
};

export default SocialShare;