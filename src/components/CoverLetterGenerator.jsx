import { useState } from "react";
import { FaSpinner, FaDownload, FaCopy, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { jsPDF } from "jspdf";

const CoverLetterGenerator = ({ job, userDetails, onClose }) => {
  const [formData, setFormData] = useState({
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
    additionalInfo: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const generateCoverLetter = async () => {
    setLoading(true);
    
    try {
      // Prepare data for the API request
      const prompt = `
        Generate a professional cover letter for a job application with the following details:

        Job Title: ${job.title}
        Company: ${job.companyName}
        Job Description: ${job.shortDescription || job.lengthyDescription || ""}
        
        Applicant Details:
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        
        Additional Information: ${formData.additionalInfo}
        
        Skills needed for the job: ${Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || ""}
        
        Create a professional, concise cover letter highlighting how the applicant's background matches the job requirements.
        Format with proper paragraphs including introduction, body, and conclusion.
        Don't include the date.
      `;
      
      // Make API request to OpenRouter
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin, // Required by OpenRouter
          "X-Title": "VitaminJob Cover Letter Generator", // App name for OpenRouter
        },
        body: JSON.stringify({
          model: "agentica-org/deepcoder-14b-preview:free", // Specified model
          messages: [
            { role: "system", content: "You are a professional cover letter writer." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const generatedLetter = data.choices[0].message.content.trim();
      
      setCoverLetter(generatedLetter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast.error("Failed to generate cover letter. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const formatTextForPDF = (text) => {
    // Remove any special formatting that might be included by the AI
    return text.replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
               .replace(/\*(.*?)\*/g, '$1');    // Remove markdown italic
  };
  
  const downloadAsPDF = () => {
    const doc = new jsPDF();
    
    // Set up the PDF
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    // Add applicant info at the top
    doc.setFontSize(12);
    doc.text(formData.name, 20, 20);
    doc.text(formData.email, 20, 26);
    doc.text(formData.phone, 20, 32);
    doc.text(new Date().toLocaleDateString(), 20, 38);
    
    // Add spacing
    let yPosition = 50;
    
    // Add company info
    doc.text(`${job.companyName}`, 20, yPosition);
    yPosition += 6;
    
    // Add greeting
    yPosition += 12;
    
    // Format and add the cover letter content
    const formattedText = formatTextForPDF(coverLetter);
    
    // Split the text to fit on the page with proper word wrapping
    const splitText = doc.splitTextToSize(formattedText, 170);
    doc.text(splitText, 20, yPosition);
    
    // Save the PDF
    doc.save(`Cover_Letter_${job.companyName.replace(/\s+/g, '_')}.pdf`);
    
    toast.success("Cover letter downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
      .then(() => {
        setCopied(true);
        toast.success("Cover letter copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy text", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold dark:text-white">Generate Cover Letter</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 60px)" }}>
          {!coverLetter ? (
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                Generate a customized cover letter for your application to <span className="font-medium">{job.title}</span> at <span className="font-medium">{job.companyName}</span>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Information (optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add any relevant experience, skills, or information that should be highlighted in your cover letter..."
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={generateCoverLetter}
                  disabled={loading || !formData.name || !formData.email || !formData.phone}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Cover Letter"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {coverLetter}
                  </pre>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadAsPDF}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  Download as PDF
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition flex items-center justify-center"
                >
                  {copied ? "Copied!" : (
                    <>
                      <FaCopy className="mr-2" />
                      Copy Text
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setCoverLetter("")}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;