/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';
import TrainingImageList from 'client/components/training_images_list';
import UpdateTrainingImage from 'client/containers/update_training_image';
import { fetchModalities, fetchTrainingImages } from 'client/actions';
import { parseValuesSelectField } from 'client/containers/utils/training_form';
import requireAuth from 'client/components/auth/requireAuth';

class TrainingContainer extends Component {
  componentDidMount() {
    const { fetchTrainingImages, fetchModalities } = this.props;
    fetchTrainingImages(0);
    fetchModalities();
  }

  render() {
    const { trainingImages, currentImage, existsPrevious } = this.props;
    const { modalities, modalities1 } = this.props;

    if (!currentImage || !modalities || !modalities1) {
      return (<div />);
    }

    return (
      <Grid className="md-grid--no-spacing">
        <Cell size={12} className="md-grid--no-spacing">
          <UpdateTrainingImage image={currentImage} existsPrevious={existsPrevious} modalities={modalities} modalities1={modalities1} />
        </Cell>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    trainingImages: null,
    currentImage: null,
    modalities: null,
    modalities1: [],
  };

  if (state.trainingImages) {
    props.trainingImages = state.trainingImages;
    props.currentImage = props.trainingImages.image;
    props.existsPrevious = props.trainingImages.existsPrevious;
  }

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseValuesSelectField(modalities1);
  }

  return props;
}

export default connect(mapStateToProps, { fetchModalities, fetchTrainingImages })(requireAuth(TrainingContainer));
