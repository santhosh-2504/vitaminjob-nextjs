import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from 'next/link';
import { clearAllUserErrors, login, resetAuthErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux state
  const { error, isAuthenticated, loading: authLoading } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const loginData = {
      email,
      password
    };
    dispatch(login(loginData));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/password/send-otp", {
        email: forgotEmail
      });
      toast.success(data.message);
      setShowForgotModal(false);
      setShowOTPModal(true);
      setResendTimer(120); // 2 minutes
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/password/verify-otp", {
        email: forgotEmail,
        otp
      });
      toast.success(data.message);
      setShowOTPModal(false);
      setShowResetModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/password/reset-password", {
        email: forgotEmail,
        otp,
        newPassword
      });
      toast.success(data.message);
      setShowResetModal(false);
      // Reset all states
      setForgotEmail("");
      setOTP("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Timer effect for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Reset auth errors when component mounts
  useEffect(() => {
    dispatch(resetAuthErrors());
    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [dispatch]);

  // Navigate after successful login
  useEffect(() => {
    if (isAuthenticated) {
      // Check if we have a return path in the state
      if (location.state?.from) {
        router.push(location.state.from, {
          state: { applyAfterLogin: location.state.applyAfterLogin }
        });
      } else {
        // If no return path, go to default page
        router.push('/');
      }
    }
  }, [isAuthenticated]);

  // Handle errors
  useEffect(() => {
    if (error && error !== "Please login to access this resource") {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Login to Your Account
        </h3>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md mt-2 p-2 bg-gray-50 dark:bg-gray-700">
              <MdOutlineMailOutline className="text-xl text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent border-none focus:outline-none px-2 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md mt-2 p-2 bg-gray-50 dark:bg-gray-700">
              <RiLock2Fill className="text-xl text-gray-500 dark:text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 bg-transparent border-none focus:outline-none px-2 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-2 text-white font-medium rounded-md transition ${
              authLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {authLoading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Register Now
            </Link>
          </p>
          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Forgot Password?{" "}
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </p>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Forgot Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Enter OTP</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please enter the OTP sent to your email
            </p>
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  maxLength={6}
                  required
                />
              </div>
              {resendTimer > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Resend OTP in {Math.floor(resendTimer / 60)}:
                  {(resendTimer % 60).toString().padStart(2, "0")}
                </p>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleForgotPassword}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Resend OTP
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;

