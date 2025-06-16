import { useState, useEffect, useRef } from 'react';

const aboutSections = [
  {
    id: 'coding',
    title: 'Coding & Computer Skills',
    description: (
      <>
        We offer <span className="font-semibold text-blue-700">personalized computer and coding tuitions</span> in Kurnool, both online and offline. Our mission is to help students from{' '}
        <span className="font-semibold text-green-700">Class 6 onwards</span> build a strong foundation in practical tech skills like{' '}
        <span className="font-semibold text-purple-700">Python, Java, HTML/CSS, and AI tools</span> — all explained in a simple, beginner-friendly way.
      </>
    ),
    highlights: [
      {
        icon: "💻",
        title: "Hands-on Coding",
        description: "Learn by building real projects and applications"
      },
      {
        icon: "🚀",
        title: "Future Skills",
        description: "AI, Web Development, and Programming languages"
      },
      {
        icon: "🎯",
        title: "Project-Based",
        description: "Build portfolio projects while learning"
      }
    ],
    badges: [
      { text: "💻 Coding Focus", bg: "bg-blue-100", color: "text-blue-800" },
    ]
  },
  {
    id: 'subjects',
    title: 'School Subjects Mastery',
    description: (
      <>
        We provide <span className="font-semibold text-purple-700">comprehensive academic support</span> for core school subjects in Kurnool. Our expert tutors help students from{' '}
        <span className="font-semibold text-green-700">Class 6 to Intermediate</span> excel in{' '}
        <span className="font-semibold text-blue-700">Mathematics, Science, English, and Telugu</span> with personalized attention and proven teaching methods.
      </>
    ),
    highlights: [
      {
        icon: "📚",
        title: "Subject Expertise",
        description: "Specialized tutors for Math, Science, English & Telugu"
      },
      {
        icon: "🎓",
        title: "Board Preparation",
        description: "Focused preparation for school and board exams"
      },
      {
        icon: "📈",
        title: "Academic Growth",
        description: "Improved grades and conceptual understanding"
      }
    ],
    badges: [
      { text: "📊 Mathematics", bg: "bg-blue-100", color: "text-blue-800" },
      { text: "🔬 Science", bg: "bg-green-100", color: "text-green-800" },
      { text: "📝 English", bg: "bg-purple-100", color: "text-purple-800" },
    ]
  }
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [fade, setFade] = useState(true);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSection((prev) => (prev + 1) % aboutSections.length);
        setFade(true);
      }, 500);
    }, 6000); // Switch every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const currentData = aboutSections[currentSection];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 md:px-8 relative overflow-hidden" 
      id="about"
    >
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            About Our{' '}
            <span className={`relative transition-all duration-500 ${
              currentSection === 0 ? 'text-blue-600' : 'text-purple-600'
            } ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {currentData.title}
              <svg
                className={`absolute -bottom-2 left-0 w-full h-3 transition-all duration-500 ${
                  currentSection === 0 ? 'text-blue-200' : 'text-purple-200'
                }`}
                viewBox="0 0 200 12"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className={`mt-8 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20">
            <div className={`transition-all duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {currentData.description}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentData.highlights.map((highlight, index) => (
                <div
                  key={`${currentSection}-${index}`}
                  className={`group p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 ${
                    isVisible && fade ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    currentSection === 0 
                      ? 'text-gray-800 group-hover:text-blue-700' 
                      : 'text-gray-800 group-hover:text-purple-700'
                  }`}>
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className={`mt-12 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl text-lg font-semibold hover:from-gray-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            💬 Contact Us
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

        {/* Dynamic Mission Statement Badges */}
        <div className={`flex flex-wrap gap-3 justify-center pt-8 transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            🏠 Kurnool Based
          </span>
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            📚 Class 6+ Focus
          </span>
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            💻 Online & Offline
          </span>
          {currentData.badges.map((badge, index) => (
            <span 
              key={`${currentSection}-badge-${index}`}
              className={`px-4 py-2 ${badge.bg} ${badge.color} rounded-full text-sm font-medium transition-all duration-500`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        {/* Section Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {aboutSections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentSection(index);
                  setFade(true);
                }, 250);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? (currentSection === 0 ? 'bg-blue-500' : 'bg-purple-500')
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-16 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-32 right-24 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-16 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Additional decorative shapes */}
      <div className="absolute top-1/4 left-8 w-8 h-8 border-2 border-blue-300 rounded-full opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-1/3 right-8 w-6 h-6 border-2 border-purple-300 rounded-full opacity-25 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
    </section>
  );
}