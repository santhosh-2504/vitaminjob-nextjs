import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
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

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: "+91 6301976870",
      description: "Call us anytime",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "Available 9 AM – 9 PM",
      description: "Quick responses guaranteed",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Kurnool, Andhra Pradesh",
      description: "Home tuitions available",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-white to-blue-50 py-16 px-4 md:px-8 relative overflow-hidden" 
      id="contact"
    >
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Get in{' '}
            <span className="text-blue-600 relative">
              Touch
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
            Have questions or want to book a <span className="font-semibold text-blue-700">free demo</span>? We're just a message away.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`group ${info.bgColor} ${info.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                {info.title}
              </h3>
              
              <p className="text-gray-800 font-semibold mb-2 group-hover:text-gray-900 transition-colors duration-300">
                {info.value}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                {info.description}
              </p>

              {/* Decorative corner elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`mt-12 flex justify-center flex-wrap gap-6 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Chat on WhatsApp
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <a
            href="#hero"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl text-lg font-semibold hover:from-gray-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go to Home
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
        </div>

        {/* Quick Action Badges */}
        <div className={`flex flex-wrap gap-3 justify-center pt-8 transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ⚡ Quick Response
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            🆓 Free Demo Available
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            📅 Flexible Scheduling
          </span>
        </div>

        {/* Special Offer Banner */}
        <div className={`mt-10 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-orange-800">
              🎉 <span>Limited Time Offer: First Month 20% OFF!</span> 🎉
            </div>
            <p className="text-orange-700 mt-2 text-sm">
              Book your free demo session within this week to avail this exclusive discount
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-16 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-32 right-24 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-16 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Additional decorative shapes */}
      <div className="absolute top-1/4 left-8 w-8 h-8 border-2 border-green-300 rounded-full opacity-20 animate-spin" style={{ animationDuration: '10s' }}></div>
      <div className="absolute bottom-1/3 right-8 w-6 h-6 border-2 border-blue-300 rounded-full opacity-25 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
    </section>
  );
}