import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    animeTitle: "",
    episodesList: [],
};

const animeDetailSlice = createSlice({
    name: "animeDetail",
    initialState,
    reducers: {
        SET_DETAIL(state, action) {
            console.log(action.payload);

            const { animeTitle, episodesList } = action.payload;
            state.animeTitle = animeTitle;
            state.episodesList = episodesList;
        },
    },
});

export const selectAnimeTitle = (state: { animeDetail: { animeTitle: string } }) => state.animeDetail.animeTitle;
export const selectEpisodesList = (state: { animeDetail: { episodesList: any } }) => state.animeDetail.episodesList;
export const { SET_DETAIL } = animeDetailSlice.actions;

export default animeDetailSlice.reducer;
