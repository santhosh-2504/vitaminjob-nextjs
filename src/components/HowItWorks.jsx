import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Boost Your Profile",
      icon: <LuUserPlus />,
      description:
        "Create your career health profile and let us understand your professional nutrition needs.",
    },
    {
      id: 2,
      title: "Get Your Daily Dose",
      icon: <VscTasklist />,
      description:
        "Receive a daily supplement of perfectly matched opportunities that energize your career growth.",
    },
    {
      id: 3,
      title: "Achieve Career Wellness",
      icon: <BiSolidLike />,
      description:
        "Land roles that maintain your long-term career health and professional vitality.",
    },
  ];

  return (
    <section 
      className="bg-gray-50 dark:bg-gray-900 py-12"
      aria-labelledby="career-journey-heading"
    >
      <div className="container mx-auto px-6">
        <h2 
          id="career-journey-heading"
          className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-4"
        >
          Your Career Wellness Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Three simple steps to maintain your career health
        </p>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Career wellness steps"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="listitem"
            >
              <div 
                className="text-blue-500 text-4xl mb-4 flex justify-center"
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;