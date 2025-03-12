import Hero from "@/components/Hero";
import TopNiches from "@/components/TopNiches";
import HowItWorks from "@/components/HowItWorks";
import  { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Top Niches Section */}
      <section id="top-niches" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <TopNiches />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <HowItWorks />
        </div>
      </section>
    </main>
    </>
  );
};

export default Home;
