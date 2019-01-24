import { SCHEDULE_FAILED, SCHEDULE_LOADING, SCHEDULE_SUCCEEDED, REGISTER_WORKSHOPS_SUCCEEDED, CANCEL_WORKSHOPS_SUCCEEDED } from '../_actions/types';


export function scheduleFailed(state = false, action) {
    switch (action.type) {
        case SCHEDULE_FAILED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function scheduleLoading(state = false, action) {
    switch (action.type) {
        case SCHEDULE_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function schedule(state = null, action) {
    switch (action.type) {
        case SCHEDULE_SUCCEEDED:
            return action.response.data;

        default:
            return state;
    }
}