import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { store } from "@/store/store";
import { getUser } from "@/store/slices/userSlice";
import Layout from "@/components/Layout/index";
import { AppProvider } from "@/store/provider";
import Head from "next/head"; // Import Head for favicon and AdSense
import Script from "next/script"; // Import Next.js Script for optimized loading
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// Wrapper component to use hooks
function AppContent({ Component, pageProps }) {
  useEffect(() => {
    // Check auth state when app loads
    store.dispatch(getUser());
  }, []);

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
        onLoad={() => console.log("AdSense script loaded")}
      />

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
git 