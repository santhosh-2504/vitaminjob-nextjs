import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "@/store/store";
import { getUser } from "@/store/slices/userSlice";
import Layout from "@/components/Layout/index";
import { AppProvider } from "@/store/provider";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";
import Script from "next/script";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import CookieConsent from "@/components/CookieConsent";

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initialize Ads on route change
  const initAds = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  };

  useEffect(() => {
    store.dispatch(getUser());

    const handleRouteChangeStart = (url) => {
      const currentPath = router.asPath.split('?')[0];
      const newPath = url.split('?')[0];
      if (currentPath !== newPath) setLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      setLoading(false);
      initAds(); // Initialize ads after route change
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-8413438270446322" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <title>Vitamin Job</title>
      </Head>

      <Script
        strategy="lazyOnLoad" // Changed from afterInteractive
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8413438270446322"
        crossOrigin="anonymous"
        onLoad={() => {
          // Initialize ads after script loads
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }}
        onError={(e) => console.error('AdSense script failed to load', e)}
      />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      )}

      <Layout>
        <Component {...pageProps} />
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="light" 
        />
      </Layout>

      <CookieConsent />
    </>
  );
}

function MyApp(props) {
  return (
    <AppProvider>
      <CookiesProvider>
        <AppContent {...props} />
      </CookiesProvider>
    </AppProvider>
  );
}

export default MyApp;