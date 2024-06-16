import { configureStore } from '@reduxjs/toolkit';
import mainApi from './mainApi';
import authReducer from './authSlice';
import basketSlice from './basketSlice';
import favoriteSlice from './favoriteSlice';

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        [authReducer.reducerPath]: authReducer.reducer,
        [basketSlice.reducerPath]: basketSlice.reducer,
        [favoriteSlice.reducerPath]: favoriteSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch