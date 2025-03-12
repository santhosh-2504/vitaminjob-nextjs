import { useEffect } from 'react';
import Link from 'next/link';

const ContactUs = () => {
  const sections = [
    {
      title: "We value your feedback and inquiries.",
      content: "Reach out to us for any questions, suggestions, or concerns!"
    },
    {
      title: "Feedback Form",
      content: <span>
        Use the form below to:
        {"\n\n"}• Provide feedback for improving the website
        {"\n"}• Report any issues you face while using the platform
        {"\n\n"}
        <Link href="/feedback" className="text-blue-600 hover:underline dark:text-blue-500">
          Click here to submit feedback
        </Link>
      </span>
    },
    {
      title: "External Content Owners",
      content: `If you are an external content owner and have queries or objections regarding job postings, course links, or roadmaps shared on our platform, please email us at:

vitamin4job@gmail.com`
    },
    {
      title: "Response Time",
      content: "We typically respond within 24-48 hours to all inquiries."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
              Contact Us
            </h1>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 