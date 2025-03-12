import Link from 'next/link'
import { useSelector } from "react-redux";
import {
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="text-center lg:text-left">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-[150px] w-auto mx-auto lg:mx-0 dark:invert"
            />
          </div>

          {/* Support Section */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Andhra Pradesh, India</li>
              <li>vitamin4job@gmail.com</li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Jobs
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/feedback"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Feedback
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2">
              {[

                { icon: FaSquareInstagram, label: "Instagram" , url:"https://www.instagram.com/vitaminjob2025/profilecard/?igsh=MWRsMjQ1azFhbXZtMQ=="},
                { icon: FaSquareWhatsapp, label: "WhatsApp" , url :"https://chat.whatsapp.com/Jcvi1ScKimw4D6QHwB8bJl"},

                { icon: FaLinkedin, label: "LinkedIn" , url:"https://www.linkedin.com/in/santhosh-kumar-995860344/"},
              
              ].map((social, index) => (
                <li key={index}>
                  <Link
                    href={social.url}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <social.icon className="text-xl" />
                    <span>{social.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      <div className="bg-gray-200 dark:bg-gray-900 py-4 text-center text-gray-600 dark:text-gray-400">
        &copy; CopyRight 2024. All Rights Reserved By VitaminJob.
      </div>
    </>
  );
};

export default Footer;
