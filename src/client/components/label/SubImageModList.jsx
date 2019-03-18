/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  TableBody,
  TableRow,
  TableColumn,
  Checkbox,
  TextField,
  Grid,
  Cell,
  SelectionControl,
  Toolbar,
  Button,
} from 'react-md';
import { updateSubfigure } from 'client/actions';

class SubImageModList extends Component {
  constructor(props) {
    super(props);

    const { modalities } = this.props;
    const order = ['Gel', 'Plate', 'Fluorescence', 'Light', 'Electron', 'Graphics', 'Organisms', 'Molecular Structure', 'Other'];
    let maxSize = 0;

    let ordModalities = [];
    for (let i = 0; i < order.length; i++) {
      const columnName = order[i];
      const values = _.filter(modalities, { columnName });
      const index = _.findIndex(values, { simplify: 'Other' });
      // Put Others at the end
      if (index !== -1) {
        const other = values.splice(index, 1);
        values.push(other[0]);
      }
      // Get max size to know the number of columns
      if (values.length > maxSize) {
        maxSize = values.length;
      }
      ordModalities = ordModalities.concat(values);
    }

    const dict = {};
    ordModalities.forEach((mod) => { dict[mod._id] = { 'value': false }; });

    this.state = {
      rows: order,
      modalities: ordModalities,
      matrix: dict,
      maxCols: maxSize,
      compound: false,
      needsCropping: false,
      observations: '',
    };

    this.onChangeCompound = this.onChangeCompound.bind(this);
    this.onChangeObservations = this.onChangeObservations.bind(this);
    this.onChangeNeedsCropping = this.onChangeNeedsCropping.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeCompound(value) {
    this.setState({ compound: value });
  }

  onChangeObservations(value) {
    this.setState({ observations: value });
  }

  onChangeModality(id) {
    const { matrix } = this.state;
    matrix[id].value = !matrix[id].value;
    this.setState({ matrix });
  }

  onChangeNeedsCropping(value) {
    this.setState({ needsCropping: value });
  }

  onSave() {
    const { matrix } = this.state;
    const matrixIds = [];
    for (const key in matrix) {
      if (matrix[key].value) {
        matrixIds.push(key);
      }
    }

    if (this.validate(matrixIds)) {
      const { figure, updateSubfigure, modalities } = this.props;
      const values = _.pick(this.state, ['observations', 'compound', 'needsCropping']);
      const pickedModalities = [];
      matrixIds.forEach((_id) => {
        const modality = _.filter(modalities, { '_id': _id });
        pickedModalities.push(modality[0]);
      });
      values.modalities = pickedModalities;
      console.log(values);
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }

  validate(matrixIds) {
    if (matrixIds.length > 0) {
      return true;
    }
    return false;
  }

  renderItems() {
    const { rows, modalities, maxCols } = this.state;

    return rows.map((row) => {
      const values = _.filter(modalities, { columnName: row });
      while (values.length < maxCols) {
        values.push(null);
      }

      return (
        <TableRow key={row}>
          <TableColumn className="selection-table selected-td" plain>{row}</TableColumn>
          {this.renderCols(values)}
        </TableRow>
      );
    });
  }

  renderCols(cols) {
    const { matrix } = this.state;

    return cols.map((col) => {
      if (col) {
        return (
          <TableColumn plain className="selection-table" key={col._id}>
            <Checkbox
              id={col._id}
              name={col._id}
              label={col.simplify}
              value={col.simplify}
              className="matrix-checkbox"
              checked={matrix[col._id].value}
              onChange={() => { this.onChangeModality(col._id); }}
            />
          </TableColumn>
        );
      } else {
        return (
          <TableColumn plain className="selection-table" key={Math.random()} />
        );
      }
    });
  }

  render() {
    const { observations, compound, needsCropping } = this.state;

    return (
      <div>
        <DataTable plain>
          <TableBody>
            {this.renderItems()}
          </TableBody>
        </DataTable>
        <div>Subfigure Observations</div>
        <Grid className="md-grid--no-spacing">
          <Cell size={4}>
            <SelectionControl
              id="is-compound"
              type="checkbox"
              label="Compound image?"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
              checked={compound}
              onChange={this.onChangeCompound}
            />
          </Cell>
          <Cell size={4}>
            <SelectionControl
              id="figure-cropping"
              type="checkbox"
              label="Needs cropping?"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
              checked={needsCropping}
              onChange={this.onChangeNeedsCropping}
            />
          </Cell>
          <Cell size={4}>
            <TextField
              id="observations"
              label="Comments"
              lineDirection="center"
              className="custom-input-field md-cell md-cell--12"
              rows={1}
              value={observations}
              onChange={this.onChangeObservations}
            />
          </Cell>
        </Grid>
        <Toolbar
          themed
          className="properties-title"
          title=""
          actions={(
            [<Button flat secondary onClick={this.onSkip}>Skip</Button>,
              <Button flat secondary onClick={this.onSave}>Save</Button>]
          )}
        />
      </div>

    );
  }
}

SubImageModList.propTypes = {
  modalities: PropTypes.arrayOf(PropTypes.object),
  updateSubfigure: PropTypes.func,
  figure: PropTypes.object,
};

export default SubImageModList;
