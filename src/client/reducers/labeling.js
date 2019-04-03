/* eslint-disable no-debugger */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import {
  FETCH_DOCUMENT,
  SELECT_FIGURE_X,
  SELECT_SUBFIGURE_X,
  UPDATE_SUBFIGURE_SUCCESS,
  UPDATE_ALL_SUBFIGURES_SUCCESS,
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
    case UPDATE_SUBFIGURE_SUCCESS:
      selectedSubfigure = action.payload.data.savedSubfigure;
      selectedFigure = state.selectedFigure;
      if (action.payload.data.figure) {
        selectedFigure = action.payload.data.figure;
        selectedFigure.subfigures = state.selectedFigure.subfigures;
      }

      const savedFigures = state.figures;
      for (const i in selectedFigure.subfigures) {
        if (selectedFigure.subfigures[i]._id === selectedSubfigure._id) {
          selectedFigure.subfigures[i] = selectedSubfigure;
          break;
        }
      }
      for (const i in savedFigures) {
        if (savedFigures[i]._id === selectedFigure._id) {
          savedFigures[i] = selectedFigure;
          break;
        }
      }
      return {
        'document': state.document,
        'figures': savedFigures,
        'selectedFigure': selectedFigure,
        'selectedSubfigure': selectedSubfigure,
      };

    case UPDATE_ALL_SUBFIGURES_SUCCESS:
      debugger;
      selectedFigure = action.payload.data.figure;
      selectedFigure.subfigures = action.payload.data.subfigures;

      const savedFigures2 = state.figures;
      for (const i in savedFigures2) {
        if (savedFigures2[i]._id === selectedFigure._id) {
          savedFigures2[i] = selectedFigure;
          break;
        }
      }

      return {
        'document': state.document,
        'figures': savedFigures2,
        'selectedFigure': selectedFigure,
        'selectedSubfigure': state.selectedFigure.subfigures[0],
      };

    default:
      return state;
  }
}
