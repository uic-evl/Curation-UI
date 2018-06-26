import { FETCH_ELEMENT } from 'actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_ELEMENT:
      return action.payload;
    default:
      return state;
  }
}
