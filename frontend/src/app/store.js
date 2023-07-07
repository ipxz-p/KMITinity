import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist'
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['api'],
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

