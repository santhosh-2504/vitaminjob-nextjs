'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAllUserErrors, register } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import Head from "next/head";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
    matches: false
  });

  const validatePassword = (password, confirmPass) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      matches: password === confirmPass && password !== ""
    });
  };

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!Object.values(passwordValidation).every(Boolean)) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      router.push("/");
    }
  }, [dispatch, error, isAuthenticated, router]);

  const PasswordRequirements = () => (
    <div className="text-sm space-y-1 mt-2 text-gray-600 dark:text-gray-400">
      <p className={passwordValidation.minLength ? "text-green-500" : ""}>
        ✓ At least 8 characters
      </p>
      <p className={passwordValidation.hasUpper ? "text-green-500" : ""}>
        ✓ At least one uppercase letter
      </p>
      <p className={passwordValidation.hasLower ? "text-green-500" : ""}>
        ✓ At least one lowercase letter
      </p>
      <p className={passwordValidation.hasNumber ? "text-green-500" : ""}>
        ✓ At least one number
      </p>
      <p className={passwordValidation.hasSpecial ? "text-green-500" : ""}>
        ✓ At least one special character
      </p>
      <p className={passwordValidation.matches ? "text-green-500" : "text-red-500"}>
        {passwordValidation.matches ? "✓ Passwords match" : "✗ Passwords do not match"}
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <title>Register | Vitamin Job</title>
        <meta name="description" content="Vitamin Job is a Job search platform that helps you in finding your dream job. Register now and start your journey to success." />
      </Head>
      <div className="mt-5">
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6 mt-20">
              Create a New Account
            </h3>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <FaPencilAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <MdOutlineMailOutline className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <FaPhoneFlip className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="111-222-333"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setPhone(value);
                    }}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <PasswordRequirements />

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="age-verify"
                      type="checkbox"
                      checked={isAgeVerified}
                      onChange={(e) => setIsAgeVerified(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                      required
                    />
                  </div>
                  <label htmlFor="age-verify" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    I confirm that I am at least 16 years old
                  </label>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !Object.values(passwordValidation).every(Boolean) || !isAgeVerified || !isTermsAccepted}
                className={`w-full py-2 text-white font-medium rounded-md transition ${
                  loading || !Object.values(passwordValidation).every(Boolean) || !isAgeVerified || !isTermsAccepted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;