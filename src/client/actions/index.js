/* eslint-disable prefer-destructuring */
/* eslint-disable no-debugger */
import _ from 'lodash';
import axios from 'axios';
import {
  FETCH_ELEMENT,
  SELECT_DOCUMENT,
  SELECT_FIGURE,
  SELECT_SUBFIGURE,
  FETCH_IMAGE_TO_TRAIN,
} from 'client/actions/action_types';
import TEST_DOCUMENTS from 'client/data/test_documents';
import TEST_FIGURES from 'client/data/test_figures';
import TEST_SUBFIGURES from 'client/data/test_subfigures';
import TEST_ELEMENTS from 'client/data/test_elements';

const API_URL = 'http://localhost:3050/';

export function fetchElement(id) {
  const element = _.find(TEST_ELEMENTS, { 'id': `${id}` });
  const documents = _.filter(TEST_DOCUMENTS, { 'pid': `${id}` });

  return {
    type: FETCH_ELEMENT,
    payload: {
      element,
      documents,
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

export function fetchTrainingImages() {
  const url = `${API_URL}getTrainingData`;
  const request = axios.get(url);

  return {
    type: FETCH_IMAGE_TO_TRAIN,
    payload: request,
  };
}
