import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookMarkReducer from "./slice/bookMarkSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    bookmark: bookMarkReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
