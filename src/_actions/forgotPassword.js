import { FORGOT_PASSWORD_SUCCEEDED, FORGOT_PASSWORD_LOADING, FORGOT_PASSWORD_FAILED } from './types';
import { updateAlert } from './errors'


export function forgotPasswordFailed(bool) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    hasErrored: bool
  };
}

export function forgotPasswordLoading(bool) {
  return {
    type: FORGOT_PASSWORD_LOADING,
    isLoading: bool
  };
}

export function forgotPasswordSucceeded(bool) {
  return {
    type: FORGOT_PASSWORD_SUCCEEDED,
    succeeded: bool
  };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(forgotPasswordLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(forgotPasswordFailed(true));
        }, 5000);
    };
}

export function forgotPassword(email, navigation) {
    return (dispatch) => {
        dispatch(forgotPasswordLoading(true));
        fetch('https://api.utrackapp.com/password/forgot', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                }),
            }).then((response) => response.json())
            .then((json) => {
                if (json.status != 200) {
                    console.log(json);
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
                dispatch(forgotPasswordLoading(false));
                navigation.navigate('confirmationWaiting');
                return json;
            })
            .then((json) => dispatch(forgotPasswordSucceeded(json)))
            .catch(() => {
                dispatch(forgotPasswordLoading(false));
                dispatch(forgotPasswordFailed(true));
            });
    };
}