import { useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/store/context/ThemeContext";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-200 
      ${show ? "h-screen md:h-auto" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Home">
              <img 
                src="/images/logo.png" 
                alt="Website logo" 
                className="h-8 w-auto dark:invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                HOME
              </Link>
              <a
                href="/jobs"
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                ACTIVE JOBS
              </a>
              <Link 
                href="/resources" 
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              >
                RESOURCES
              </Link>
            
              
              {isAuthenticated ? (
                <Link 
                  href="/dashboard"
                  className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                >
                  DASHBOARD
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>

          {/* Right Side: Theme Toggle Button and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={theme ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme ? (
                <FaSun className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-700" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setShow(!show)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle navigation menu"
              aria-expanded={show}
              aria-controls="mobile-menu"
            >
              <GiHamburgerMenu className="w-6 h-6 text-gray-700 dark:text-gray-100" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden ${show ? 'block' : 'hidden'}`}
          id="mobile-menu"
          role="region"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-4 px-2 pt-2 pb-3">
            <Link 
              href="/" 
              className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setShow(false)}
            >
              HOME
            </Link>
            <a
              href="/jobs"
              className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setShow(false)}
            >
             ACTIVE JOBS
            </a>
            <Link 
              href="/resources"
              className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setShow(false)}
            >
              RESOURCES
            </Link>
          
            
            {isAuthenticated ? (
              <Link 
                href="/dashboard"
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setShow(false)}
              >
                DASHBOARD
              </Link>
            ) : (
              <Link 
                href="/login"   
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setShow(false)}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;