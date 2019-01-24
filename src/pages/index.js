import React from 'react';
import { StackNavigator } from 'react-navigation';
import Landing from './Landing/Landing';
import Signup from './Signup/SignupForm';
import ConfirmationWaiting from './ConfirmationWaiting/ConfirmationWaiting';
import Login from './Login/LoginForm';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Dashboard/Dashboard';
import ComingSoon from './ComingSoon/ComingSoon';
import WorkshopList from './WorkshopList/WorkshopList';
import Schedule from './Schedule/Schedule';
import Workshop from './Workshop/Workshop';
import store from 'redux'


const AppStackNavigator = StackNavigator({
  loginFlow: {
    screen: StackNavigator({
      landing: { screen: Landing },
      signup: { screen: Signup },
      confirmationWaiting: { screen: ConfirmationWaiting },
      login: { screen: Login },
      forgotPassword: { screen: ForgotPassword }
    }, {
      initialRouteName: 'landing',
      headerMode: 'none'
    })
  },
  mainFlow: {
    screen: StackNavigator({
      dashboard: { screen: Dashboard },
      comingSoon: { screen: ComingSoon },
      schedule: { screen: Schedule },
      workshopList: { screen: WorkshopList },
      workshop: { screen: Workshop },
    }, {
      initialRouteName: 'dashboard',
      headerMode: 'none',
    })
  },
}, {
  initialRouteName: 'loginFlow',
  headerMode: 'none',
});

export default AppStackNavigator;
