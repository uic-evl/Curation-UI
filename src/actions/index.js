/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import {
  FETCH_ELEMENT,
  SELECT_DOCUMENT,
  SELECT_FIGURE,
  SELECT_SUBFIGURE,
} from 'actions/action_types';
import TEST_FIGURES from 'data/test_figures';
import TEST_SUBFIGURES from 'data/test_subfigures';

export function fetchElement(id) {
  return {
    type: FETCH_ELEMENT,
    payload: {
      id,
    },
  };
}

export function selectDocument(document) {
  const figures = _.filter(TEST_FIGURES, { 'document_id': `${document.id}` });

  return {
    type: SELECT_DOCUMENT,
    payload: {
      document,
      figures,
    },
  };
}

export function selectFigure(figure) {
  const subfigures = _.filter(TEST_SUBFIGURES, { 'figure_id': `${figure.id}` });
  let selectedSubfigure = null;
  if (subfigures.length > 0) {
    selectedSubfigure = subfigures[0];
  }

  return {
    type: SELECT_FIGURE,
    payload: {
      figure,
      subfigures,
      selectedSubfigure,
    },
  };
}

export function selectSubfigure(subfigure) {
  return {
    type: SELECT_SUBFIGURE,
    payload: subfigure,
  };
}
