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
import CookieConsent from "@/components/CookieConsent"; // Import the CookieConsent component

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    store.dispatch(getUser());

    const handleRouteChangeStart = (url) => {
      // Extract path without query parameters
      const currentPath = router.asPath.split('?')[0];
      const newPath = url.split('?')[0];
      
      // Only show loader if path changes
      if (currentPath !== newPath) {
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = () => setLoading(false);

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
        {/* Set the favicon */}
        <meta name="google-adsense-account" content="ca-pub-8413438270446322"></meta>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <title>Vitamin Job</title>
      </Head>

      <Script
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8413438270446322"
        crossOrigin="anonymous"
      />

      {/* Global Loading Spinner */}
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

      {/* Cookie Consent Banner */}
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