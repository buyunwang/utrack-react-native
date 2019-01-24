import { 
    WORKSHOPS_FAILED, 
    WORKSHOPS_LOADING, 
    WORKSHOPS_SUCCEEDED,
    WORKSHOP_DETAIL_FAILED,
    WORKSHOP_DETAIL_LOADING,
    WORKSHOP_DETAIL_SUCCEEDED,
    REGISTER_WORKSHOPS_FAILED,
    REGISTER_WORKSHOPS_LOADING,
    CANCEL_WORKSHOPS_FAILED,
    CANCEL_WORKSHOPS_LOADING,
    UPDATE_WORKSHOP,
    UPDATE_WORKSHOPS,
} from './types';
import { updateAlert, logoutUnauth } from './errors';
import { fetchSchedule } from './schedule';

export function fetchWorkshopsFailed(bool) {
    return {
        type: WORKSHOPS_FAILED,
        hasErrored: bool
    };
}

export function fetchWorkshopsLoading(bool) {
    return {
        type: WORKSHOPS_LOADING,
        isLoading: bool
    };
}

export function fetchWorkshopsSucceeded(response) {
    return {
        type: WORKSHOPS_SUCCEEDED,
        response,
    };
}

export function fetchWorkshopDetailFailed(bool) {
    return {
        type: WORKSHOP_DETAIL_FAILED,
        hasErrored: bool
    };
}

export function fetchWorkshopDetailLoading(bool) {
    return {
        type: WORKSHOP_DETAIL_LOADING,
        isLoading: bool
    };
}

export function fetchWorkshopDetailSucceeded(response) {
    return {
        type: WORKSHOP_DETAIL_SUCCEEDED,
        response,
    };
}

export function registerWorkshopsFailed(bool) {
    return {
        type: REGISTER_WORKSHOPS_FAILED,
        hasErrored: bool
    };
}

export function registerWorkshopsLoading(bool) {
    return {
        type: REGISTER_WORKSHOPS_LOADING,
        isLoading: bool
    };
}

export function cancelWorkshopsFailed(bool) {
    return {
        type: CANCEL_WORKSHOPS_FAILED,
        hasErrored: bool
    };
}

export function cancelWorkshopsLoading(bool) {
    return {
        type: CANCEL_WORKSHOPS_LOADING,
        isLoading: bool
    };
}

export function updateWorkshop(workshop) {
    return {
        type: UPDATE_WORKSHOP,
        workshop
    }
}

export function updateWorkshops(workshops) {
    return {
        type: UPDATE_WORKSHOPS,
        workshops
    }
}

export function registerSingleWorkshopSucceeded(id){
    return {
        type: REGISTER_SINGLE_WORKSHOP_SUCCEEDED,
        workshopId: id
    };
}

export function cancelSingleWorkshopSucceeded(id) {
    return {
        type: CANCEL_SINGLE_WORKSHOP_SUCCEEDED,
        workshopId: id
    };
}

export function fetchErrorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(fetchWorkshopsLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(fetchWorkshopsFailed(true));
        }, 5000);
    };
}

export function fetchDetailErrorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(fetchWorkshopDetailLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(fetchWorkshopDetailFailed(true));
        }, 5000);
    };
}

export function registerErrorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(registerWorkshopsLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(registerWorkshopsFailed(true));
        }, 5000);
    };
}

export function cancelErrorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(cancelWorkshopsLoading(false));
            dispatch(updateAlert('Network failed'));
            dispatch(cancelWorkshopsFailed(true));
        }, 5000);
    };
}

export function fetchWorkshops(authToken, date) {
    return (dispatch) => {
        dispatch(fetchWorkshopsLoading(true));
        fetch('https://api.utrackapp.com/workshops', {
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
                    dispatch(fetchWorkshopsLoading(false));
                    return json;
                } else if (json.status == 401) {
                    dispatch(logoutUnauth());
                } else {
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
            })
            .then((json) => dispatch(fetchWorkshopsSucceeded(json)))
            .catch(() => {
                dispatch(fetchWorkshopsLoading(false));
                dispatch(fetchWorkshopsFailed(true));
            });
    };
}

export function fetchWorkshopDetail(authToken, id, navigation) {
    return (dispatch) => {
        dispatch(fetchWorkshopDetailLoading(true));
        fetch('https://api.utrackapp.com/workshops/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authToken
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.status == 200) {
                    dispatch(fetchWorkshopDetailLoading(false));
                    return json;
                } else if (json.status == 401) {
                    dispatch(logoutUnauth());
                } else {
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
            })
            .then((json) => {
                dispatch(fetchWorkshopDetailSucceeded(json))
                navigation.navigate('workshop');
            })
            .catch(() => {
                dispatch(fetchWorkshopDetailLoading(false));
                dispatch(fetchWorkshopDetailFailed(true));
            });
    };
}

export function registerWorkshops(authToken, id, pushNotification) {
    return (dispatch) => {
        dispatch(registerWorkshopsLoading(true));
        fetch('https://api.utrackapp.com/workshops/'+id+'/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authToken
            }
        }).then((response) => response.json())
            .then((json) => {
                if (json.status == 201) {
                    dispatch(fetchSchedule(authToken, json.workshop.date));
                    dispatch(registerWorkshopsLoading(false));
                    return json;
                } else if (json.status == 401) {
                    dispatch(logoutUnauth());
                } else {
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
            })
            .then((json) => {
                dispatch(updateWorkshop(json.workshop));
                dispatch(updateWorkshops(json.workshops));

                const yyyymmdd = json.workshop.date.split("-")
                const hhmm = json.workshop.start_time.split(":")

                const date = new Date(parseInt(yyyymmdd[0]), parseInt(yyyymmdd[1])-1, parseInt(yyyymmdd[2]), parseInt(hhmm[0]), parseInt(hhmm[1]));

                pushNotification.localNotificationSchedule({
                    foreground: true,
                    message: 'You have a workshop starting in 15 mins.',
                    date: new Date(date - 15 * 60000),
                    userInfo: {
                        id: '' + json.workshop.id,
                    },
                });
            })
            .catch(() => {
                dispatch(registerWorkshopsLoading(false));
                dispatch(registerWorkshopsFailed(true));
            });
    };
}

export function cancelWorkshops(authToken, id, pushNotification) {
    return (dispatch) => {
        dispatch(cancelWorkshopsLoading(true));
        fetch('https://api.utrackapp.com/workshops/'+id+'/cancel_registration', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authToken
            }
        }).then((response) => response.json())
            .then((json) => {
                if (json.status == 200) {
                    dispatch(fetchSchedule(authToken, json.workshop.date));
                    dispatch(cancelWorkshopsLoading(false));
                    return json;
                } else if (json.status == 401) {
                    dispatch(logoutUnauth());
                } else {
                    dispatch(updateAlert(json.errors.join('\n')));
                    throw Error(json.status);
                }
            })
            .then((json) => {
                dispatch(updateWorkshop(json.workshop));
                dispatch(updateWorkshops(json.workshops));

                pushNotification.cancelLocalNotifications({
                    id: ''+json.workshop.id,
                });
            })
            .catch(() => {
                dispatch(cancelWorkshopsLoading(false));
                dispatch(cancelWorkshopsFailed(true));
            });
    };
}