/* eslint-disable no-debugger */
import { FETCH_USERS_BY_GROUP, FETCH_USER_BY_ID, FETCH_GROUPS_BY_ORG } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USERS_BY_GROUP:
      return {
        'users': action.payload.data,
        'selectedUser': null,
        'groups': null,
      };
    case FETCH_USER_BY_ID:
      return {
        'users': state.users,
        'selectedUser': action.payload.data,
        'groups': state.groups,
      };
    case FETCH_GROUPS_BY_ORG:
      return {
        'users': state.users,
        'selectedUser': state.selectedUser,
        'groups': action.payload.data,
      };
    default:
      return state;
  }
}
