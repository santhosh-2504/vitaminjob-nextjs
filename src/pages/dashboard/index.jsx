'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "@/components/MyProfile";
import UpdateProfile from "@/components/UpdateProfile";
import UpdatePassword from "@/components/UpdatePassword";
import DeleteAccount from "@/components/DeleteAccount";


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [componentName]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [dispatch, error, loading, isAuthenticated, router]);

  return (
    <div className="pt-8">
      <section className="dashboard bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <div className="max-w-7xl mx-auto py-14">
          {/* Dashboard Header */}
          <div className="dashboard-header flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p>
              Welcome, <span className="font-medium">{user?.name}</span>!
            </p>
          </div>

          <div className="dashboard-container flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div
              className={`sidebar bg-white dark:bg-gray-800 shadow-lg rounded-lg md:w-1/4 transition-transform ${
                show ? "block" : "hidden md:block"
              }`}
            >
              <ul className="sidebar-links space-y-4 p-6">
                <h4 className="text-lg font-semibold">Manage Account</h4>
                {[
                  { name: "My Profile", component: "My Profile" },
                  { name: "Update Profile", component: "Update Profile" },
                  { name: "Update Password", component: "Update Password" },
                ].map(({ name, component }, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setComponentName(component);
                        setShow(false);
                      }}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {name}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setComponentName("Delete Account");
                      setShow(false);
                    }}
                    className="w-full text-left text-red-500 hover:text-red-700"
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="content flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div
                className="sidebar-toggle md:hidden mb-4 flex justify-end"
                onClick={() => setShow(!show)}
              >
                <LuMoveRight
                  className={`text-2xl cursor-pointer ${
                    show ? "rotate-180" : ""
                  }`}
                />
              </div>
              
              {/* Dynamic Component Rendering */}
              {(() => {
                switch (componentName) {
                  case "My Profile":
                    return <MyProfile />;
                  case "Update Profile":
                    return <UpdateProfile />;
                  case "Update Password":
                    return <UpdatePassword />;
                  case "Delete Account":
                    return <DeleteAccount />;
                  default:
                    return <MyProfile />;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;