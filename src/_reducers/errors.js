import {UPDATE_ALERT} from '../_actions/types';

export function alertMessage(state = '', action) {
    switch (action.type) {
        case UPDATE_ALERT:
                return action.message
        default:
            return state
    }
}