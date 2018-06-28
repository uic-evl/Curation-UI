/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Toolbar } from 'react-md';

const ElementTitle = (element) => {
  if (!element) {
    return (<div />);
  }

  return (
    <div className="md-grid md-grid--no-spacing figure-header">
      <Toolbar
        className="md-cell--12"
        title={<a href={element.url}>{element.name}</a>}
      />
    </div>
  );
};

export default ElementTitle;
