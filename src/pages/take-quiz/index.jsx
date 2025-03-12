import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    startQuiz,  
    setAnswer, 
    nextQuestion, 
    previousQuestion,
    resetQuizTaking,
    handleSubmitQuiz
} from '../../store/slices/quizTakingSlice.js';
import Spinner from './Spinner';
import { FaClock, FaArrowLeft, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const TakeQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    
    const { 
        activeQuiz, 
        currentQuestionIndex, 
        userAnswers, 
        loading, 
        error,
        startTime,
        quizResult 
    } = useSelector(state => state.quizTaking);

    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            toast.error("Please login to take quizzes");
            return;
        }
        dispatch(startQuiz(id));
        return () => dispatch(resetQuizTaking());
    }, [dispatch, id, user, navigate]);

    useEffect(() => {
    }, [activeQuiz, currentQuestionIndex, userAnswers, loading, error, startTime, quizResult]);

    useEffect(() => {
        if (startTime) {
            const timer = setInterval(() => {
                setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [startTime]);

    useEffect(() => {
        if (activeQuiz && userAnswers) {
            localStorage.setItem(`quiz_${id}_answers`, JSON.stringify(userAnswers));
        }
    }, [userAnswers, id, activeQuiz]);

    const handleAnswerSelect = (questionId, option, index) => {
        dispatch(setAnswer({ questionId, answer: index }));
    };
    const handleSubmit = () => {
        
        if (!activeQuiz) {
            console.error('No active quiz found');
            return;
        }
        
        const totalAnswered = Object.keys(userAnswers || {}).length;
        if (totalAnswered === activeQuiz.questions.length) {
            dispatch(handleSubmitQuiz(activeQuiz, userAnswers, startTime));
            localStorage.removeItem(`quiz_${id}_answers`);
        }
    };

    const handleNext = () => {
        if (hasAnsweredCurrent) {
            dispatch(nextQuestion());
        } else {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
        }
    };

    const handlePrevious = () => {
        dispatch(previousQuestion());
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (!activeQuiz) return null;

    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === activeQuiz.questions.length - 1;
    const hasAnsweredCurrent = userAnswers[currentQuestion._id] !== undefined;
    const totalAnswered = Object.keys(userAnswers).length;
    const progressPercentage = (totalAnswered / activeQuiz.questions.length) * 100;

    if (quizResult) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                            Quiz Results
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-center mb-8">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#E2E8F0"
                                            strokeWidth="3"
                                        />
                                        <path
                                            d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#4F46E5"
                                            strokeWidth="3"
                                            strokeDasharray={`${(quizResult.score / quizResult.totalQuestions) * 100}, 100`}
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-indigo-600">
                                        {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Score: {quizResult.score} / {quizResult.totalQuestions}
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Time taken: {Math.floor(quizResult.timeTaken / 60)}m {quizResult.timeTaken % 60}s
                            </p>
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Detailed Results
                                </h3>
                                {quizResult.details && quizResult.details.map((detail, index) => (
    <div key={index} className={`p-4 rounded-lg mb-4 ${
        detail.isCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900'
    }`}>
        <p className="font-medium text-gray-800 dark:text-white mb-2">
            {detail.question}
        </p>
        <p className={`text-sm ${
            detail.isCorrect 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
        }`}>
            Your answer: {detail.selectedOption.text}
        </p>
        {!detail.isCorrect && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Correct answer: {detail.correctOption.text}
            </p>
        )}
    </div>
))}
                            </div>
                            <div className="flex gap-4 mt-8 ">
                                <button
                                    onClick={() => navigate('/quizzes')}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Back to Quizzes
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // Render quiz taking interface
    return (
        <>
        <Helmet>
            <title>Take Quiz | Vitamin Job</title>
            <meta name="description" content="Practice quizzes and test your knowledge. We provide a wide range of quizzes to help you learn." />

        </Helmet>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {/* Quiz Header */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                                {activeQuiz.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                <FaClock className="text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    {formatTime(timeElapsed)}
                                </span>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400 mt-2">
                                <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                                <span>Answered: {totalAnswered} / {activeQuiz.questions.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Warning Message */}
                    {showWarning && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                            <FaExclamationTriangle />
                            <span>Please answer the current question before proceeding.</span>
                        </div>
                    )}

                    {/* Question */}
                    <div className="p-6">
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-6">
                                {currentQuestion.questionText}
                            </h2>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(currentQuestion._id, option, index)}
                                        className={`w-full text-left p-4 rounded-lg border transition ${
                                            userAnswers[currentQuestion._id] === index
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                                    currentQuestionIndex === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                                }`}
                            >
                                <FaArrowLeft /> Previous
                            </button>
                            {isLastQuestion ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={totalAnswered !== activeQuiz.questions.length}
                                    className={`px-6 py-3 rounded-lg ${
                                        totalAnswered === activeQuiz.questions.length
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Submit Quiz
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                                        hasAnsweredCurrent
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}
                                >
                                    Next <FaArrowRight />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default TakeQuiz;