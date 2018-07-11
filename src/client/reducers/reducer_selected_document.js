import { SELECT_DOCUMENT } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_DOCUMENT:
      return action.payload;
    default:
      return state;
  }
}
