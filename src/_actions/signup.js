import { SIGNUP_FAILED, SIGNUP_LOADING, SIGNUP_SUCCEEDED } from './types';
import { updateAlert } from './errors'


export function signupFailed(bool) {
  return {
    type: SIGNUP_FAILED,
    hasErrored: bool
  };
}

export function signupLoading(bool) {
  return {
    type: SIGNUP_LOADING,
    isLoading: bool
  };
}

export function signupSucceeded(response) {
  return {
    type: SIGNUP_SUCCEEDED,
    response
  };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(signupLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(signupFailed(true));
        }, 5000);
    };
}

export function signup(values, navigation) {
    return (dispatch) => {
        dispatch(signupLoading(true));
        fetch('https://api.utrackapp.com/users/', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        first_name: values.firstname,
                        last_name: values.lastname,
                        email: values.email,
                        password: values.password,
                    }
                }),
            }).then((response) => response.json())
            .then((json) => {
                if (json.status != 201) {
                    console.log(json);
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
                dispatch(signupLoading(false));
                navigation.navigate('confirmationWaiting');
                return json;
            })
            .then((json) => dispatch(signupSucceeded(json)))
            .catch(() => {
                dispatch(signupLoading(false));
                dispatch(signupFailed(true));
            });
    };
}