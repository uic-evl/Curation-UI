import { FETCH_DOCUMENT_FIGURES } from 'actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_DOCUMENT_FIGURES:
      return action.payload;
  }

  return state;
}