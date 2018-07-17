/* eslint-disable no-debugger */
import { FETCH_MODALITIES } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_MODALITIES:
      return action.payload.data;
    default:
      return state;
  }
}
