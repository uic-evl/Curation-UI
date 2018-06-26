/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class DocumentTitle extends Component {
  render() {
    const { document } = this.props;

    return (
      <div>
        <h3>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={document.url}>
            { document.title }
          </a>
        </h3>
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
