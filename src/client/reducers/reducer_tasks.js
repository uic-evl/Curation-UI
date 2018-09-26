import { FETCH_TASKS } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload.data;
    default:
      return state;
  }
}
