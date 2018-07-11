/* eslint-disable no-debugger */
import { FETCH_IMAGE_TO_TRAIN } from 'actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_IMAGE_TO_TRAIN:
      return action.payload;
    default:
      return state;
  }
}
