import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';
import { IMedia } from '@/models/interfaces/media/media.interface';

export interface DataStateType {
    media: Array<IMedia>;
    userId: string;
    favorites: Array<IMedia>
}

const initialState: DataStateType = {
    media: [] as Array<IMedia>,
    userId: '',
    favorites: [],
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUserId(state, { payload }: { payload: string }) {
            // eslint-disable-next-line no-param-reassign
            state.userId = payload;
        },
        setMedia(state, { payload }: { payload: Array<IMedia> }) {
            // eslint-disable-next-line no-param-reassign
            state.media = payload;
        },
        setFavoritesMedia(state, { payload }: { payload: Array<IMedia> }) {
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

export const { setMedia, setUserId, setFavoritesMedia, onFavouredMedia } = dataSlice.actions;
export const selectUserId = (state: AppState) => state.data.userId;
export const selectMedia = (state: AppState) => state.data.media || [];
export const selectFavourites = (state: AppState) => state.data.favorites || [];

export default dataSlice.reducer;
