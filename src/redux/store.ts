import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookMarkReducer from "./slice/bookMarkSlice";
import animeDetailReducer from "./slice/animeDetailSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    bookmark: bookMarkReducer,
    animeDetail: animeDetailReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
