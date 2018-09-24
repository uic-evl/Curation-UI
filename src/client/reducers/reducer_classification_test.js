/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
import { FETCH_HUMAN_ERR_AVAILABLE_USERS, FETCH_TESTS } from 'client/actions/action_types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_HUMAN_ERR_AVAILABLE_USERS:
      const group = action.payload.data;
      const users = [];
      group.users.forEach((username) => {
        users.push({
          label: username,
          value: username,
        });
      });
      return {
        users,
        tests: state.tests,
      };
    case FETCH_TESTS:
      return {
        users: state.users,
        tests: action.payload.data,
      };
    default:
      return state;
  }
}
