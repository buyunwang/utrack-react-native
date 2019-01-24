import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import persistedReducer from "../_reducers";

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);