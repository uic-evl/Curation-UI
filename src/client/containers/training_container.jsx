/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';
import TrainingImageList from 'client/components/training_images_list';
import UpdateTrainingImage from 'client/containers/update_training_image';
import { fetchTrainingImages } from 'client/actions';

class TrainingContainer extends Component {
  componentDidMount() {
    const { fetchTrainingImages } = this.props;
    fetchTrainingImages();
  }

  render() {
    const { trainingImages, currentImage } = this.props;

    return (
      <Grid className="md-grid--no-spacing">
        <Cell size={12} className="md-grid--no-spacing">
          <UpdateTrainingImage image={currentImage} />
        </Cell>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    trainingImages: null,
    currentImage: null,
  };

  if (state.trainingImages) {
    props.trainingImages = state.trainingImages;
    props.currentImage = props.trainingImages;
  }

  return props;
}

export default connect(mapStateToProps, { fetchTrainingImages })(TrainingContainer);
