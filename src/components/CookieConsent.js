import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["userConsent"]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show the banner only if consent is not already given
    if (!cookies.userConsent) {
      setShowBanner(true);
    } else if (cookies.userConsent === "true") {
      // Initialize Google Analytics if consent is already given
      initializeGoogleAnalytics();
    }
  }, [cookies]);

  const initializeGoogleAnalytics = () => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-GBLM3VR7LL";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-GBLM3VR7LL", { anonymize_ip: true });
    };
  };

  const handleAccept = () => {
    // Save consent in a cookie
    setCookie("userConsent", "true", { path: "/", maxAge: 31536000 }); // 1 year
    setShowBanner(false);

    // Initialize Google Analytics
    initializeGoogleAnalytics();
  };

  const handleDecline = () => {
    // Save decline in a cookie
    setCookie("userConsent", "false", { path: "/", maxAge: 31536000 }); // 1 year
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          We use cookies to improve your experience. By clicking &rdquo;Allow,&quot; you
          agree to our use of cookies for analytics.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleAccept}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Allow
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;