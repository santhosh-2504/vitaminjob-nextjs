import { useEffect } from 'react';

const CookiePolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content: "This Cookie Policy explains how Vitamin Job uses cookies and similar tracking technologies when you visit our website. Our website uses Google AdSense for advertising purposes, which involves additional cookies for ad personalization and delivery. By using our website, you acknowledge our use of essential cookies and advertising-related cookies as described in this policy. For analytics cookies, we'll ask for your explicit consent."
    },
    {
      title: "What Are Cookies?",
      content: `Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit our website. They help us:
• Remember your preferences and settings
• Understand how you use our website
• Improve your browsing experience
• Ensure our website's security
• Deliver relevant advertisements
• Measure ad performance`
    },
    {
      title: "Types of Cookies We Use",
      content: `1. Essential Cookies:
• Purpose: These cookies are necessary for the website to function properly
• Usage: Authentication, security, theme preferences, and session management
• Storage Duration: 7 days
• These cookies are always active

2. Analytics Cookies (Optional):
• Purpose: Help us understand how visitors interact with our website
• Provider: Google Analytics with privacy-focused configuration
• Features: IP anonymization enabled, limited data retention
• Storage Duration: Up to 26 months
• These cookies require your consent

3. Advertising Cookies:
• Provider: Google AdSense and certified vendors
• Purpose: Deliver personalized advertisements
• Usage:
  - Show relevant ads based on your interests
  - Track ad performance and interactions
  - Prevent repetitive ads
  - Combat fraud and abuse
• Storage Duration: Varies according to Google AdSense policies`
    },
    {
      title: "Advertising and Cookie Usage",
      content: `Google AdSense uses cookies to:
• Personalize ads based on:
  - Previous visits to our site
  - Your interests and online behavior
  - Geographic location
  - Browser and device information

• Track and measure:
  - Ad impressions and clicks
  - User interactions
  - Ad performance metrics

• Ensure quality by:
  - Preventing duplicate ads
  - Detecting invalid clicks
  - Maintaining security standards

You can manage ad personalization through:
• Google Ad Settings (https://adssettings.google.com)
• Network Advertising Initiative opt-out
• Browser cookie settings
• "Do Not Track" browser setting`
    },
    {
      title: "Analytics Consent",
      content: `• We ask for explicit consent before setting analytics cookies
• You can change analytics preferences anytime
• Declining analytics will not affect site functionality
• Analytics cookies help us improve our service
• You can withdraw analytics consent at any time
• Analytics data is retained for maximum 26 months`
    },
    {
      title: "Managing Cookies",
      content: `You can manage cookies through your browser settings:

• Chrome: Settings > Privacy and Security > Cookies
• Firefox: Options > Privacy & Security > Cookies
• Safari: Preferences > Privacy > Cookies
• Edge: Settings > Privacy & Security > Cookies

Note: 
• Blocking essential cookies will affect website functionality
• Each device and browser needs separate settings
• Blocking advertising cookies may affect ad relevance
• You can opt out of personalized advertising through Google Ad Settings`
    },
    {
      title: "Data Collection and Privacy",
      content: `• Essential cookies are necessary for site functionality
• Analytics data collection requires explicit consent
• Advertising cookies follow Google AdSense policies
• We implement standard security measures
• For more details, see our Privacy Policy
• We do not sell user data
• Limited data sharing with essential service providers`
    },
    {
      title: "Updates to This Policy",
      content: `• We may update this policy to reflect:
  - Changes in our practices
  - New features or services
  - Legal requirements
  - Changes in advertising technologies
• Updates will be posted on this page
• Significant changes will be notified
• Continued use means acceptance of changes`
    },
    {
      title: "Contact Us",
      content: `For cookie-related inquiries:
• Use our feedback form
• Email our privacy team
• Response within 48 business hours

For advertising-related concerns:
• Visit Google Ad Settings for personalization controls
• Use our feedback form for general ad questions
• Report inappropriate ads through Google AdSense`
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
              Cookie Policy
            </h1>
            
            <div className="text-gray-600 dark:text-gray-300 mb-8">
              Effective Date: January 6, 2025
            </div>

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
  );
};

export default CookiePolicy;