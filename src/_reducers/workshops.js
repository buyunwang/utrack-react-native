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
} from "../_actions/types";

export function workshops(state = null, action) {
  switch (action.type) {
    case WORKSHOPS_SUCCEEDED:
      return action.response.data;

    case UPDATE_WORKSHOPS:
      return action.workshops;
    
    default:
      return state;
  }
}

export function fetchWorkshopsFailed(state = false, action) {
  switch (action.type) {
    case WORKSHOPS_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function fetchWorkshopsLoading(state = false, action) {
  switch (action.type) {
    case WORKSHOPS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function workshop(state = null, action) {
  switch (action.type) {
    case WORKSHOP_DETAIL_SUCCEEDED:
      return action.response.data;

    case UPDATE_WORKSHOP:
      return action.workshop;

    default:
      return state;
  }
}

export function fetchWorkshopDetailFailed(state = false, action) {
  switch (action.type) {
    case WORKSHOP_DETAIL_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function fetchWorkshopDetailLoading(state = false, action) {
  switch (action.type) {
    case WORKSHOP_DETAIL_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function registerWorkshopsFailed(state = false, action) {
  switch (action.type) {
    case REGISTER_WORKSHOPS_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function cancelWorkshopsFailed(state = false, action) {
  switch (action.type) {
    case CANCEL_WORKSHOPS_FAILED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function rsvpLoading(state = false, action) {
  switch (action.type) {
    case REGISTER_WORKSHOPS_LOADING:
      return action.isLoading;

    case CANCEL_WORKSHOPS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}