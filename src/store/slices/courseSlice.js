import {createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const courseSlice = createSlice({
    name: 'course',
    initialState : {
        courses : [],
        loading: false,
        error: null,
        message : null,
        currentPage : 1,
        totalPages : 1,
        totalCourses: 0
    },
    reducers : {

        //Get All Courses

        getAllCoursesRequest(state){
            state.loading =true;
            state.error = null;
            state.message = null;
        },
        getAllCoursesSuccess(state, action){
            state.loading = false;
            state.courses = action.payload.courses;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalCourses = action.payload.totalCourses;
            state.error = null;
            state.message = action.payload.message;
        },
        getAllCoursesFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
            state.courses = [];
        },

        // Clear All Errors 

        clearErrors(state){
            state.error = null;
            state.message = null;
        }
    }
});

export const fetchCourses = (niche, searchKeyword = "", page = 1) => async(dispatch) => {
    dispatch(courseSlice.actions.getAllCoursesRequest());
    try{
        let url = `https://www.backend.vitaminjob.com/api/v1/course/course/all?page=${page}`;

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
            throw new Error(response.data.message || 'Failed to fetch courses');
        }

        dispatch(courseSlice.actions.getAllCoursesSuccess(response.data));
    } catch (error) {
        console.error('Error fetching courses:', error);
        const errorMessage = error.response?.data?.message ||
                             error.message ||
                             "Failed to fetch courses";
        dispatch(courseSlice.actions.getAllCoursesFailed(errorMessage));
    }
};

export const clearCourseErrors = () => (dispatch) => {
    dispatch(courseSlice.actions.clearErrors());
}

export default courseSlice.reducer;