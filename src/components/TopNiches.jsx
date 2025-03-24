import {
  FaCode,
  FaTools,
  FaChartBar,
  FaBrain,
  FaCloud,
} from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import Link from "next/link";

const TopNiches = () => {
  const niches = [
    {
      id: "1",
      title: "Web Development",
      icon: <FaCode />,
      description:
        "Your daily dose of frontend and backend opportunities to build modern web experiences.",
    },
    {
      id: "2",
      title: "Software Development",
      icon: <FaComputer />,
      description:
        "Power-packed software development roles to energize your coding career.",
    },
    {
      id: "3",
      title: "AI and Machine Learning",
      icon: <FaBrain />,
      description:
        "Brain-boosting positions in AI and ML to supercharge your tech career.",
    },
    {
      id: "4",
      title: "Data Science",
      icon: <FaChartBar />,
      description:
        "Data-rich opportunities to nourish your analytical career growth.",
    },
    {
      id: "5",
      title: "DevOps",
      icon: <FaTools />,
      description:
        "Essential DevOps roles to strengthen your infrastructure expertise.",
    },
    {
      id: "6",
      title: "Cloud Computing",
      icon: <FaCloud />,
      description:
        "Cloud-powered positions to elevate your technical potential.",
    },
  ];

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 py-12"
      aria-labelledby="tech-careers-heading"
    >
      <div className="container mx-auto px-6">
        <h2
          id="tech-careers-heading"
          className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-4"
        >
          Tech Career Vitamins
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Choose your daily supplement of specialized tech opportunities
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
          {niches.map((niche) => (
            <Link
              key={niche.id}
              href={{
                pathname: "/jobs",
                query: {
                  niche: niche.title, // Use the title directly
                  page: 1,            // Always start at page 1
                },
              }}
              className="block" // Ensures the entire card is clickable
            >
              <div
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="listitem"
              >
                <div
                  className="text-blue-500 text-4xl mb-4 flex justify-center"
                  aria-hidden="true"
                >
                  {niche.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {niche.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {niche.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopNiches;