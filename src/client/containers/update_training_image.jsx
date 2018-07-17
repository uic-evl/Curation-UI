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
      modality1: '',
      modalities2: [],
      modality2: '',
      modalities3: [],
      modality3: '',
      modalities4: [],
      modality4: '',
      disabledModality1: true,
      disabledModality2: true,
      disabledModality3: true,
      disabledModality4: true,
    };

    this.onChangeModality1 = this.onChangeModality1.bind(this);
    this.onChangeModality2 = this.onChangeModality2.bind(this);
    this.onChangeModality3 = this.onChangeModality3.bind(this);
    this.onChangeModality4 = this.onChangeModality4.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { fetchModalities } = this.props;
    fetchModalities();
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
    this.setState({
      modality4: value,
    });
  }

  onSave() {
    const { image } = this.props;
    const values = _.pick(this.state, ['modality1', 'modality2', 'modality3', 'modality4']);
    updateTrainingImage(image._id, values, () => {
      const { fetchTrainingImages } = this.props;
      fetchTrainingImages();
      this.resetForm();
    });
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
    });
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
            <Paper class="md-grid md-grid--no-spacing">
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality1-select-field"
                  label="Category"
                  className="md-cell md-cell--6"
                  menuItems={modalities1}
                  onChange={this.onChangeModality1}
                  value={this.state.modality1}
                  defaultValue="Experimental"
                />
                <TextField
                  id="modality1"
                  label="New Category"
                  lineDirection="center"
                  placeholder="Enter new modality"
                  className="md-cell md-cell-6"
                  disabled={this.state.disabledModality1}
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality2-select-field"
                  label="Modality"
                  className="md-cell md-cell--6"
                  menuItems={this.state.modalities2}
                  onChange={this.onChangeModality2}
                  disabled={this.state.disabledModality2}
                />
                <SelectField
                  id="modality3-select-field"
                  label="Sub-Modality"
                  className="md-cell md-cell--6"
                  menuItems={this.state.modalities3}
                  onChange={this.onChangeModality3}
                  disabled={this.state.disabledModality3}
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <SelectField
                  id="modality3-select-field"
                  label="Sub-sub-Modality"
                  className="md-cell md-cell--6"
                  menuItems={this.state.modalities4}
                  onChange={this.onChangeModality4}
                  disabled={this.state.disabledModality4}
                />
                <div className="md-grid md-cell md-cell--6">
                  <SelectionControl
                    id="is-compound"
                    type="switch"
                    label="Is Compound?"
                    name="lights"
                    className="md-cell--12"
                  />
                  <SelectionControl
                    id="sub-figure-same"
                    type="switch"
                    label="Sub-figures share modality"
                    name="lights"
                    className="md-cell--12"
                    defaultChecked
                  />
                </div>
              </div>
              <div className="md-grid md-cell md-cell--12">
                <TextField
                  id="observations"
                  label="Observations"
                  lineDirection="center"
                  className="md-cell md-cell-12"
                  rows={2}
                />
              </div>
              <div className="md-grid md-cell md-cell--12">
                <Button flat primary swapTheming onClick={this.onSave}>Save</Button>
                <Button flat secondary swapTheming>Skip</Button>
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
