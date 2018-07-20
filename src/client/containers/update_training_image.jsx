/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import React, { Component } from 'react';

import {
  Media,
  Toolbar,
  SelectField,
  TextField,
  Button,
  Paper,
  SelectionControl,
} from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchModalities, updateTrainingImage, fetchTrainingImages } from 'client/actions';
import {
  parseValuesSelectField,
  filterModalities2,
  filterModalities3,
  filterModalities4,
  getStateInitVals,
  resetFormValues,
} from 'client/containers/utils/training_form';

class UpdateTrainingImage extends Component {
  constructor(props) {
    super(props);

    this.state = getStateInitVals();

    this.onChangeCompound = this.onChangeCompound.bind(this);
    this.onChangeModality1 = this.onChangeModality1.bind(this);
    this.onChangeModality2 = this.onChangeModality2.bind(this);
    this.onChangeModality3 = this.onChangeModality3.bind(this);
    this.onChangeModality4 = this.onChangeModality4.bind(this);
    this.onChangeNewModality = this.onChangeNewModality.bind(this);
    this.onChangeNeedsCropping = this.onChangeNeedsCropping.bind(this);
    this.onChangeObservations = this.onChangeObservations.bind(this);
    this.onChangeSharedModality = this.onChangeSharedModality.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { fetchModalities } = this.props;
    fetchModalities();
  }

  componentDidUpdate(prevProps) {
    const { modalities, image } = this.props;

    // Prevent infinity loop by only updating new images
    if (prevProps && prevProps.image.name !== image.name) {
      const { modality1, modality2 } = image;
      const { modality3, modality4 } = image;
      const { modalities2, disabledModality1, disabledModality2 } = filterModalities2(modalities, modality1);
      const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, modality2);
      const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, modality3);

      const disabledSharedModality = !image.is_compound;

      this.setState({
        modality1,
        modality2,
        modality3,
        modality4,
        modalities2,
        modalities3,
        modalities4,
        observations: image.observations,
        needsCropping: image.needs_cropping,
        newModality1: image.other_modality1,
        sharedModality: image.shared_modality,
        isCompound: image.is_compound,
        disabledModality1,
        disabledModality2,
        disabledModality3,
        disabledModality4,
        disabledSharedModality,
      });
    }
  }

  onChangeCompound(checked) {
    this.setState({
      disabledSharedModality: !checked,
      isCompound: checked,
    });
  }

  onChangeModality1(value) {
    const { modalities } = this.props;
    const { modalities2, disabledModality1, disabledModality2 } = filterModalities2(modalities, value);

    this.setState({
      modality1: value,
      modalities2,
      modality2: '',
      modalities3: [],
      modality3: '',
      modalities4: [],
      modality4: '',
      disabledModality1,
      disabledModality2,
      disabledModality3: true,
      disabledModality4: true,
    });
  }

  onChangeModality2(value) {
    const { modalities } = this.props;
    const { modality1 } = this.state;
    const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, value);

    this.setState({
      modality2: value,
      modalities3,
      disabledModality3,
      modalities4: [],
      modality4: '',
      disabledModality4: true,
    });
  }

  onChangeModality3(value) {
    const { modalities } = this.props;
    const { modality1, modality2 } = this.state;
    const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, value);

    this.setState({
      modality3: value,
      modalities4,
      disabledModality4,
    });
  }

  onChangeModality4(value) {
    this.setState({ modality4: value });
  }

  onChangeNewModality(value) {
    this.setState({ newModality1: value });
  }

  onChangeObservations(value) {
    this.setState({ observations: value });
  }

  onChangeSharedModality(value) {
    this.setState({ sharedModality: value });
  }

  onChangeNeedsCropping(value) {
    this.setState({ needsCropping: value });
  }

  onPrevious() {
    const { fetchTrainingImages } = this.props;

    this.setState({
      currHistory: this.state.currHistory + 1,
    }, () => {
      this.setState(resetFormValues());
      fetchTrainingImages(this.state.currHistory);
    });
  }

  onSave() {
    const { image } = this.props;
    let values = null;

    if (this.state.modality1 === '') {
      // Skip this image and get a new one
      values = {
        state: 'skipped',
        modality1: '',
        modality2: '',
        modality3: '',
        modality4: '',
        observations: '',
        isCompound: false,
        sharedModality: false,
      };
    } else {
      values = _.pick(this.state,
        ['modality1', 'modality2', 'modality3', 'modality4', 'observations', 'isCompound',
          'sharedModality', 'newModality1', 'needsCropping']);
    }

    this.setState({ currHistory: 0 });

    if (this.validate()) {
      updateTrainingImage(image._id, values, () => {
        const { fetchTrainingImages } = this.props;
        fetchTrainingImages(0);
        this.setState(resetFormValues());
      });
    }
  }

  validate() {
    if (this.state.modality1 === 'Other') {
      if (this.state.newModality1 === '') {
        return false;
      }
      return true;
    }
    if (this.state.modalities2.length > 0 && this.state.modality2 === '') {
      return false;
    }
    if (this.state.modalities3.length > 0 && this.state.modality3 === '') {
      return false;
    }
    return true;
  }

  render() {
    const { image, modalities1 } = this.props;

    if (!image) {
      return <div />;
    }

    const imageUrl = `/images/Microscopy/${image.name}`;

    return (
      <div>
        <div className="md-grid md-grid--no-spacing figure-header">
          <Toolbar
            themed
            className="md-cell--12"
            title={image.name}
          />
        </div>
        <div className="md-grid">
          <div className="md-cell--4">
            <Media aspectRatio="1-1">
              <img src={imageUrl} alt="random" />
            </Media>
          </div>
          <div className="md-cell--8">
            <Paper className="md-grid md-grid--no-spacing">
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality1-select-field"
                  label="Category"
                  className="md-cell md-cell--6"
                  menuItems={modalities1}
                  onChange={this.onChangeModality1}
                  value={this.state.modality1}
                  required={true}
                  errorText="Mandatory field"
                />
                <TextField
                  id="modality1"
                  label="New Category"
                  lineDirection="center"
                  placeholder="Enter new modality"
                  className="md-cell md-cell-6"
                  disabled={this.state.disabledModality1}
                  required={!this.state.disabledModality1}
                  value={this.state.newModality1}
                  onChange={this.onChangeNewModality}
                  errorText="Mandatory field"
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality2-select-field"
                  label="Modality"
                  className="md-cell md-cell--6"
                  menuItems={this.state.modalities2}
                  value={this.state.modality2}
                  onChange={this.onChangeModality2}
                  disabled={this.state.disabledModality2}
                  defaultValue=""
                  required={!this.state.disabledModality2}
                  errorText="Mandatory field"
                />
                <SelectField
                  id="modality3-select-field"
                  label="Sub-Modality"
                  className="md-cell md-cell--6"
                  value={this.state.modality3}
                  menuItems={this.state.modalities3}
                  onChange={this.onChangeModality3}
                  disabled={this.state.disabledModality3}
                  defaultValue=""
                  required={!this.state.disabledModality3}
                  errorText="Mandatory field"
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality3-select-field"
                  label="Sub-sub-Modality"
                  className="md-cell md-cell--6"
                  menuItems={this.state.modalities4}
                  value={this.state.modality4}
                  onChange={this.onChangeModality4}
                  disabled={this.state.disabledModality4}
                  defaultValue=""
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <div className="md-grid md-cell md-cell--6">
                  <SelectionControl
                    id="is-compound"
                    type="checkbox"
                    label="Is Compound?"
                    name="lights"
                    className="md-cell--12"
                    checked={this.state.isCompound}
                    onChange={this.onChangeCompound}
                  />
                  <SelectionControl
                    id="sub-figure-same"
                    type="checkbox"
                    label="Sub-figures share modality"
                    name="lights"
                    className="md-cell--12"
                    checked={this.state.sharedModality}
                    disabled={this.state.disabledSharedModality}
                    onChange={this.onChangeSharedModality}
                  />
                  <SelectionControl
                    id="figure-cropping"
                    type="checkbox"
                    label="Figure needs cropping"
                    name="lights"
                    className="md-cell--12"
                    checked={this.state.needsCropping}
                    onChange={this.onChangeNeedsCropping}
                  />
                </div>
                <TextField
                  id="observations"
                  label="Observations"
                  lineDirection="center"
                  className="md-cell md-cell-6"
                  rows={3}
                  value={this.state.observations}
                  onChange={this.onChangeObservations}
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <Button
                  flat
                  primary
                  swapTheming
                  className="md-cell--5"
                  onClick={this.onPrevious}
                  disabled={!this.props.existsPrevious}
                >
                  Previous
                </Button>
                <div className="md-cell--2" />
                <Button
                  flat
                  primary
                  swapTheming
                  className="md-cell--5"
                  onClick={this.onSave}
                >
                  Next To Review
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    modalities: null,
    modalities1: [],
  };

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseValuesSelectField(modalities1);
  }

  return props;
}

export default withRouter(connect(mapStateToProps, { fetchModalities, updateTrainingImage, fetchTrainingImages })(UpdateTrainingImage));
