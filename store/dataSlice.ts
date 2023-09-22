import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';
import { IMedia } from '@/models/interfaces/media.interface';

export interface DataState {
  media: Array<IMedia>
}

const initialState: DataState = {
  media: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMedia(state, { payload }: { payload: IMedia }) {
      // eslint-disable-next-line no-param-reassign
      state.media = payload;
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

export const { setMedia } = dataSlice.actions;

export const selectMedia = (state: AppState) => state.data.media;

export default dataSlice.reducer;
