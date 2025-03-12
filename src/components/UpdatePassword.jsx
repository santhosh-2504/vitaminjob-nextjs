import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAllUpdateProfileErrors, updatePassword } from "@/store/slices/updateProfileSlice";
import { getUser } from "@/store/slices/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  // State for passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // State for password visibility
  const [visibility, setVisibility] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // State for password validation
  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
    matches: false,
    notSameAsOld: true
  });

  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    validatePassword(newPassword, confirmPassword, oldPassword);
  }, [newPassword, confirmPassword, oldPassword]);

  const validatePassword = (password, confirmPass, oldPass) => {
    setValidation({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      matches: password === confirmPass && password !== "",
      notSameAsOld: password !== oldPass && password !== ""
    });
  };

  const handleUpdatePassword = () => {
    const isValid = Object.values(validation).every(v => v);
    
    if (!isValid) {
      toast.error("Please ensure all password requirements are met");
      return;
    }

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  const toggleVisibility = (field) => {
    setVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Password requirements component
  const PasswordRequirements = () => (
    <div className="text-sm space-y-1 mt-2 text-gray-600 dark:text-gray-400">
      <p className={validation.minLength ? "text-green-500" : ""}>
        ✓ At least 8 characters
      </p>
      <p className={validation.hasUpper ? "text-green-500" : ""}>
        ✓ At least one uppercase letter
      </p>
      <p className={validation.hasLower ? "text-green-500" : ""}>
        ✓ At least one lowercase letter
      </p>
      <p className={validation.hasNumber ? "text-green-500" : ""}>
        ✓ At least one number
      </p>
      <p className={validation.hasSpecial ? "text-green-500" : ""}>
        ✓ At least one special character
      </p>
      <p className={validation.matches ? "text-green-500" : "text-red-500"}>
        {validation.matches ? "✓ Passwords match" : "✗ Passwords do not match"}
      </p>
      <p className={validation.notSameAsOld ? "text-green-500" : "text-red-500"}>
        {validation.notSameAsOld ? "✓ Different from current password" : "✗ Must be different from current password"}
      </p>
    </div>
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVisibility({ old: false, new: false, confirm: false });
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Update Password
      </h3>

      <div className="space-y-4">
        {/* Current Password Field */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
            <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type={visibility.old ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('old')}
              className="text-gray-500 focus:outline-none"
            >
              {visibility.old ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
            <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type={visibility.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('new')}
              className="text-gray-500 focus:outline-none"
            >
              {visibility.new ? <FaEyeSlash /> : <FaEye />}
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
              type={visibility.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('confirm')}
              className="text-gray-500 focus:outline-none"
            >
              {visibility.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <PasswordRequirements />

        {/* Update Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdatePassword}
            disabled={loading || !Object.values(validation).every(v => v)}
            className={`w-full py-2 text-white font-medium rounded-md transition ${
              loading || !Object.values(validation).every(v => v)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;