import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import repositoriesReducer from './slices/repositoriesSlice';
import filtersReducer from './slices/filtersSlice';
import repositoryDetailsReducer from './slices/repositoryDetailsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['repositories'],
};

const rootReducer = combineReducers({
  repositories: repositoriesReducer,
  filters: filtersReducer,
  repositoryDetails: repositoryDetailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

