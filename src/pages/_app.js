import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "@/store/store";
import { getUser } from "@/store/slices/userSlice";
import Layout from "@/components/Layout/index";
import { AppProvider } from "@/store/provider";
import Head from "next/head"; // Import Head for favicon and AdSense
import Script from "next/script"; // Import Next.js Script for optimized loading
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

// Wrapper component to use hooks
function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    // Check auth state when app loads
    store.dispatch(getUser());

    // Show spinner on route change start
    const handleRouteChangeStart = () => setLoading(true);
    // Hide spinner on route change complete
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Set the favicon */}
        <meta name="google-adsense-account" content="ca-pub-8413438270446322"></meta>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <title>Vitamin Job</title>
      </Head>

      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-GBLM3VR7LL"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GBLM3VR7LL', { 'anonymize_ip': true });
        `}
      </Script>

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
    </>
  );
}

function MyApp(props) {
  return (
    <AppProvider> {/* Use the combined provider */}
      <AppContent {...props} />
    </AppProvider>
  );
}

export default MyApp;