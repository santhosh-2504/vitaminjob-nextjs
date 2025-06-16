import { useState, useEffect, useRef } from 'react';
import { FaLaptop, FaHome } from "react-icons/fa";

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      title: "Online Tuitions",
      subtitle: "Live sessions via Google Meet or Zoom",
      icon: <FaLaptop />,
      price: "₹1000",
      period: "/month",
      features: [
      
        "Assignments & doubt clearing",
        "Study materials provided",
        "Flexible timing",
        "Screen sharing & recording"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: false
    },
    {
      title: "Home Tuitions",
      subtitle: "Available in Kurnool City only",
      icon: <FaHome />,
      price: "₹2,000",
      period: "/month",
      features: [
        "3 sessions/week at your doorstep",
        "Personalized coaching",
        "Practice sessions included",
        "Face-to-face interaction",
        "Customized learning pace"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      popular: true
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-white to-gray-50 py-16 px-4 md:px-8 relative overflow-hidden" 
      id="pricing"
    >
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Pricing{' '}
            <span className="text-blue-600 relative">
              Plans
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                viewBox="0 0 200 12"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
              </svg>
            </span>
          </h2>
        </div>
        
        <div className={`mt-6 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Choose a plan that fits your schedule and learning style. Affordable rates for quality tuition.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative ${plan.bgColor} ${plan.borderColor} border-2 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-3 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${plan.popular ? 'ring-4 ring-green-200 ring-opacity-50' : ''}`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              {/* Icon with gradient background */}
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {plan.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:scale-105 transition-transform duration-300">
                {plan.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                <span className="text-lg text-gray-600">{plan.period}</span>
              </div>

              {/* Features List */}
              <ul className="text-left space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                  >
                    <span className="text-green-500 mr-3 text-lg">✅</span>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className={`mt-16 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            📞 Contact to Subscribe
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Additional Info Badges */}
        <div className={`flex flex-wrap gap-3 justify-center pt-8 transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            💰 No Hidden Fees
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            🔄 Flexible Cancellation
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            🎯 Free Demo Session
          </span>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-16 left-12 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-24 right-20 w-6 h-6 bg-green-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-16 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
}