import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { SpotifyAPI } from './services/Spotify';

export const store = configureStore({
  reducer: {
    [SpotifyAPI.reducerPath]: SpotifyAPI.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SpotifyAPI.middleware),
});
