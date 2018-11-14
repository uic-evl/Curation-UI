/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import {
  FETCH_USERS_BY_GROUP,
  FETCH_USER_BY_ID,
  FETCH_GROUPS_BY_ORG,
  REMOVE_USER_FROM_ROLE_SUCCESS,
  ADD_USER_TO_ROLE_SUCCESS,
  CREATE_GROUP_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
} from 'client/actions/action_types';

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
    case ADD_USER_TO_ROLE_SUCCESS:
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i]._id === action.payload.data.user._id) {
          state.users[i] = action.payload.data.user;
          break;
        }
      }
      return {
        'users': state.users,
        'selectedUser': action.payload.data.user,
        'groups': state.groups,
      };
    case REMOVE_USER_FROM_ROLE_SUCCESS:
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i]._id === action.payload.data.user._id) {
          state.users[i] = action.payload.data.user;
          break;
        }
      }
      return {
        'users': state.users,
        'selectedUser': action.payload.data.user,
        'groups': state.groups,
      };
    case CREATE_GROUP_SUCCESS:
      if (state.groups) {
        state.groups.push(action.payload.data.group);
      } else {
        state.groups = [action.payload.data.group];
      }
      return {
        'users': state.users,
        'selectedUser': state.selectedUser,
        'groups': state.groups,
      };
    case CREATE_USER:
      console.log('create_user');
      return state;
    case CREATE_USER_SUCCESS:
      console.log('create user success');
      return state;
    default:
      return state;
  }
}
