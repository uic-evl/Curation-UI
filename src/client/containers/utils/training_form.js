/* eslint-disable arrow-body-style */

/*
  Modality1, Modality2, Modality3 and Modality4 refer to the taxonomy
  for the modalities. As now, we do not have an exact nomenclature
  for each layer; thus, we just use the number to refer to the
  sub-level in the taxonomy tree.
*/

import _ from 'lodash';

export function parseValuesSelectField(items) {
  const elems = [];
  items.forEach((item) => {
    const elem = {
      'label': item,
      'value': item,
    };
    elems.push(elem);
  });

  return elems;
}

export function filterModalities2(modalities, mod1) {
  let modalities2 = _.reject(modalities, (o) => { return o.modality2 === ''; });
  modalities2 = _.filter(modalities2, { 'modality1': mod1 });

  let disabledModality2 = true;
  if (modalities2.length > 0) {
    modalities2 = [...new Set(modalities2.map(item => item.modality2))];
    modalities2 = parseValuesSelectField(modalities2);
    disabledModality2 = false;
  }
  const disabledModality1 = !(mod1 === 'Other');

  return {
    modalities2,
    disabledModality1,
    disabledModality2,
  };
}

export function filterModalities3(modalities, mod1, mod2) {
  let modalities3 = _.reject(modalities, (o) => { return o.modality3 === ''; });
  modalities3 = _.filter(modalities3, {
    'modality1': mod1,
    'modality2': mod2,
  });

  let disabledModality3 = true;
  if (modalities3.length > 0) {
    modalities3 = [...new Set(modalities3.map(item => item.modality3))];
    modalities3 = parseValuesSelectField(modalities3);
    disabledModality3 = false;
  }

  return {
    modalities3,
    disabledModality3,
  };
}

export function filterModalities4(modalities, mod1, mod2, mod3) {
  let modalities4 = _.reject(modalities, (o) => { return o.modality4 === ''; });
  modalities4 = _.filter(modalities4, {
    'modality1': mod1,
    'modality2': mod2,
    'modality3': mod3,
  });

  let disabledModality4 = true;
  if (modalities4.length > 0) {
    modalities4 = [...new Set(modalities4.map(item => item.modality4))];
    modalities4 = parseValuesSelectField(modalities4);
    disabledModality4 = false;
  }

  return {
    modalities4,
    disabledModality4,
  };
}

export function resetFormValues() {
  return {
    modality1: '',
    modality2: '',
    modality3: '',
    modality4: '',
    newModality1: '',
    modalities2: [],
    modalities3: [],
    modalities4: [],
    disabledModality1: true,
    disabledModality2: true,
    disabledModality3: true,
    disabledModality4: true,
    isCompound: false,
    disabledSharedModality: true,
    needsCropping: false,
    observations: '',
  };
}

export function getStateInitVals() {
  const formVals = resetFormValues();
  formVals.currHistory = 0;

  return formVals;
}
