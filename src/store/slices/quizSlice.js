import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const quizSlice = createSlice({
    name : 'quiz',
    initialState : {
        quizzes : [],
        loading : false,
        error : null,
        message : null,
        singleQuiz: {},
        currentPage : 1,
        totalPages : 1,
        totalQuizzes : 0
    },
    reducers : {
        getAllQuizzesRequest(state){
            state.loading = true;
            state.error = null;
            state.message  = null;
        },
        getAllQuizzesSuccess(state, action){
            state.loading = false;
            state.quizzes = action.payload.quizzes;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalQuizzes = action.payload.totalQuizzes;
            state.error = null;
            state.message = action.payload.message;
        },
        getAllQuizzesFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
            state.quizzes = []
        },
        requestForSingleQuiz(state){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        successForSingleQuiz(state, action){
            state.loading = false;
            state.error = null;
            state.singleQuiz = action.payload;
        },
        failureForSingleQuiz(state, action){
            state.singleQuiz = {};
            state.error = action.payload;
            state.loading = false;
        },
        resetQuizSlice(state){
            state.error = null;
            state.quizzes = [];
            state.loading = false;
            state.singleQuiz = {};
            state.message =null;
        },
        clearErrors(state){
            state.error = null;
            state.message = null;
        }
    }
})

export const fetchQuizzes = (niche, searchKeyword = "", page  =1) => async(dispatch)=> {
    dispatch(quizSlice.actions.getAllQuizzesRequest());
    try{
        let url = `https://www.backend.vitaminjob.com/api/v1/quiz/quizzes/all?page=${page}`; // matches router path;
        if(searchKeyword){
            url += `&keyword=${searchKeyword}`;
        }
        if(niche && niche !== "All"){
            url += `&niche=${niche}`;
        }
        const response = await axios.get(url, {
            withCredentials : true,
            headers: {"Content-Type" : "application/json" }
        });
        if(!response.data.success){
            throw new Error(response.data.message || 'Failed to fetch quizzes');
        }

        dispatch(quizSlice.actions.getAllQuizzesSuccess(response.data));
    } catch (error){
        console.error('Error fetching quizzes:', error);
        const errorMessage = error.response?.data?.message ||
                            error.message ||
                            "Failed to fetch quizzes";
        dispatch(quizSlice.actions.getAllQuizzesFailed(errorMessage))
    }
};

export const fetchSingleQuiz = (quizId) => async(dispatch) => {
    dispatch(quizSlice.actions.requestForSingleQuiz());

    try{
        const response = await axios.get(
            `https://www.backend.vitaminjob.com/api/v1/quiz/get/${quizId}`,
            {withCredentials : true}
        );
        dispatch(quizSlice.actions.successForSingleQuiz(response.data.quiz));
        dispatch(quizSlice.actions.clearErrors());

    } catch (error){
        dispatch(quizSlice.actions.failureForSingleQuiz(error.response.data.message));
    }
} 

export const clearQuizErrors = () => (dispatch) => {
    dispatch(quizSlice.actions.clearErrors());
}

export const resetQuizSlice = () => (dispatch) => {
    dispatch(quizSlice.actions.resetQuizSlice());
}

export default quizSlice.reducer;