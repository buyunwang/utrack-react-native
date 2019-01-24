import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import AppStackNavigator from './pages/';
import { store, persistor } from './_store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor} >
                    <AppStackNavigator />
                </PersistGate>
            </Provider>
        );
    }
}
