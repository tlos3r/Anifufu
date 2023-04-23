import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    bookMarkItems: localStorage.getItem("bookMarkItems") ? JSON.parse(localStorage.getItem("bookMarkItems")!) : [],
};

const bookMarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        ADD_BOOKMARK(state, action) {
            const animeIndex: number = state.bookMarkItems.findIndex(
                (item: any) => item.animeId === action.payload.animeId
            );
            if (animeIndex >= 0) {
                toast.info(`${action.payload.details.animeTitle} has been bookmarked`);
            } else {
                const tempBookMark = { ...action.payload };
                state.bookMarkItems.push(tempBookMark);
                toast.success(`${action.payload.details.animeTitle} is bookmark success`);
            }
            localStorage.setItem("bookMarkItems", JSON.stringify(state.bookMarkItems));
        },
        REMOVE_BOOKMARK(state, action) {
            console.log(action.payload);
            const newAnimeListBookMark = state.bookMarkItems.filter((item: any) => item.animeId !== action.payload);
            state.bookMarkItems = newAnimeListBookMark;
            toast.success("Remove anime from bookmark success");
            localStorage.setItem("bookMarkItems", JSON.stringify(state.bookMarkItems));
        },
    },
});

export const selectBookMarkItems = (state: { bookmark: { bookMarkItems: any } }) => state.bookmark.bookMarkItems;
export const { ADD_BOOKMARK, REMOVE_BOOKMARK } = bookMarkSlice.actions;

export default bookMarkSlice.reducer;
