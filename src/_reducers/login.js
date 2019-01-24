import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_SUCCEEDED, LOGOUT_UNAUTH } from '../_actions/types';

export function loginFailed(state = false, action) {
    switch (action.type) {
        case LOGIN_FAILED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function loginLoading(state = false, action) {
    switch (action.type) {
        case LOGIN_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function loginResponse(state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCEEDED:
            return action.response;

        default:
            return state;
    }
}

export function authToken(state = '', action) {
    switch(action.type) {
        case LOGIN_SUCCEEDED:
            return action.authToken;
        
        case LOGOUT_UNAUTH:
            return action.authToken;

        default:
            return state;
    }
}
