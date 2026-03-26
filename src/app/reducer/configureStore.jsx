/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import coffeeReducer from './coffee.reducer';
import authReducer from './authAction.reducer.jsx';
import historyReducer from './history.reducer.jsx';

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const rootReducer = combineReducers({
    coffee: coffeeReducer,
    auth: authReducer,
    history: historyReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
    devTools: true
});

export const persistor = persistStore(store);
