import { AUTH_USER, AUTH_ERROR } from 'client/actions/action_types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        username: action.payload.username,
        roles: action.payload.roles,
        access: action.payload.access,
        organization: action.payload.organization,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
