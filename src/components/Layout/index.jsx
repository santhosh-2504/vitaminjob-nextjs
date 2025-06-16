// 'use client';

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Navbar />
//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// };

// export default Layout;

'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();

  // Add all paths where you want to hide navbar and footer
  const hideLayout = pathname === "/tutorials";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;