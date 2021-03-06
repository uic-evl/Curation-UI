/* eslint-disable no-debugger */
import { SELECT_FIGURE, SELECT_SUBFIGURE } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_FIGURE:
      return action.payload;
    case SELECT_SUBFIGURE:
      return {
        figure: state.figure,
        subfigures: state.subfigures,
        selectedSubfigure: action.payload,
      };
    default:
      return state;
  }
}
