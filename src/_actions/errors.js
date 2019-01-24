import {
   UPDATE_ALERT,
   LOGOUT_UNAUTH
} from './types';

export function updateAlert(message) {
  return {
    type: UPDATE_ALERT,
    message
  };
}

export function logoutUnauth() {
  return {
    type: LOGOUT_UNAUTH,
    authToken: ''
  };
}
