import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/slices/userSlice";
import updateProfileReducer from "@/store/slices/updateProfileSlice";
import bookmarkReducer from "@/store/slices/bookmarkSlice.js";
import starredRoadmapReducer from "@/store/slices/starredRoadmapSlice.js";
//import postReducer from "./slices/postSlice.js"
import quizTakingReducer from "@/store/slices/quizTakingSlice";
import roadMapReducer from "@/store/slices/roadmapSlice";
import courseReducer from "@/store/slices/courseSlice.js";
import quizReducer from "@/store/slices/quizSlice.js";


export const store = configureStore({
  reducer: {
    user: userReducer,
    updateProfile: updateProfileReducer,
    bookmarks: bookmarkReducer,
    roadmaps: starredRoadmapReducer,
    quizTaking: quizTakingReducer,
    roadmap: roadMapReducer,
    courses : courseReducer,
    quiz : quizReducer
  },
});

export default store;