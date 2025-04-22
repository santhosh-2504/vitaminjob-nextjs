'use client';

import { useState } from "react";
import { useSelector } from "react-redux";
import { FaSpinner, FaDownload, FaCopy, FaTimes, FaPaperPlane, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { jsPDF } from "jspdf";

const ClientCoverLetterGenerator = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [bodyText, setBodyText] = useState("");
  const [copied, setCopied] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ projects: [], skills: [] });
  const [currentProject, setCurrentProject] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");

  const validateInput = () => {
    return formData.projects.length >= 2 || formData.skills.length >= 2;
  };

  const handleAddProject = () => {
    if (currentProject.trim()) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, currentProject.trim()]
      }));
      setCurrentProject("");
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const generateCoverLetterBody = async () => {
    setLoading(true);
    try {
      const fallbackProjects = ["Developed a job portal using MERN stack", "Built a social media data analysis project using Python"];
      const fallbackSkills = ["Java", "React", "React Native", "JavaScript", "Problem-solving"];

      const prompt = `
        Write ONLY the main body (paragraphs only) of a cover letter. Do NOT include any greetings, closings, or personal info.
        Assume the applicant is a fresher with academic project experience.
        Job Title: ${job.title || 'Web Developer'}
        Job Description: ${job.shortDescription || job.lengthyDescription || "Not specified"}
        Highlight these projects: ${formData.projects.join('; ') || fallbackProjects.join('; ')}
        Emphasize these skills: ${formData.skills.join(', ') || fallbackSkills.join(', ')}
        Keep it 3–4 professional paragraphs. Use confident, clear language. No markdown or placeholders.
      `;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href,
          "X-Title": "Job Platform Cover Letter Generator"
        },
        body: JSON.stringify({
          model: "microsoft/mai-ds-r1:free", 
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      let text = data.choices[0]?.message?.content?.trim() || "";

      text = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/\[([^\]]+)\]/g, '');

      if (!text.endsWith('.')) text += ' I look forward to the opportunity to contribute to your team.';

      setBodyText(text);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fullLetterText = () => {
    const { name = "Applicant", email = "email@example.com", phone = "Phone not provided" } = user || {};
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const company = job?.companyName || "Company";
    const location = job?.location?.[0] || "";
    return `${name}\n${email} | ${phone}\n\n${currentDate}\n\n${company}\n${location}\n\nDear Hiring Manager,\n\n${bodyText}\n\nSincerely,\n${name}`;
  };

  const downloadAsPDF = () => {
    try {
      const doc = new jsPDF();
      const content = fullLetterText();
      const marginLeft = 20;
      const marginTop = 30;
      const maxWidth = 170;

      doc.setFont("Times", "Normal");
      doc.setFontSize(12);
      doc.setLineHeightFactor(1.6);

      const lines = doc.splitTextToSize(content, maxWidth);
      let y = marginTop;

      for (let i = 0; i < lines.length; i++) {
        if (y > 280) { // if close to bottom, create new page
          doc.addPage();
          y = marginTop;
        }
        doc.text(lines[i], marginLeft, y);
        y += 6;
      }

      doc.save(`Cover_Letter_${(job?.companyName || 'Company').replace(/\s+/g, '_')}.pdf`);

      toast.success("Cover letter downloaded!", { autoClose: 3000 });
    } catch (error) {
      console.error("PDF error:", error);
      toast.error("Error creating PDF.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLetterText())
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!", { autoClose: 2000 });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error("Copy failed."));
  };
  if (!showGenerator) {
    return (
      <button
        onClick={() => setShowGenerator(true)}
        className="group w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
      >
        <span className="flex items-center">
          Generate Cover Letter
          <span className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform">
            <FaDownload />
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold dark:text-white">
            Cover Letter for {job.title} at {job.companyName}
          </h2>
          <button onClick={() => setShowGenerator(false)} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 60px)" }}>
          {!bodyText ? (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Personalize Your Cover Letter
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Enter at least <strong>two skills</strong> or <strong>two projects</strong> to enable generation.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevant Projects
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.projects.map((project, index) => (
                      <div key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center gap-2">
                        <span>{project}</span>
                        <button
                          onClick={() => handleRemoveProject(index)}
                          className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentProject}
                      onChange={(e) => setCurrentProject(e.target.value)}
                      placeholder="Add a project..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleAddProject}
                      disabled={!currentProject.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills to Highlight
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full flex items-center gap-2">
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-400"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleAddSkill}
                      disabled={!currentSkill.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={generateCoverLetterBody}
                  disabled={!validateInput() || loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {fullLetterText()}
                  </pre>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={downloadAsPDF} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <FaDownload className="mr-2" />Download as PDF
                </button>
                <button onClick={copyToClipboard} className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center">
                  {copied ? "Copied!" : <><FaCopy className="mr-2" />Copy Text</>}
                </button>
                <button onClick={() => setBodyText("")} className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Edit Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCoverLetterGenerator;
