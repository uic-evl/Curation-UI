/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';

import { fetchTrainingImages } from 'client/actions';

import TrainingCards from 'client/containers/training_cards';

class TrainingContainer extends Component {
  componentDidMount() {
    const { fetchTrainingImages } = this.props;
    fetchTrainingImages();
  }

  render() {
    return (
      <Grid className="md-grid--no-spacing">
        <Cell size={12} className="md-grid--no-spacing">
          <TrainingCards />
        </Cell>
      </Grid>
    );
  }
}

export default connect(null, { fetchTrainingImages })(TrainingContainer);
