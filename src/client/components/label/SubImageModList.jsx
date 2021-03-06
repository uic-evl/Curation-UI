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
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  Snackbar,
  SelectField,
  SelectionControlGroup,
} from "react-md";
import TooltipCheckbox from "client/components/form/tooltippedCheckbox";
import { updateSubfigure, updateAllSubfigures } from "client/actions";

const NUMBER_SUBPANES = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "11", value: 11 },
  { label: "12", value: 12 },
  { label: "13", value: 13 },
  { label: "14", value: 14 },
  { label: "15", value: 15 },
];

class SubImageModList extends Component {
  constructor(props) {
    super(props);

    const { modalities } = this.props;
    const order = [
      "Gel",
      "Plate",
      "Fluorescence",
      "Light",
      "Electron",
      "Graphics",
      "Organisms",
      "Molecular Structure",
      "Other",
    ];
    let maxSize = 0;

    let ordModalities = [];
    for (let i = 0; i < order.length; i++) {
      const columnName = order[i];
      let values = _.filter(modalities, { columnName });
      values = _.orderBy(values, ["order"], ["asc"]);
      // Get max size to know the number of columns
      if (values.length > maxSize) {
        maxSize = values.length;
      }
      ordModalities = ordModalities.concat(values);
    }

    const dict = this.cleanDictionary(ordModalities);

    this.state = {
      rows: order,
      modalities: ordModalities,
      matrix: dict,
      maxCols: maxSize,
      isCompound: false,
      needsCropping: false,
      isOvercropped: false,
      isMissingSubfigures: false,
      isOverfragmented: false,
      observations: "",
      applyToAll: false,
      countSelected: 0,
      toasts: [],
      autohide: true,
      toastMessage: "",
      numberSubpanes: 1,
      closeUp: false,
      composition: null,
      multipane: false,
    };

    this.onChangeCompound = this.onChangeCompound.bind(this);
    this.onChangeObservations = this.onChangeObservations.bind(this);
    this.onChangeNeedsCropping = this.onChangeNeedsCropping.bind(this);
    this.onChangeIsOvercropped = this.onChangeIsOvercropped.bind(this);
    this.onChangeIsOverfragmented = this.onChangeIsOverfragmented.bind(this);
    this.onChangeNeedsIsMissingSubfigures = this.onChangeNeedsIsMissingSubfigures.bind(
      this
    );
    this.onChangeNumberSubpanes = this.onChangeNumberSubpanes.bind(this);
    this.onChangeIsCloseUp = this.onChangeIsCloseUp.bind(this);
    this.onChangeComposition = this.onChangeComposition.bind(this);
    this.onChangeMultipane = this.onChangeMultipane.bind(this);

    this.onSave = this.onSave.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.onChangeApplyToAll = this.onChangeApplyToAll.bind(this);
    this.getMatrixIds = this.getMatrixIds.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  componentDidMount() {
    const { figure } = this.props;
    const { modalities, needsCropping, isCompound } = figure;
    let {
      isOvercropped,
      isMissingSubfigures,
      numberSubpanes,
      isOverfragmented,
      composition,
    } = figure;
    const { observations } = figure;
    const { matrix } = this.state;

    // safety check
    if (isOvercropped === undefined) {
      isOvercropped = false;
    }
    if (isMissingSubfigures === undefined) {
      isMissingSubfigures = false;
    }
    if (isOverfragmented === undefined) {
      isOverfragmented = false;
    }
    if (numberSubpanes === undefined) {
      numberSubpanes = 1;
    }
    if (composition === undefined) {
      composition = null;
    }

    let multipane = false;
    if (composition != null) {
      multipane = true;
    }

    modalities.forEach((mod) => {
      matrix[mod._id] = { value: true };
    });
    const countSelected = modalities.length;
    this.setState({
      matrix,
      needsCropping,
      isCompound,
      observations,
      countSelected,
      isOvercropped,
      isMissingSubfigures,
      numberSubpanes,
      isOverfragmented,
      composition,
      multipane,
    });
  }

  componentDidUpdate(prevProps) {
    const { figure } = this.props;
    const { modalities } = this.state;
    let { countSelected, applyToAll } = this.state;

    // Prevent infinity loop by only updating new images
    if (prevProps && prevProps.figure._id !== figure._id) {
      const matrix = this.cleanDictionary(modalities);
      const figModalities = figure.modalities;
      figModalities.forEach((mod) => {
        matrix[mod._id] = { value: true };
      });
      countSelected = figModalities.length;

      let { observations, needsCropping, isCompound } = figure;
      let { isOvercropped, isMissingSubfigures, numberSubpanes } = figure;
      let { closeUp, isOverfragmented, composition } = figure;

      if (observations === undefined) {
        observations = "";
      }
      if (needsCropping === undefined) {
        needsCropping = false;
      }
      if (isCompound === undefined) {
        isCompound = false;
      }
      if (isOvercropped === undefined) {
        isOvercropped = false;
      }
      if (isMissingSubfigures === undefined) {
        isMissingSubfigures = false;
      }
      if (numberSubpanes === undefined) {
        numberSubpanes = 1;
      }
      if (closeUp === undefined) {
        closeUp = false;
      }
      if (isOverfragmented === undefined) {
        isOverfragmented = false;
      }
      if (composition === undefined) {
        composition = null;
      }

      let multipane = false;
      if (composition != null) {
        multipane = true;
      }

      if (countSelected === 0 && applyToAll) {
        applyToAll = false;
      }

      this.setState({
        matrix,
        needsCropping,
        isCompound,
        isOvercropped,
        isMissingSubfigures,
        isOverfragmented,
        numberSubpanes,
        observations,
        countSelected,
        applyToAll,
        closeUp,
        composition,
        multipane,
      });
    }
  }

  onChangeApplyToAll(value) {
    this.setState({ applyToAll: value });
  }

  onChangeCompound(value) {
    this.setState({ isCompound: value });
  }

  onChangeObservations(value) {
    this.setState({ observations: value });
  }

  onChangeModality(id) {
    const { matrix } = this.state;
    let { countSelected, applyToAll } = this.state;

    if (matrix[id].value) {
      countSelected -= 1;
    } else {
      countSelected += 1;
    }
    matrix[id].value = !matrix[id].value;

    if (countSelected === 0 && applyToAll) {
      applyToAll = false;
    }

    this.setState({ matrix, countSelected, applyToAll });
  }

  onChangeNeedsCropping(value) {
    this.setState({ needsCropping: value });
  }

  onChangeIsOvercropped(value) {
    this.setState({ isOvercropped: value });
  }

  onChangeNeedsIsMissingSubfigures(value) {
    this.setState({ isMissingSubfigures: value });
  }

  onChangeNumberSubpanes(value) {
    this.setState({ numberSubpanes: value });
  }

  onChangeIsCloseUp(value) {
    this.setState({ closeUp: value });
  }

  onChangeIsOverfragmented(value) {
    this.setState({ isOverfragmented: value });
  }

  onChangeComposition(value) {
    this.setState({ composition: value });
  }

  onChangeMultipane(value) {
    if (value) {
      this.setState({ multipane: value });
    } else {
      this.setState({ multipane: value, composition: null });
    }
  }

  onSave() {
    const { applyToAll } = this.state;
    this.save(applyToAll);
  }

  onSkip() {
    const { figure, updateSubfigure } = this.props;
    const SKIPPED = "Skipped";
    const values = {
      state: SKIPPED,
    };
    updateSubfigure(figure._id, values, () => {
      // this.toastSubmit('Subfigure updated!');
    });
  }

  getMatrixIds() {
    // Check the matrix and return an array of ids of the selected modalities
    const { matrix } = this.state;
    const matrixIds = [];
    for (const key in matrix) {
      if (matrix[key].value) {
        matrixIds.push(key);
      }
    }

    return matrixIds;
  }

  getValues(matrixIds) {
    const { modalities } = this.props;
    const values = _.pick(this.state, [
      "observations",
      "isCompound",
      "needsCropping",
      "isOvercropped",
      "isMissingSubfigures",
      "numberSubpanes",
      "closeUp",
      "isOverfragmented",
      "composition",
    ]);
    const pickedModalities = [];
    matrixIds.forEach((_id) => {
      const modality = _.filter(modalities, { _id });
      pickedModalities.push(modality[0]);
    });
    values.modalities = pickedModalities;
    return values;
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
  };

  toastSubmit = (message) => {
    this.addToast(message);
  };

  validate(matrixIds) {
    if (matrixIds.length > 0) {
      return true;
    }
    return false;
  }

  save(all) {
    const matrixIds = this.getMatrixIds();
    if (this.validate(matrixIds)) {
      if (this.state.numberSubpanes > 1 && this.state.composition === null) {
        this.toastSubmit("Indicate the compposition of the multi-panes");
        return;
      }

      const { updateSubfigure, updateAllSubfigures, figure } = this.props;
      const values = this.getValues(matrixIds);

      updateSubfigure(figure._id, values, () => {
        if (all) {
          updateAllSubfigures(figure.figureId, figure._id, values, () => {
            this.toastSubmit("Subfigures updated!");
          });
        } else {
          this.toastSubmit("Subfigure updated");
        }
      });
    } else {
      this.toastSubmit("Please select a modality label");
    }
  }

  cleanDictionary(orderedModalities) {
    const dict = {};
    orderedModalities.forEach((mod) => {
      dict[mod._id] = { value: false };
    });
    return dict;
  }

  renderItems() {
    const { rows, modalities, maxCols } = this.state;

    let i = 0;
    return rows.map((row) => {
      let rowStyle = "";
      if (i % 2 !== 0) {
        rowStyle = "alternate-color";
      }
      i += 1;

      const values = _.filter(modalities, { columnName: row });
      let rowLabel = row;
      if (values.length > 0) {
        rowLabel = values[0].columnLabel;
      }

      while (values.length < maxCols) {
        values.push(null);
      }

      return (
        <TableRow key={row} className={rowStyle}>
          <TableColumn className="selection-table selected-td" plain>
            {rowLabel}
          </TableColumn>
          {this.renderCols(values)}
        </TableRow>
      );
    });
  }

  renderCols(cols) {
    const { matrix } = this.state;

    return cols.map((col) => {
      if (col) {
        let tooltip = "";
        if (col.simplify === "Graph") {
          tooltip = "e.g. phylogenetic trees, graph pathways";
        }
        return (
          <TableColumn plain className="selection-table" key={col._id}>
            <TooltipCheckbox
              id={col._id}
              name={col._id}
              label={col.simplify}
              value={col.simplify}
              className="matrix-checkbox"
              checked={matrix[col._id].value}
              onChange={() => {
                this.onChangeModality(col._id);
              }}
              tooltipLabel={tooltip}
              tooltipPosition="top"
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
    const { observations, isCompound, needsCropping } = this.state;
    const { isOvercropped, isMissingSubfigures, numberSubpanes } = this.state;
    const { applyToAll, countSelected, closeUp } = this.state;
    const { isOverfragmented, composition } = this.state;
    const { toasts, autohide } = this.state;

    const lblNoSubpanes = isCompound ? "Number subfigures" : "Number subpanes";

    let compositionRadios = '';

    if (this.state.multipane) {
      compositionRadios = (
        <SelectionControlGroup
          id="selection-control-group-radios"
          name="pane-composition"
          type="radio"
          value={composition}
          controls={[{
            label: 'Heterogeneous',
            value: 'Heterogeneous',
          }, {
            label: 'Homogeneous',
            value: 'Homogeneous',
          }]}
          onChange={this.onChangeComposition}
        />
      );
    }

    return (
      <div>
        <Grid className="md-grid--no-spacing">
          <Cell size={5} className="md-cell md-cell--right">
            <SelectionControl
              id="apply-to-all"
              type="checkbox"
              label="Apply labels to all subfigures?"
              name="toall"
              className="md-cell md-cell--12 custom-input-field"
              checked={applyToAll}
              onChange={this.onChangeApplyToAll}
              disabled={countSelected === 0}
            />
          </Cell>
        </Grid>
        <Toolbar
          themed
          className="properties-title"
          title=""
          actions={[
            <Button flat secondary onClick={this.onSkip}>
              Skip
            </Button>,
            <Button flat secondary onClick={this.onSave}>
              Save
            </Button>,
          ]}
        />
        <DataTable plain>
          <TableBody>{this.renderItems()}</TableBody>
        </DataTable>
        <div>Subfigure Observations</div>
        <Grid className="md-grid--no-spacing">
          <Cell size={8}>
            <TooltipCheckbox
              id="chbox-close-up"
              type="checkbox"
              label="Close-up image"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
              checked={closeUp}
              onChange={this.onChangeIsCloseUp}
            />
            <TooltipCheckbox
              id="chbox-compound"
              label="Compound figure - should be further separated"
              name="chbox-compound"
              className="md-cell md-cell--12 custom-input-field"
              checked={isCompound}
              onChange={this.onChangeCompound}
              tooltipLabel="e.g. Panel A and Panel B are still shown together"
              tooltipPosition="top"
            />
            <TooltipCheckbox
              id="chbox-cropping"
              type="checkbox"
              label="Should be further cropped"
              name="chbox-cropping"
              className="md-cell md-cell--12 custom-input-field"
              checked={needsCropping}
              onChange={this.onChangeNeedsCropping}
              tooltipLabel="Margins are too wide"
              tooltipPosition="top"
            />
            <TooltipCheckbox
              id="chbox-overcropped"
              type="checkbox"
              label="Over-cropped"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
              checked={isOvercropped}
              onChange={this.onChangeIsOvercropped}
              tooltipLabel="Areas of the image were over-cropped"
              tooltipPosition="top"
            />
            <TooltipCheckbox
              id="chbox-overfragmented"
              type="checkbox"
              label="Over-fragmented"
              name="chbox-overfragmented"
              className="md-cell md-cell--12 custom-input-field"
              checked={isOverfragmented}
              onChange={this.onChangeIsOverfragmented}
              tooltipLabel="Pane is sub-area of sub-figure"
              tooltipPosition="top"
            />
            <TooltipCheckbox
              id="chbox-missing-subfigures"
              type="checkbox"
              label="Missing subfigures"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
              checked={isMissingSubfigures}
              onChange={this.onChangeNeedsIsMissingSubfigures}
              tooltipLabel="Parent figure is complete but there are missing subfigures"
              tooltipPosition="top"
            />
          </Cell>
          <Cell size={4}>
            <SelectField
              id="ddl-numberSubpanes"
              label={lblNoSubpanes}
              className="md-cell md-cell--12 custom-input-field"
              menuItems={NUMBER_SUBPANES}
              value={numberSubpanes}
              onChange={this.onChangeNumberSubpanes}
            />
            <TooltipCheckbox
              id="chbox-multipane"
              type="checkbox"
              label="Multipane figure"
              name="multipane"
              className="md-cell md-cell--12 custom-input-field"
              checked={this.state.multipane}
              onChange={this.onChangeMultipane}
              tooltipLabel="The figure contains multiple image panes"
              tooltipPosition="top"
            />
            {compositionRadios}
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
        <div className="md-cell md-cell--12">
          <Snackbar
            id="message-snackbar"
            toasts={toasts}
            autohide={autohide}
            onDismiss={this.dismissToast}
          />
        </div>
      </div>
    );
  }
}

SubImageModList.propTypes = {
  modalities: PropTypes.arrayOf(PropTypes.object),
  updateSubfigure: PropTypes.func,
  updateAllSubfigures: PropTypes.func,
  figure: PropTypes.object,
};

export default connect(null, { updateSubfigure, updateAllSubfigures })(
  SubImageModList
);
