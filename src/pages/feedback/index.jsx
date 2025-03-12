import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { FaComments } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { MdFeedback } from 'react-icons/md';
import emailjs from '@emailjs/browser';

const FeedbackForm = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        'service_94ukwyk',
        'template_jadl04b',
        {
          from_name: feedback.name,
          from_email: feedback.email,
          message: feedback.message,
          reply_to: feedback.email,
        },
        '1JXhN38h2EQaNKWUM'
      )
      .then(() => {
        setFeedback({ name: '', email: '', message: '' });
        alert('Feedback submitted successfully!');
      })
      .catch((error) => {
        console.error('Failed to send feedback:', error);
        alert('Failed to send feedback. Please try again.');
      });
  };

  return (
    <div className="pt-8">
      <section className="feedback bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <div className="max-w-7xl mx-auto py-14">
          <div className="feedback-header flex justify-center items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <FaComments className="text-blue-600" />
                Share Your Feedback
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Help us improve your learning experience
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Why Your Feedback Matters</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <BsPencilSquare className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">Shape Our Platform</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your insights help us enhance our learning resources and create a better experience for all users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MdFeedback className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">Drive Improvements</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We value your suggestions and use them to make meaningful updates to our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Submit Feedback</h2>
              {isAuthenticated ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                    className="w-full p-4 mb-4 border rounded-lg text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    value={feedback.email}
                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                    className="w-full p-4 mb-4 border rounded-lg text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    placeholder="Your Email"
                    required
                  />
                  <textarea
                    value={feedback.message}
                    onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                    className="w-full h-48 p-4 mb-4 border rounded-lg resize-none text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    Submit Feedback
                  </button>
                </form>
              ) : (
                <div className="text-center text-gray-600 dark:text-gray-300">
                  Please login to submit feedback
                </div>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                Your feedback helps us create a better learning experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackForm;
