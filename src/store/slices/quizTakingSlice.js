import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const quizTakingSlice = createSlice({
    name: 'quizTaking',
    initialState: {
        activeQuiz: null,
        currentQuestionIndex: 0,
        userAnswers: {},
        loading: false,
        error: null,
        quizResult: null,
        startTime: null
    },
    reducers: {
        startQuizRequest(state) {
            state.loading = true;
            state.error = null;
        },
        startQuizSuccess(state, action) {
            state.loading = false;
            state.activeQuiz = action.payload;
            state.startTime = Date.now();
            state.currentQuestionIndex = 0;
            state.userAnswers = {};
        },
        startQuizFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setAnswer(state, action) {
            const { questionId, answer } = action.payload;
            state.userAnswers[questionId] = answer;
        },
        nextQuestion(state) {
            if (state.currentQuestionIndex < state.activeQuiz.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },
        previousQuestion(state) {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },
        submitQuizRequest(state) {
            state.loading = true;
        },
        submitQuizSuccess(state, action) {
            state.loading = false;
            // Ensure the payload has all required fields with proper typing
            state.quizResult = {
                score: action.payload.score,
                totalQuestions: action.payload.totalQuestions,
                timeTaken: action.payload.timeTaken,
                details: action.payload.details.map(detail => ({
                    questionId: detail.questionId,
                    question: detail.question,
                    selectedOption: {
                        text: detail.selectedOption.text,
                        index: Number(detail.selectedOption.index)
                    },
                    correctOption: {
                        text: detail.correctOption.text,
                        index: Number(detail.correctOption.index)
                    },
                    isCorrect: detail.isCorrect
                }))
            };
        },
        submitQuizFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetQuizTaking(state) {
            return {
                ...state,
                activeQuiz: null,
                currentQuestionIndex: 0,
                userAnswers: {},
                quizResult: null,
                startTime: null
            };
        }
    }
});

// Async actions
export const startQuiz = (quizId) => async (dispatch) => {
    dispatch(quizTakingSlice.actions.startQuizRequest());
    try {
        const response = await axios.get(
            `https://www.backend.vitaminjob.com/api/v1/quiz/${quizId}/start`,
            { withCredentials: true }
        );
        
        
        dispatch(quizTakingSlice.actions.startQuizSuccess(response.data.quiz));
    } catch (error) {
        dispatch(quizTakingSlice.actions.startQuizFailure(
            error.response?.data?.message || "Failed to start quiz"
        ));
    }
};

export const handleSubmitQuiz = (activeQuiz, userAnswers, startTime) => (dispatch) => {
    if (!activeQuiz || !userAnswers) return;
    
    let score = 0;
    const processedAnswers = activeQuiz.questions.map(question => {
        const selectedIndex = userAnswers[question._id];
        // Ensure we're comparing numbers
        const correctOptionIndex = Number(question.correctOption);
        const isCorrect = Number(selectedIndex) === correctOptionIndex;
        
        if (isCorrect) score++;
        
        return {
            questionId: question._id,
            question: question.questionText,
            selectedOption: {
                text: question.options[selectedIndex],
                index: Number(selectedIndex)
            },
            correctOption: {
                text: question.options[correctOptionIndex],
                index: correctOptionIndex
            },
            isCorrect
        };
    });

    dispatch(submitQuizSuccess({
        score,
        totalQuestions: activeQuiz.questions.length,
        timeTaken: Math.floor((Date.now() - startTime) / 1000),
        details: processedAnswers
    }));
};
// Export actions
export const {
    setAnswer,
    nextQuestion,
    previousQuestion,
    resetQuizTaking,
    submitQuizSuccess
} = quizTakingSlice.actions;
// Export reducer
export { quizTakingSlice };

export default quizTakingSlice.reducer;