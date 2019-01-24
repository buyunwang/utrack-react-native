import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_LOADING, FORGOT_PASSWORD_SUCCEEDED } from '../_actions/types';


export function forgotPasswordFailed(state = false, action) {
  switch (action.type) {
      case FORGOT_PASSWORD_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function forgotPasswordLoading(state = false, action) {
  switch (action.type) {
      case FORGOT_PASSWORD_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function forgotPasswordSucceeded(state = false, action) {
  switch (action.type) {
      case FORGOT_PASSWORD_SUCCEEDED:
      return action.succeeded;

    default:
      return state;
  }
}
