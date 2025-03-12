import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { deleteAccount } from '@/store/slices/userSlice'; // Update path as needed

const DeleteAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  
  // eslint-disable-next-line no-unused-vars
  const { loading } = useSelector((state) => state.user);

  const handleDelete = async () => {
    if (!isConfirmed || !password) {
      toast.warning('Please confirm the deletion and enter your password.');
      return;
    }

    try {
      await dispatch(deleteAccount(password)).unwrap();
      toast.success('Your account has been deleted successfully.');
      // Add a small delay before navigation
      setTimeout(() => {
        router.push('/');
      }, 2000); // 2 seconds delay to show the toast
    } catch (error) {
      toast.error(error || 'Failed to delete account. Please try again.');
    }
  };
  return (
    <div className="delete-account bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-red-500 mb-4">Delete Your Account</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        We&apos;re sorry to see you go. Deleting your account is irreversible and all your data will be permanently lost. Please make sure you really want to do this.
      </p>

      <div className="confirmation-section mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
          />
          I confirm that I want to permanently delete my account.
        </label>
      </div>

      <div className="password-section mb-6">
        <label className="block text-gray-600 dark:text-gray-300 mb-2">Enter your password to confirm</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200"
          placeholder="Enter your password"
        />
      </div>

      <div className="action-buttons flex justify-between">
        <button
          onClick={() => router.back()}
          className="w-1/2 py-3 px-6 text-gray-700 dark:text-gray-300 border border-gray-300 rounded-lg bg-gray-200 dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading || !isConfirmed || !password}
          className={`w-1/2 py-3 px-6 text-white rounded-lg ${
            loading || !isConfirmed || !password
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;