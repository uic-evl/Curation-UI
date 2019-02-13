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
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
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
  Snackbar,
} from 'react-md';
import { connect } from 'react-redux';
import {
  filterModalities2,
  filterModalities3,
  filterModalities4,
  getStateInitVals,
  resetFormValues,
} from 'client/containers/utils/training_form';
import { updateSubfigure } from 'client/actions';

class SubImage extends Component {
  constructor(props) {
    super(props);

    this.state = getStateInitVals();
    this.state.toasts = [];
    this.state.autohide = true;
    this.state.toastMessage = '';

    this.onClean = this.onClean.bind(this);
    this.onChangeCompound = this.onChangeCompound.bind(this);
    this.onChangeModality1 = this.onChangeModality1.bind(this);
    this.onChangeModality2 = this.onChangeModality2.bind(this);
    this.onChangeModality3 = this.onChangeModality3.bind(this);
    this.onChangeModality4 = this.onChangeModality4.bind(this);
    this.onChangeNewModality = this.onChangeNewModality.bind(this);
    this.onChangeNeedsCropping = this.onChangeNeedsCropping.bind(this);
    this.onChangeObservations = this.onChangeObservations.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { modalities, figure } = this.props;
    const { modality1, modality2 } = figure;
    const { modality3, modality4 } = figure;
    const { modalities2, disabledModality1, disabledModality2 } = filterModalities2(modalities, modality1);
    const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, modality2);
    const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, modality3);

    // these lines are provisional, have to fix db
    let observations = figure.observations;
    if (observations === undefined) {
      observations = '';
    }
    let needsCropping = figure.needsCropping;
    if (needsCropping === undefined) {
      needsCropping = false;
    }
    let isCompound = figure.isCompound;
    if (isCompound === undefined) {
      isCompound = false;
    }

    this.setState({
      modality1,
      modality2,
      modality3,
      modality4,
      modalities2,
      modalities3,
      modalities4,
      observations,
      needsCropping,
      isCompound,
      disabledModality1,
      disabledModality2,
      disabledModality3,
      disabledModality4,
    });
  }

  componentDidUpdate(prevProps) {
    const { modalities, figure } = this.props;

    // Prevent infinity loop by only updating new images
    if (prevProps && prevProps.figure._id !== figure._id) {
      const { modality1, modality2 } = figure;
      const { modality3, modality4 } = figure;
      const { modalities2, disabledModality1, disabledModality2 } = filterModalities2(modalities, modality1);
      const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, modality2);
      const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, modality3);

      let observations = figure.observations;
      if (observations === undefined) {
        observations = '';
      }
      let needsCropping = figure.needsCropping;
      if (needsCropping === undefined) {
        needsCropping = false;
      }
      let isCompound = figure.isCompound;
      if (isCompound === undefined) {
        isCompound = false;
      }

      this.setState({
        modality1,
        modality2,
        modality3,
        modality4,
        modalities2,
        modalities3,
        modalities4,
        observations,
        needsCropping,
        isCompound,
        disabledModality1,
        disabledModality2,
        disabledModality3,
        disabledModality4,
      });
    }
  }

  onClean() {
    this.setState(resetFormValues());
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

  onChangeNeedsCropping(value) {
    this.setState({ needsCropping: value });
  }

  onSave() {
    const { figure, updateSubfigure } = this.props;
    const values = _.pick(this.state,
      ['modality1', 'modality2', 'modality3', 'modality4', 'observations', 'isCompound',
        'needsCropping']);

    if (this.validate()) {
      updateSubfigure(figure._id, values, () => {
        console.log('updated');
        this.toastSubmit('Subfigure updated!');
        // this.setState(resetFormValues());
      });
    }
  }

  addToast = (text, action, autohide: true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  toastSubmit = (message) => {
    this.addToast(message);
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
    const { figure, modalities1 } = this.props;
    const { toasts, autohide, toastMessage } = this.state;

    if (!figure) {
      return <div />;
    }

    const imageUrl = `/images/Microscopy/${figure.name}`;

    return (
      <div>
        <div className="md-grid">
          <div className="md-cell--12">
            <Paper className="md-grid md-grid--no-spacing">
              <div>{figure._id}</div>
              <div className="md-cell md-cell--12">
                <SelectField
                  id="modality1-select-field"
                  label="Category"
                  className="md-cell md-cell--12 md-cell--top"
                  menuItems={modalities1}
                  onChange={this.onChangeModality1}
                  value={this.state.modality1}
                  required={true}
                  errorText="Mandatory field"
                />
                <SelectField
                  id="modality2-select-field"
                  label="Modality"
                  className="md-cell md-cell--12 md-cell--top"
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
                  className="md-cell md-cell--12"
                  value={this.state.modality3}
                  menuItems={this.state.modalities3}
                  onChange={this.onChangeModality3}
                  disabled={this.state.disabledModality3}
                  defaultValue=""
                  required={!this.state.disabledModality3}
                  errorText="Mandatory field"
                />
                <SelectField
                  id="modality3-select-field"
                  label="Sub-sub-Modality"
                  className="md-cell md-cell--12 md-cell--top"
                  menuItems={this.state.modalities4}
                  value={this.state.modality4}
                  onChange={this.onChangeModality4}
                  disabled={this.state.disabledModality4}
                  defaultValue=""
                />
                <SelectionControl
                  id="figure-cropping"
                  type="checkbox"
                  label="Figure needs cropping"
                  name="lights"
                  className="md-cell md-cell--12"
                  checked={this.state.needsCropping}
                  onChange={this.onChangeNeedsCropping}
                />
                <SelectionControl
                  id="is-compound"
                  type="checkbox"
                  label="Is Compound?"
                  name="lights"
                  className="md-cell md-cell--12"
                  checked={this.state.isCompound}
                  onChange={this.onChangeCompound}
                />
                <TextField
                  id="observations"
                  label="Observations"
                  lineDirection="center"
                  className="md-cell md-cell--top"
                  rows={1}
                  value={this.state.observations}
                  onChange={this.onChangeObservations}
                />
              </div>
              <div className="md-cell md-cell--12">
                <Button
                  flat
                  secondary
                  className="md-cell--5"
                  onClick={this.onSave}
                >
                  Save
                </Button>
                <Snackbar
                  id="message-snackbar"
                  toasts={toasts}
                  autohide={autohide}
                  onDismiss={this.dismissToast}
                />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateSubfigure })(SubImage);
