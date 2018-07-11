/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Media,
  Paper,
} from 'react-md';

class SimilarImagesList extends Component {
  render() {
    return (
      <div className="md-grid md-grid--no-spacing">
        <Paper className="md-cell md-cell--12 md-grid">
          <section className="md-cell md-cell--12-tablet md-cell--12-desktop">
            <Media><img src="https://dummyimage.com/100x100/000/fff" alt="sample" /></Media>
          </section>
          <section className="md-cell md-cell--12-tablet md-cell--12-desktop">
            <Media><img src="https://dummyimage.com/100x100/ff26ff/fff" alt="sample" /></Media>
          </section>
          <section className="md-cell md-cell--12-tablet md-cell--12-desktop">
            <Media><img src="https://dummyimage.com/100x100/2059c9/fff" alt="sample" /></Media>
          </section>
          <section className="md-cell md-cell--12-tablet md-cell--12-desktop">
            <Media><img src="https://dummyimage.com/100x100/000/fff" alt="sample" /></Media>
          </section>
          <section className="md-cell md-cell--12-tablet md-cell--12-desktop">
            <Media><img src="https://dummyimage.com/100x100/ff26ff/fff" alt="sample" /></Media>
          </section>
        </Paper>
      </div>
    );
  }
}

export default SimilarImagesList;
