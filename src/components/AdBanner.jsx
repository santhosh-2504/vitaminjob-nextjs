import { useEffect } from "react";

const AdBanner = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && process.env.NODE_ENV === "production") {
          window.adsbygoogle.push({});
          console.log("AdSense initialized");
        }
      } catch (e) {
        console.error("AdSense error:", e);
        console.log("AdSense not initialized");
      }
    }, 300);
  
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className="w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8413438270446322"
        data-ad-slot="7599780658"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
