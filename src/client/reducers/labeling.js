/* eslint-disable no-debugger */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
import { FETCH_DOCUMENT } from 'client/actions/action_types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_DOCUMENT:
      const { document, figures } = action.payload.data;
      let selectedFigure = null;
      let selectedSubfigure = null;
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
    default:
      return state;
  }
}
