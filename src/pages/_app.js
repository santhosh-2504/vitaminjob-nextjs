import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { store } from "@/store/store";
import { getUser } from "@/store/slices/userSlice";
import Layout from "@/components/Layout/index";
import { AppProvider } from "@/store/provider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// Wrapper component to use hooks
function AppContent({ Component, pageProps }) {
  useEffect(() => {
    // Check auth state when app loads
    store.dispatch(getUser());
  }, []);

  return (
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
