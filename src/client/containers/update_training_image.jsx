/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
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

class UpdateTrainingImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadPrevious: false,
      currHistory: 0,
      modality1: '',
      modalities2: [],
      modality2: '',
      modalities3: [],
      modality3: '',
      modalities4: [],
      modality4: '',
      newModality1: '',
      disabledModality1: true,
      disabledModality2: true,
      disabledModality3: true,
      disabledModality4: true,
      isCompound: false,
      sharedModality: false,
      disabledSharedModality: true,
      observations: '',
      needsCropping: false,
    };

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps && prevProps.image.name !== this.props.image.name) {
      console.log(this.props.image);

      let modalities2 = [];
      let disabledModality2 = true;
      if (this.props.image.modality1 !== '') {
        const updatesModality1 = this.changeModality1(this.props.image.modality1);
        modalities2 = updatesModality1.modalities2;
        disabledModality2 = updatesModality1.disabledModality2;
      }

      this.setState({
        modality1: this.props.image.modality1,
        modality2: this.props.image.modality2,
        modalities2,
        observations: this.props.image.observations,
        needsCropping: this.props.image.needs_cropping,
        newModality1: this.props.image.other_modality1,
        sharedModality: this.props.image.shared_modality,
        isCompound: this.props.image.is_compound,
        disabledModality2,
      });
    }
  }

  onChangeCompound(checked) {
    let disabled = true;
    if (checked) {
      disabled = false;
    }

    this.setState({
      disabledSharedModality: disabled,
      isCompound: checked,
    });
  }

  onChangeModality1(value) {
    const { modalities } = this.props;
    let modalities2 = _.reject(modalities, (o) => { return o.modality2 === ''; });
    modalities2 = _.filter(modalities2, { 'modality1': value });

    let disabledModality2 = true;
    if (modalities2.length > 0) {
      modalities2 = [...new Set(modalities2.map(item => item.modality2))];
      modalities2 = this.parseForSelectField(modalities2);
      disabledModality2 = false;
    }

    const disabledModality1 = !(value === 'Other');

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

    let modalities3 = _.reject(modalities, (o) => { return o.modality3 === ''; });
    modalities3 = _.filter(modalities3, {
      'modality1': modality1,
      'modality2': value,
    });

    let disabledModality3 = true;
    if (modalities3.length > 0) {
      modalities3 = [...new Set(modalities3.map(item => item.modality3))];
      modalities3 = this.parseForSelectField(modalities3);
      disabledModality3 = false;
    }

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

    let modalities4 = _.reject(modalities, (o) => { return o.modality4 === ''; });
    modalities4 = _.filter(modalities4, {
      'modality1': modality1,
      'modality2': modality2,
      'modality3': value,
    });

    let disabledModality4 = true;
    if (modalities4.length > 0) {
      modalities4 = [...new Set(modalities4.map(item => item.modality4))];
      modalities4 = this.parseForSelectField(modalities4);
      disabledModality4 = false;
    }

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
    this.setState({
      currHistory: this.state.currHistory + 1,
    }, () => {
      this.resetForm();
      const { fetchTrainingImages } = this.props;
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

    // let currHistory = this.state.currHistory;
    this.setState({ currHistory: 0 });

    if (this.validate()) {
      updateTrainingImage(image._id, values, () => {
        const { fetchTrainingImages } = this.props;
        fetchTrainingImages(0);
        this.resetForm();
      });
    } else {
      console.log('invalid');
    }
  }

  changeModality1(newModality1) {
    const { modalities } = this.props;
    let modalities2 = _.reject(modalities, (o) => { return o.modality2 === ''; });
    modalities2 = _.filter(modalities2, { 'modality1': newModality1 });

    let disabledModality2 = true;
    if (modalities2.length > 0) {
      modalities2 = [...new Set(modalities2.map(item => item.modality2))];
      modalities2 = this.parseForSelectField(modalities2);
      disabledModality2 = false;
    }

    const disabledModality1 = !(newModality1 === 'Other');

    return {
      modalities2,
      disabledModality1,
      disabledModality2,
    };
  }

  parseForSelectField(items) {
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

  resetForm() {
    this.setState({
      modality1: '',
      modality2: '',
      modality3: '',
      modality4: '',
      modalities2: [],
      modalities3: [],
      modalities4: [],
      disabledModality2: true,
      disabledModality3: true,
      disabledModality4: true,
      disabledSharedModality: true,
      sharedModality: false,
      isCompound: false,
      observations: '',
      needsCropping: false,
    });
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
          <div className="md-cell--4">
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
                <Button flat primary swapTheming onClick={this.onPrevious}>Previous</Button>
                <Button flat primary swapTheming onClick={this.onSave}>Next To Review</Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function parseForSelectField(items) {
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


function mapStateToProps(state) {
  const props = {
    modalities: null,
    modalities1: [],
  };

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseForSelectField(modalities1);
  }

  return props;
}

export default withRouter(connect(mapStateToProps, { fetchModalities, updateTrainingImage, fetchTrainingImages })(UpdateTrainingImage));
