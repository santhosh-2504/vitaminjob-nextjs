import { useEffect } from 'react';
const AboutUs = () => {
  const sections = [
    {
      title: "Welcome to Vitamin Job!",
      content: "At Vitamin Job, we believe in empowering job seekers and learners by providing them with the right tools and resources to achieve their career aspirations. Our platform is designed to bridge the gap between opportunity and preparation, ensuring that you have everything you need to thrive in your professional journey."
    },
    {
      title: "What We Do",
      content: `Job Opportunities:
• We curate job openings from various industries, providing direct links to applications.
• Our goal is to simplify your job search process and connect you to opportunities that match your skills and interests.

Free Course Listings:
• Learning is the cornerstone of success.
• We offer a collection of free courses from reputed platforms like Simplilearn, Coursera, and more.
• Enhance your knowledge, acquire certifications, and stay ahead in the competitive job market.

Roadmaps for Success:
• Confused about where to start? Our downloadable roadmaps provide a clear path for mastering tech skills.
• From web development to data science, these guides make your learning process efficient and effective.`
    },
    {
      title: "Personalized Features",
      content: `• Bookmark jobs for easy access later
• Star roadmaps to prioritize your learning journey
• Receive job-related notifications based on your selected niches`
    },
    {
      title: "Our Mission",
      content: "We aim to be the one-stop solution for individuals seeking professional growth. Whether you're looking for your dream job, exploring new learning opportunities, or charting your career path, Vitamin Job is here to guide you every step of the way."
    },
    {
      title: "Why Choose Us?",
      content: `• Curated Content: We handpick job postings, courses, and resources to ensure quality and relevance
• Ease of Use: Our intuitive platform makes navigation and interaction seamless
• No Account Required: Many features, like job browsing and course viewing, are accessible without registration
• Committed to Your Privacy: Your data security is our priority`
    },
    {
      title: "Join Us on This Journey",
      content: "At Vitamin Job, we are not just a platform; we are a community dedicated to your success. Explore our features, take advantage of our resources, and let us be your partner in professional growth.\n\nLet's shape your future, one opportunity at a time."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
              About Us
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
    </>
  );
};

export default AboutUs; 