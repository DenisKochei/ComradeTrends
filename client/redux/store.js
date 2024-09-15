import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import ThemeReducer from './theme/themeSlice'


const rootReducer = combineReducers({
  user : userReducer,
  theme : ThemeReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version : 1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
  //this prevents errors
})

export const persistor = persistStore(store)