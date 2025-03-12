import { useSelector} from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        My Profile
      </h3>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Full Name</label>
          <input
            type="text"
            disabled
            value={user?.name || ''}
            onChange={(e) => e.target.value}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white disabled:opacity-75"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Email Address</label>
          <input
            type="email"
            disabled
            value={user?.email || ''}
            onChange={(e) => e.target.value}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white disabled:opacity-75"
          />
        </div>

        {user?.role === "Job Seeker" && (
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 dark:text-gray-200">
              My Preferred Job Niches
            </label>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                disabled
                value={user?.niches?.firstNiche || ''}
                onChange={(e) => e.target.value}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-md text-gray-900 dark:text-white disabled:opacity-75"
              />
              <input
                type="text"
                disabled
                value={user?.niches?.secondNiche || ''}
                onChange={(e) => e.target.value}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-md text-gray-900 dark:text-white disabled:opacity-75"
              />
              <input
                type="text"
                disabled
                value={user?.niches?.thirdNiche || ''}
                onChange={(e) => e.target.value}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-md text-gray-900 dark:text-white disabled:opacity-75"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Phone Number</label>
          <input
            type="number"
            disabled
            value={user?.phone || ''}
            onChange={(e) => e.target.value}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white disabled:opacity-75"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Joined On</label>
          <input
            type="text"
            disabled
            value={user?.createdAt ? new Date(user.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Kolkata'
            }).replace(/\//g, '-').replace(',', ' |') : ''}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white disabled:opacity-75"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;