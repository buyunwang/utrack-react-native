import { combineReducers } from 'redux';
import { signupFailed, signupLoading, signupResponse } from './signup';
import { loginFailed, loginLoading, loginResponse, authToken } from "./login";
import { forgotPasswordFailed, forgotPasswordLoading, forgotPasswordSucceeded } from './forgotPassword';
import { scheduleFailed, scheduleLoading, schedule } from './schedule';
import {
  workshops,
  fetchWorkshopsFailed,
  fetchWorkshopsLoading,
  workshop,
  fetchWorkshopDetailFailed,
  fetchWorkshopDetailLoading,
  rsvpLoading,
  registerWorkshopsFailed,
} from './workshops';
import { alertMessage } from './errors';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    form: formReducer,
    signupFailed,
    signupLoading,
    signupResponse,
    forgotPasswordFailed,
    forgotPasswordLoading,
    forgotPasswordSucceeded,
    loginFailed, 
    loginLoading, 
    loginResponse,
    authToken,
    workshops,
    fetchWorkshopsFailed,
    fetchWorkshopsLoading,
    workshop,
    fetchWorkshopDetailFailed,
    fetchWorkshopDetailLoading,
    rsvpLoading,
    registerWorkshopsFailed,
    scheduleFailed,
    scheduleLoading,
    schedule,
    alertMessage
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authToken']
};

export default persistedReducer = persistReducer(persistConfig, rootReducer);
