// import { useState, useEffect, useRef } from 'react';
// import { FaJava } from "react-icons/fa";
// import { FaPython, FaHtml5, FaCss3Alt, FaRobot } from "react-icons/fa";

// export default function CurriculumSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const subjects = [
//     {
//       title: "Python Basics",
//       description: "Variables, loops, functions, logic building.",
//       icon: <FaPython />,
//       color: "from-blue-500 to-blue-600",
//       bgColor: "bg-blue-50",
//       textColor: "text-blue-700",
//       borderColor: "border-blue-200"
//     },
//     {
//       title: "Java Fundamentals", 
//       description: "OOP, classes, data types, simple programs.",
//       icon: <FaJava />,
//       color: "from-orange-500 to-red-500",
//       bgColor: "bg-orange-50",
//       textColor: "text-orange-700",
//       borderColor: "border-orange-200"
//     },
//     {
//       title: "HTML & CSS",
//       description: "Create websites using real code, styling basics.",
//       icon: <FaHtml5 />,
//       color: "from-green-500 to-teal-500",
//       bgColor: "bg-green-50",
//       textColor: "text-green-700",
//       borderColor: "border-green-200"
//     },
//     {
//       title: "AI Tools for Students",
//       description: "How to use ChatGPT, Canva, and productivity tools.",
//       icon: <FaRobot />,
//       color: "from-purple-500 to-pink-500",
//       bgColor: "bg-purple-50",
//       textColor: "text-purple-700",
//       borderColor: "border-purple-200"
//     },
//     {
//       title: "Basic Computer Skills",
//       description: "Typing, MS Word/Excel, internet usage, safety tips.",
//       icon: <FaCss3Alt />,
//       color: "from-indigo-500 to-blue-500",
//       bgColor: "bg-indigo-50",
//       textColor: "text-indigo-700",
//       borderColor: "border-indigo-200"
//     }
//   ];

//   return (
//     <section 
//       ref={sectionRef}
//       className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 md:px-8 relative overflow-hidden" 
//       id="curriculum"
//     >
//       <div className="max-w-6xl mx-auto text-center relative">
//         {/* Header Section */}
//         <div className={`transform transition-all duration-1000 ease-out ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`}>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
//             Curriculum{' '}
//             <span className="text-blue-600 relative">
//               Overview
//               <svg
//                 className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
//                 viewBox="0 0 200 12"
//                 fill="currentColor"
//               >
//                 <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
//               </svg>
//             </span>
//           </h2>
//         </div>
        
//         <div className={`mt-6 transform transition-all duration-1000 ease-out ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`} style={{ transitionDelay: '200ms' }}>
//           <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
//             Our curriculum is beginner-friendly and hands-on. Students will explore essential tools and languages to kickstart their journey in tech.
//           </p>
//         </div>

//         {/* Subjects Grid */}
//         <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {subjects.map((subject, index) => (
//             <div
//               key={index}
//               className={`group p-6 ${subject.bgColor} ${subject.borderColor} border-2 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 ${
//                 isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//               }`}
//               style={{ transitionDelay: `${400 + index * 100}ms` }}
//             >
//               {/* Icon with gradient background */}
//               <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                 {subject.icon}
//               </div>
              
//               <h3 className={`text-xl font-bold ${subject.textColor} mb-3 group-hover:scale-105 transition-transform duration-300`}>
//                 {subject.title}
//               </h3>
              
//               <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                 {subject.description}
//               </p>

//               {/* Decorative corner elements */}
//               <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//           ))}
//         </div>

//         {/* Call to Action Button */}
//         <div className={`mt-12 transform transition-all duration-1000 ease-out ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`} style={{ transitionDelay: '1000ms' }}>
//           <a
//             href="#contact"
//             className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             🚀 Enroll Now
//             <svg
//               className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </a>
//         </div>

//         {/* Feature badges */}
//         <div className={`flex flex-wrap gap-3 justify-center pt-8 transform transition-all duration-800 ease-out ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`} style={{ transitionDelay: '1200ms' }}>
//           <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             ✅ Future Ready Skills
//           </span>
//           <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
//             🎯 Hands-on Learning
//           </span>
//           <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
//             📈 Progressive Difficulty
//           </span>
//         </div>
//       </div>

//       {/* Background Decorative Elements */}
//       <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20"></div>
//       <div className="absolute bottom-20 right-16 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute top-1/3 right-10 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
//       <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
//     </section>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { FaJava } from "react-icons/fa";
import { FaPython, FaHtml5, FaCss3Alt, FaRobot, FaCalculator, FaFlask, FaBook, FaLanguage } from "react-icons/fa";

const curriculumSections = [
  {
    id: 'coding',
    title: (
      <>
        Coding{' '}
        <span className="text-blue-600 relative">
          Curriculum
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
            viewBox="0 0 200 12"
            fill="currentColor"
          >
            <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
          </svg>
        </span>
      </>
    ),
    description: "Our coding curriculum is beginner-friendly and hands-on. Students will explore essential programming languages and tools to kickstart their journey in tech.",
    subjects: [
      {
        title: "Python Basics",
        description: "Variables, loops, functions, logic building.",
        icon: <FaPython />,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200"
      },
      {
        title: "Java Fundamentals", 
        description: "OOP, classes, data types, simple programs.",
        icon: <FaJava />,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        borderColor: "border-orange-200"
      },
      {
        title: "HTML & CSS",
        description: "Create websites using real code, styling basics.",
        icon: <FaHtml5 />,
        color: "from-green-500 to-teal-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-200"
      },
      {
        title: "AI Tools for Students",
        description: "How to use ChatGPT, Canva, and productivity tools.",
        icon: <FaRobot />,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        borderColor: "border-purple-200"
      },
      {
        title: "Basic Computer Skills",
        description: "Typing, MS Word/Excel, internet usage, safety tips.",
        icon: <FaCss3Alt />,
        color: "from-indigo-500 to-blue-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-700",
        borderColor: "border-indigo-200"
      }
    ],
    ctaText: "🚀 Enroll for Coding",
    badges: [
      { text: "✅ Future Ready Skills", bg: "bg-green-100", color: "text-green-800" },
      { text: "🎯 Hands-on Learning", bg: "bg-purple-100", color: "text-purple-800" },
      { text: "📈 Progressive Difficulty", bg: "bg-orange-100", color: "text-orange-800" }
    ]
  },
  {
    id: 'subjects',
    title: (
      <>
        Academic{' '}
        <span className="text-purple-600 relative">
          Subjects
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-purple-200"
            viewBox="0 0 200 12"
            fill="currentColor"
          >
            <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
          </svg>
        </span>
      </>
    ),
    description: "Comprehensive academic support for core school subjects. Our expert teachers provide personalized guidance to help students excel in their studies.",
    subjects: [
      {
        title: "Mathematics",
        description: "Algebra, geometry, trigonometry, and problem-solving techniques.",
        icon: <FaCalculator />,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200"
      },
      {
        title: "Science (Physics & Biology)",
        description: "Fundamental concepts, experiments, and practical applications.",
        icon: <FaFlask />,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-200"
      },
      {
        title: "English",
        description: "Grammar, literature, writing skills, and communication.",
        icon: <FaBook />,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200"
      },
      {
        title: "Telugu",
        description: "Language skills, literature, and cultural understanding.",
        icon: <FaLanguage />,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-700",
        borderColor: "border-indigo-200"
      },
      {
        title: "Social Studies",
        description: "History, geography, civics, and current affairs.",
        icon: <FaBook />,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        borderColor: "border-yellow-200"
      },

    ],
    ctaText: "📚 Enroll for Subjects",
    badges: [
      { text: "📈 Score Improvement", bg: "bg-green-100", color: "text-green-800" },
      { text: "🎓 Board Exam Ready", bg: "bg-purple-100", color: "text-purple-800" },
      { text: "👨‍🏫 Real World Knowledge", bg: "bg-indigo-100", color: "text-indigo-800" }
    ]
  }
];

export default function CurriculumSection() {
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
        setCurrentSection((prev) => (prev + 1) % curriculumSections.length);
        setFade(true);
      }, 500);
    }, 6000); // Switch every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const currentCurriculum = curriculumSections[currentSection];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 md:px-8 relative overflow-hidden" 
      id="curriculum"
    >
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight transition-all duration-500">
            {currentCurriculum.title}
          </h2>
        </div>
        
        {/* <div className={`mt-6 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto transition-all duration-500">
            {currentCurriculum.description}
          </p>
        </div> */}

        {/* Subjects Grid */}
        <div className={`mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}>
          {currentCurriculum.subjects.map((subject, index) => (
            <div
              key={`${currentSection}-${index}`}
              className={`group p-6 ${subject.bgColor} ${subject.borderColor} border-2 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {subject.icon}
              </div>
              
              <h3 className={`text-xl font-bold ${subject.textColor} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                {subject.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {subject.description}
              </p>

              {/* Decorative corner elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className={`mt-12 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {currentCurriculum.ctaText}
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

        {/* Feature badges */}
        <div className={`flex flex-wrap gap-3 justify-center pt-8 transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          {currentCurriculum.badges.map((badge, index) => (
            <span key={index} className={`px-4 py-2 ${badge.bg} ${badge.color} rounded-full text-sm font-medium transition-all duration-500`}>
              {badge.text}
            </span>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-20 right-16 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
}