import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './services/user';
import googleUser from './services/googleUser';
import analyticsMiddleware from './middlewear/analyticsMiddleware';

const reducers = combineReducers({
  googleUser,
  user,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(analyticsMiddleware),
});

export {store};
