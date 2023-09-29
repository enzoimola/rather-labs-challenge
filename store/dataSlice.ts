import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';
import { IMedia } from '@/models/interfaces/media.interface';
import { IFavMedia } from '@/models/interfaces/favMedia.interface';

export interface DataState {
    media: Array<IMedia>;
    mediaSelected: number;
    favorites: Array<IFavMedia>
}

const initialState: DataState = {
    media: [],
    mediaSelected: null,
    favorites: [],
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setMedia(state, { payload }: { payload: IMedia }) {
            // eslint-disable-next-line no-param-reassign
            state.media = payload;
        },
        setMediaSelected(state, { payload }: { payload: number }) {
            // eslint-disable-next-line no-param-reassign
            state.mediaSelected = payload;
        },
        setFavoritesMedia(state, { payload }: { payload: IMedia }) {
            // eslint-disable-next-line no-param-reassign
            state.favorites = payload;
        },
        onFavouredMedia(state, { payload }: { payload: IMedia }) {
            const foundIndex = state.favorites.findIndex(f => f.id === payload.id);
            if (foundIndex === -1) {
                // eslint-disable-next-line no-param-reassign
                state.favorites = [...state.favorites, payload];
            } else {
                // eslint-disable-next-line no-param-reassign
                state.favorites = state.favorites.filter((e, i) => i !== foundIndex);
            }
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state,
            ...action.payload.data,
        }),
    },
});

export const { setMedia, setMediaSelected, setFavoritesMedia, onFavouredMedia } = dataSlice.actions;
export const selectMedia = (state: AppState) => state.data.media;
export const selectFavourites = (state: AppState) => state.data.favorites;

export default dataSlice.reducer;
