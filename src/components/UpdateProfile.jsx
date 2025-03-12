import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "@/store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); // Removed setEmail as it's now read-only
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [firstNiche, setFirstNiche] = useState(
    user?.firstNiche || user?.niches?.firstNiche || ""
  );
  const [secondNiche, setSecondNiche] = useState(
    user?.secondNiche || user?.niches?.secondNiche || ""
  );
  const [thirdNiche, setThirdNiche] = useState(
    user?.thirdNiche || user?.niches?.thirdNiche || ""
  );

  // Function to check if a niche is already selected
  const isNicheSelected = (niche, currentSelect) => {
    if (!niche) return false;
    const selectedNiches = [firstNiche, secondNiche, thirdNiche];
    return selectedNiches.filter(n => n === niche).length > (currentSelect === niche ? 1 : 0);
  };

  const handleNicheChange = (value, setter, position) => {
    if (value && isNicheSelected(value, position === 1 ? firstNiche : position === 2 ? secondNiche : thirdNiche)) {
      toast.error("This niche is already selected. Please choose a different one.");
      return;
    }
    setter(value);
  };

  const handleUpdateProfile = () => {
    // Additional validation for unique niches
    const niches = [firstNiche, secondNiche, thirdNiche].filter(Boolean);
    const uniqueNiches = new Set(niches);
    
    if (niches.length !== uniqueNiches.size) {
      toast.error("Please select different niches for each preference");
      return;
    }

    const formData = {
      name,
      email,
      phone,
      address,
      firstNiche: firstNiche || "",
      secondNiche: secondNiche || "",
      thirdNiche: thirdNiche || ""
    };
  
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      // Update the user data without navigating
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
      
      // Update local state with new user data
      setName(user?.name || "");
      setPhone(user?.phone || "");
      setAddress(user?.address || "");
      setFirstNiche(user?.firstNiche || user?.niches?.firstNiche || "");
      setSecondNiche(user?.secondNiche || user?.niches?.secondNiche || "");
      setThirdNiche(user?.thirdNiche || user?.niches?.thirdNiche || "");
    }
  }, [dispatch, error, isUpdated, user]);

  const nichesArray = [
    "",  // Empty option as default
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Update Profile
      </h3>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Email Address</label>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white cursor-not-allowed opacity-75"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Email cannot be changed</p>
        </div>

        <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Phone Number</label>
        <input
          type="text" // Changed from "number" to "text"
          pattern="[0-9]*" // Ensures only numbers can be entered
          inputMode="numeric" // Shows numeric keyboard on mobile devices
          value={phone}
          onChange={(e) => {
            // Only allow numeric input
            const value = e.target.value.replace(/[^0-9]/g, '');
            setPhone(value);
          }}
          className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                   rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">My Preferred Job Niches</label>
          <div className="flex flex-col space-y-4">
            {[
              { value: firstNiche, setter: setFirstNiche, position: 1, label: "First Preference" },
              { value: secondNiche, setter: setSecondNiche, position: 2, label: "Second Preference" },
              { value: thirdNiche, setter: setThirdNiche, position: 3, label: "Third Preference" }
            ].map((niche, index) => (
              <div key={index} className="space-y-1">
                <label className="text-sm text-gray-600 dark:text-gray-400">{niche.label}</label>
                <select
                  value={niche.value}
                  onChange={(e) => handleNicheChange(e.target.value, niche.setter, niche.position)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                           rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                >
                  {nichesArray.map((element, idx) => (
                    <option 
                      key={idx} 
                      value={element}
                      className="bg-white dark:bg-gray-700"
                      disabled={element && isNicheSelected(element, niche.value)}
                    >
                      {element || `Select ${niche.label}`}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                     text-white rounded-md transition-colors duration-200 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;