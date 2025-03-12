import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ArrowRight, Pill, Target, LineChart } from 'lucide-react';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div 
    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
    role="article"
  >
    <div className="text-blue-600 text-4xl mb-4 flex justify-center">
      <Icon className="w-8 h-8" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-200 text-center">
      {description}
    </p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const Hero = ({ className = '' }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section 
      className={`bg-gray-50 dark:bg-gray-900 pt-20 ${className}`}
      aria-label="Hero section"
    >
      <div className="container mx-auto px-6">
        <div className="py-12 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/logo.png" 
              alt="Vitamin Job" 
              className="h-16 w-auto"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vitamin Job
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Your Daily Dose of Career Growth
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
            The Essential Career Supplement for Professionals. Get Your Daily Intake of Premium Job Opportunities.
          </p>

          {!isAuthenticated && (
            <div className="flex justify-center mb-12">
              <Link
                href="/login"
                className="px-8 py-4 text-xl font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 group"
                aria-label="Sign up or login to get started"
              >
                Get Your Daily Dose
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          )}

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            role="region"
            aria-label="Features"
          >
            <FeatureCard
              icon={Pill}
              title="Daily Career Boost"
              description="Your daily supplement of hand-picked job opportunities to energize your professional growth"
            />
            <FeatureCard
              icon={Target}
              title="Precision Matching"
              description="Carefully formulated job matches that align with your career DNA"
            />
            <FeatureCard
              icon={LineChart}
              title="Career Wellness"
              description="Complete nutrition for your career with tools and resources for long-term success"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;