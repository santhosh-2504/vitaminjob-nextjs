// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const taglines = [
//   { lang: "Sanskrit", text: "शिक्षा अनन्तम् अस्ति" },
//   { lang: "English", text: "Education is Infinite" },
//   { lang: "Telugu", text: "విద్య అనంతమైనది" },
// ];

// function CornerLogo() {
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [isHeroVisible, setIsHeroVisible] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % taglines.length);
//         setFade(true);
//       }, 300);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const heroSection = document.getElementById('hero');
//     if (!heroSection) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsHeroVisible(entry.isIntersecting);
//       },
//       {
//         threshold: 0.3, // Logo disappears when hero is 30% out of view
//         rootMargin: '-50px 0px 0px 0px' // Add some margin for smoother transition
//       }
//     );

//     observer.observe(heroSection);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className={`fixed top-6 left-6 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-100 transition-all duration-500 ease-out ${
//       isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
//     }`}>
//       <Image
//         src="/images/logo-final.png"
//         alt="Anantha Learning Logo"
//         width={48}
//         height={48}
//         className="rounded-lg"
//       />
//       <div className="flex flex-col">
//         <span className="text-sm font-semibold text-gray-800">Anantha Learning</span>
//         <span
//           className={`text-xs text-gray-600 transition-opacity duration-500 ${
//             fade ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           {taglines[index].text}
//         </span>
//       </div>
//     </div>
//   );
// }

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: 'Home', id: 'hero' },
//     { name: 'About', id: 'about' },
//     { name: 'Curriculum', id: 'curriculum' },
//     { name: 'Pricing', id: 'pricing' },
//     { name: 'Contact', id: 'contact' }
//   ];

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsOpen(false); // Close mobile menu after clicking
//   };

//   return (
//     <nav className="fixed top-8 right-8 z-20">
//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-8">
//         {navItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => scrollToSection(item.id)}
//             className="relative text-gray-700 hover:text-blue-600 font-medium text-sm transition-all duration-300 group"
//           >
//             {item.name}
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//           </button>
//         ))}
//       </div>

//       {/* Mobile Navigation */}
//       <div className="md:hidden">
//         {/* Hamburger Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center justify-center w-10 h-10 transition-all duration-200"
//           aria-label="Toggle menu"
//         >
//           <div className="flex flex-col gap-1.5">
//             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
//             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </div>
//         </button>

//         {/* Mobile Menu */}
//         <div className={`absolute top-14 right-0 transition-all duration-300 transform origin-top-right ${
//           isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
//         }`}>
//           <div className="flex flex-col gap-1">
//             {navItems.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="text-right px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 relative group"
//                 style={{ 
//                   animationDelay: `${index * 50}ms`,
//                   transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
//                   transition: `all 0.3s ease ${index * 50}ms`
//                 }}
//               >
//                 {item.name}
//                 <span className="absolute -bottom-0.5 right-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-transparent md:hidden -z-10"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </nav>
//   );
// }

// const sections = [
//   {
//     id: 'coding',
//     title: (
//       <>
//         Learn{' '}
//         <span className="text-blue-600 relative">
//           Coding
//           <svg
//             className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
//             viewBox="0 0 200 12"
//             fill="currentColor"
//           >
//             <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
//           </svg>
//         </span>{' '}
//         & Computer Skills from{' '}
//         <span className="text-green-600">Scratch</span>
//       </>
//     ),
//     description: (
//       <>
//         🏠 <strong>Home and Online Tuitions</strong> in <span className="font-semibold text-black-700">Kurnool</span> for students from{' '}
//         <span className="font-semibold text-blue-700">Class 6 to Intermediate</span>.
//         <br />
//         💻 Practical, beginner-friendly, and fun coding experience!
//       </>
//     ),
//     tags: [
//       { text: "✅ Future Ready", bg: "bg-green-100", color: "text-green-800" },
//       { text: "🚀 Project Based", bg: "bg-blue-100", color: "text-blue-800" },
//       { text: "⚡ Interactive", bg: "bg-orange-100", color: "text-orange-800" }
//     ]
//   },
//   {
//     id: 'subjects',
//     title: (
//       <>
//         Master{' '}
//         <span className="text-purple-600 relative">
//           School Subjects
//           <svg
//             className="absolute -bottom-2 left-0 w-full h-3 text-purple-200"
//             viewBox="0 0 200 12"
//             fill="currentColor"
//           >
//             <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
//           </svg>
//         </span>{' '}
//         with{' '}
//         <span className="text-indigo-600">Expert Guidance</span>
//       </>
//     ),
//     description: (
//   <>
//     📘 <strong>Complete Academic Support</strong> for <span className="font-semibold text-purple-700">Math, Science, English and more</span>.
//     <br />
//     🎯 Personalized teaching methods to match every student's pace!
//   </>
// ),

//     tags: [
//       { text: "📈 Result Oriented", bg: "bg-green-100", color: "text-green-800" },
//       { text: "🎓 Board Focused", bg: "bg-purple-100", color: "text-purple-800" },
//       { text: "📝 Exam Ready", bg: "bg-indigo-100", color: "text-indigo-800" }
//     ]
//   }
// ];

// export default function HeroSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentSection((prev) => (prev + 1) % sections.length);
//         setTimeout(() => {
//           setFade(true);
//         }, 100);
//       }, 800); // Longer fade out duration
//     }, 6000); // Switch every 6 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-12 px-4 md:px-8 flex items-center relative" id="hero">
//       <CornerLogo />
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto w-full">
//         <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
//           {/* Image Section */}
//           <div className={`w-full md:w-1/2 flex justify-center transform transition-all duration-1000 ease-out ${
//             isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
//           }`}>
//             <div className="relative">
//               <Image
//                 src="/images/final-image.png"
//                 alt="Kid thinking about coding"
//                 width={450}
//                 height={450}
//                 className="object-contain scale-130 md:scale-210 drop-shadow-2xl hover:scale-125 md:hover:scale-200 transition-transform duration-300"
//                 priority
//               />
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
//               <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-60"></div>
//             </div>
//           </div>

//           {/* Text Section */}
//           <div className={`md:w-1/2 w-full text-center md:text-left space-y-6 transform transition-all duration-1000 ease-out ${
//             isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
//           }`} style={{ transitionDelay: '200ms' }}>

//             <div className={`transform transition-all duration-800 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`} style={{ transitionDelay: '400ms' }}>
//               <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transition-all duration-1000 ease-in-out transform ${
//                 fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//               }`}>
//                 {sections[currentSection].title}
//               </h1>
//             </div>

//             <div className={`transform transition-all duration-800 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`} style={{ transitionDelay: '600ms' }}>
//               <p className={`text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl transition-all duration-1000 ease-in-out transform ${
//                 fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//               }`}>
//                 {sections[currentSection].description}
//               </p>
//             </div>

//             <div className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transform transition-all duration-800 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`} style={{ transitionDelay: '800ms' }}>
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 📞 Book a Free Demo
//                 <svg
//                   className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             </div>

//             <div className={`flex flex-wrap gap-3 justify-center md:justify-start pt-4 transform transition-all duration-800 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
//               {sections[currentSection].tags.map((tag, index) => (
//                 <span key={index} className={`px-4 py-2 ${tag.bg} ${tag.color} rounded-full text-sm font-medium transition-all duration-500`}>
//                   {tag.text}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Floating Animation Elements */}
//         <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20"></div>
//         <div className="absolute bottom-32 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const taglines = [
  { lang: "Sanskrit", text: "शिक्षा अनन्तम् अस्ति" },
  { lang: "English", text: "Education is Infinite" },
  { lang: "Telugu", text: "విద్య అనంతమైనది" },
];

function CornerLogo() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px 0px 0px'
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed top-6 left-6 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-100 transition-all duration-500 ease-out ${
      isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      <Image
        src="/images/logo-final.png"
        alt="Anantha Learning - Coding and Computer Skills Tuition in Kurnool"
        width={48}
        height={48}
        className="rounded-lg"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">Anantha Learning</span>
        <span
          className={`text-xs text-gray-600 transition-opacity duration-500 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {taglines[index].text}
        </span>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'hero', description: 'Anantha Learning Homepage' },
    { name: 'About', id: 'about', description: 'About our coding and academic tutoring services' },
    { name: 'Curriculum', id: 'curriculum', description: 'Our coding and academic curriculum' },
    { name: 'Pricing', id: 'pricing', description: 'Affordable tuition pricing plans' },
    { name: 'Contact', id: 'contact', description: 'Contact us for home tuitions in Kurnool' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-8 right-8 z-20" role="navigation" aria-label="Main navigation">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative text-gray-700 hover:text-blue-600 font-medium text-sm transition-all duration-300 group"
            aria-label={item.description}
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 transition-all duration-200"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        <div className={`absolute top-14 right-0 transition-all duration-300 transform origin-top-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-right px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 relative group"
                aria-label={item.description}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.3s ease ${index * 50}ms`
                }}
              >
                {item.name}
                <span className="absolute -bottom-0.5 right-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent md:hidden -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
}

const sections = [
  {
    id: 'coding',
    title: (
      <>
        Learn{' '}
        <span className="text-blue-600 relative">
          Coding
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
            viewBox="0 0 200 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
          </svg>
        </span>{' '}
        & Computer Skills from{' '}
        <span className="text-green-600">Scratch</span>
      </>
    ),
    description: (
      <>
        🏠 <strong>Home and Online Tuitions</strong> in <span className="font-semibold text-black-700">Kurnool</span> for students from{' '}
        <span className="font-semibold text-blue-700">Class 6 to Intermediate</span>.
        <br />
        💻 Practical, beginner-friendly, and fun coding experience!
      </>
    ),
    tags: [
      { text: "✅ Future Ready", bg: "bg-green-100", color: "text-green-800" },
      { text: "🚀 Project Based", bg: "bg-blue-100", color: "text-blue-800" },
      { text: "⚡ Interactive", bg: "bg-orange-100", color: "text-orange-800" }
    ],
    structured: {
      title: "Learn Coding & Computer Skills from Scratch",
      description: "Home and Online Tuitions in Kurnool for students from Class 6 to Intermediate. Practical, beginner-friendly, and fun coding experience!"
    }
  },
  {
    id: 'subjects',
    title: (
      <>
        Master{' '}
        <span className="text-purple-600 relative">
          School Subjects
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-purple-200"
            viewBox="0 0 200 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
          </svg>
        </span>{' '}
        with{' '}
        <span className="text-indigo-600">Expert Guidance</span>
      </>
    ),
    description: (
      <>
        📘 <strong>Complete Academic Support</strong> for <span className="font-semibold text-purple-700">Math, Science, English and more</span>.
        <br />
        🎯 Personalized teaching methods to match every student's pace!
      </>
    ),
    tags: [
      { text: "📈 Result Oriented", bg: "bg-green-100", color: "text-green-800" },
      { text: "🎓 Board Focused", bg: "bg-purple-100", color: "text-purple-800" },
      { text: "📝 Exam Ready", bg: "bg-indigo-100", color: "text-indigo-800" }
    ],
    structured: {
      title: "Master School Subjects with Expert Guidance",
      description: "Complete Academic Support for Math, Science, English and more. Personalized teaching methods to match every student's pace!"
    }
  }
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSection((prev) => (prev + 1) % sections.length);
        setTimeout(() => {
          setFade(true);
        }, 100);
      }, 800);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Anantha Learning",
    "description": "Premier coding and academic tuition center in Kurnool offering home and online tuitions for students from Class 6 to Intermediate",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": "/images/logo-final.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kurnool",
      "addressRegion": "Andhra Pradesh",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "description": "Contact for home tuitions and online classes"
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Kurnool, Andhra Pradesh"
    },
    "educationalCredentialAwarded": "Coding Skills, Computer Skills, Academic Excellence",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Educational Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Coding and Computer Skills",
            "description": "Learn programming from scratch with project-based learning",
            "educationalLevel": "Class 6 to Intermediate"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Academic Subjects",
            "description": "Complete support for Math, Science, English and other school subjects",
            "educationalLevel": "Class 6 to Intermediate"
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>Anantha Learning - Best Coding & Academic Tuition in Kurnool | Home & Online Classes</title>
        <meta name="description" content="Premier coding and academic tuition in Kurnool. Home & online classes for Class 6-Intermediate students. Learn programming, Math, Science, English with expert guidance. Book free demo!" />
        <meta name="keywords" content="coding tuition Kurnool, computer classes Kurnool, home tuition Kurnool, online tuition Andhra Pradesh, programming classes, academic support, Math tuition, Science tuition, Class 6 to Intermediate" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Anantha Learning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Anantha Learning - Best Coding & Academic Tuition in Kurnool" />
        <meta property="og:description" content="Premier coding and academic tuition in Kurnool. Home & online classes for Class 6-Intermediate students. Learn programming, Math, Science, English with expert guidance." />
        <meta property="og:image" content="/images/final-image.png" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:site_name" content="Anantha Learning" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anantha Learning - Best Coding & Academic Tuition in Kurnool" />
        <meta name="twitter:description" content="Premier coding and academic tuition in Kurnool. Home & online classes for Class 6-Intermediate students." />
        <meta name="twitter:image" content="/images/final-image.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Kurnool" />
        <meta name="geo.position" content="15.8281;78.0373" />
        <meta name="ICBM" content="15.8281, 78.0373" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>
        <section 
          className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-12 px-4 md:px-8 flex items-center relative" 
          id="hero"
          role="banner"
          aria-label="Hero section - Anantha Learning home and online tuition services"
        >
          <CornerLogo />
          <Navbar />
          
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              
              {/* Image Section */}
              <div className={`w-full md:w-1/2 flex justify-center transform transition-all duration-1000 ease-out ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
                <figure className="relative">
                  <Image
                    src="/images/final-image.png"
                    alt="Student learning coding and computer skills at Anantha Learning tuition center in Kurnool"
                    width={450}
                    height={450}
                    className="object-contain scale-130 md:scale-210 drop-shadow-2xl hover:scale-125 md:hover:scale-200 transition-transform duration-300"
                    priority
                    loading="eager"
                  />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80" aria-hidden="true"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-60" aria-hidden="true"></div>
                </figure>
              </div>

              {/* Text Section */}
              <div className={`md:w-1/2 w-full text-center md:text-left space-y-6 transform transition-all duration-1000 ease-out ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`} style={{ transitionDelay: '200ms' }}>

                <div className={`transform transition-all duration-800 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transition-all duration-1000 ease-in-out transform ${
                    fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {sections[currentSection].title}
                  </h1>
                  {/* Hidden structured text for SEO */}
                  <span className="sr-only">{sections[currentSection].structured.title}</span>
                </div>

                <div className={`transform transition-all duration-800 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  <p className={`text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl transition-all duration-1000 ease-in-out transform ${
                    fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {sections[currentSection].description}
                  </p>
                  {/* Hidden structured text for SEO */}
                  <span className="sr-only">{sections[currentSection].structured.description}</span>
                </div>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transform transition-all duration-800 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '800ms' }}>
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Book a free demo class for coding and academic tuition in Kurnool"
                    role="button"
                  >
                    📞 Book a Free Demo
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <div className={`flex flex-wrap gap-3 justify-center md:justify-start pt-4 transform transition-all duration-800 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
                  {sections[currentSection].tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`px-4 py-2 ${tag.bg} ${tag.color} rounded-full text-sm font-medium transition-all duration-500`}
                      role="text"
                      aria-label={`Feature: ${tag.text}`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20" aria-hidden="true"></div>
            <div className="absolute bottom-32 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
          </div>
        </section>
      </main>
    </>
  );
}