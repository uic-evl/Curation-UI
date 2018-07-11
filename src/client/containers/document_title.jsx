/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toolbar } from 'react-md';

class DocumentTitle extends Component {
  render() {
    const { document } = this.props;

    return (
      <div className="md-grid md-grid--no-spacing figure-header">
        <Toolbar
          themed
          className="md-cell--12"
          title={<a href={document.url}>{document.title}</a>}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.selectedDocumentData) {
    return {
      document: {
        'title': 'NOTHING SELECTED YET',
        'url': 'http://www.google.com',
      },
    };
  }

  return {
    document: state.selectedDocumentData.document,
  };
}

export default connect(mapStateToProps)(DocumentTitle);
