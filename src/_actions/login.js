import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_SUCCEEDED } from './types';
import { updateAlert } from './errors'


export function loginFailed(bool) {
    return {
        type: LOGIN_FAILED,
        hasErrored: bool
    };
}

export function loginLoading(bool) {
    return {
        type: LOGIN_LOADING,
        isLoading: bool
    };
}

export function loginSucceeded(response) {
    return {
        type: LOGIN_SUCCEEDED,
        response,
        authToken: response.auth_token
    };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(loginLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(loginFailed(true));
        }, 5000);
    };
}

export function login(values, navigation) {
    return (dispatch) => {
        dispatch(loginLoading(true));
        fetch('https://api.utrackapp.com/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        }).then((response) => response.json())
            .then((json) => {
                if (json.status != 200) {
                    console.log(json);
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
                dispatch(loginLoading(false));
                navigation.navigate('dashboard');
                return json;
            })
            .then((json) => dispatch(loginSucceeded(json)))
            .catch(() => {
                dispatch(loginLoading(false));
                dispatch(loginFailed(true));
            });
    };
}