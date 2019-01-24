import { SIGNUP_FAILED, SIGNUP_LOADING, SIGNUP_SUCCEEDED } from '../_actions/types';


export function signupFailed(state = false, action) {
  switch (action.type) {
      case SIGNUP_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function signupLoading(state = false, action) {
  switch (action.type) {
      case SIGNUP_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function signupResponse(state = null, action) {
  switch (action.type) {
      case SIGNUP_SUCCEEDED:
      return action.response;

    default:
      return state;
  }
}
