/* eslint-disable no-debugger */

import { FETCH_NEXT_TEST_IMAGE } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_NEXT_TEST_IMAGE:
      return {
        image: action.payload.data.image,
        previous: action.payload.data.previous,
        status: action.payload.data.status,
      };
    default:
      return state;
  }
}
