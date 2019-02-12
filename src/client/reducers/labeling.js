/* eslint-disable no-debugger */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
import {
  FETCH_DOCUMENT,
  SELECT_FIGURE_X,
  SELECT_SUBFIGURE_X,
} from 'client/actions/action_types';

export default function (state = null, action) {
  let selectedFigure = null;
  let selectedSubfigure = null;

  switch (action.type) {
    case FETCH_DOCUMENT:
      const { document, figures } = action.payload.data;
      if (figures.length > 0) {
        selectedFigure = figures[0];
        if (selectedFigure.subfigures.length > 0) {
          selectedSubfigure = selectedFigure.subfigures[0];
        }
      }
      return {
        'document': document,
        'figures': figures,
        'selectedFigure': selectedFigure,
        'selectedSubfigure': selectedSubfigure,
      };
    case SELECT_FIGURE_X:
      selectedFigure = action.payload;
      if (selectedFigure.subfigures.length > 0) {
        selectedSubfigure = selectedFigure.subfigures[0];
      }
      return {
        'document': state.document,
        'figures': state.figures,
        'selectedFigure': selectedFigure,
        'selectedSubfigure': selectedSubfigure,
      };
    case SELECT_SUBFIGURE_X:
      selectedSubfigure = action.payload;
      return {
        'document': state.document,
        'figures': state.figures,
        'selectedFigure': state.selectedFigure,
        'selectedSubfigure': selectedSubfigure,
      };
    default:
      return state;
  }
}
