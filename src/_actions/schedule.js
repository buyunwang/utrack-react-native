import { SCHEDULE_FAILED, SCHEDULE_LOADING, SCHEDULE_SUCCEEDED, SET_WORKSHOP_STYLE } from './types';
import { updateAlert, logoutUnauth } from './errors'


export function scheduleFailed(bool) {
  return {
    type: SCHEDULE_FAILED,
    hasErrored: bool
  };
}

export function scheduleLoading(bool) {
  return {
    type: SCHEDULE_LOADING,
    isLoading: bool
  };
}

export function scheduleSucceeded(response) {
  return {
    type: SCHEDULE_SUCCEEDED,
    response
  };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(scheduleLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(scheduleFailed(true));
        }, 5000);
    };
}

export function fetchSchedule(authToken, date) {
    return (dispatch) => {
        dispatch(scheduleLoading(true));
        fetch('https://api.utrackapp.com/schedule', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body: JSON.stringify({
                    date
                }),
            }).then((response) => response.json())
            .then((json) => {
                if (json.status == 200) {
                    dispatch(scheduleLoading(false));
                    return json;
                } else if (json.status == 401) {
                    dispatch(logoutUnauth());
                } else {
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
            })
            .then((json) => dispatch(scheduleSucceeded(json)))
            .catch(() => {
                dispatch(scheduleLoading(false));
                dispatch(scheduleFailed(true));
            });
    };
}