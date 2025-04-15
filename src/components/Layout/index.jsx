'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const hideAdsOn = ['/dashboard', '/login', '/register'];
  return (
    <>
      <Navbar />
      {!hideAdsOn.includes(router.pathname) && <AdBanner />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
