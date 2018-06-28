/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
  Grid,
  Cell,
  SelectField,
  TextField,
  Paper,
  Divider,
  Button,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  TablePagination,
} from 'react-md';
import { connect } from 'react-redux';

import SubfigureCarrousel from './subfigure_carousel';

class SubfigureDetails2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      rowsPerPage: 1,
    };
  }

  handlePagination = (start, rowsPerPage) => {
    this.setState({
      start,
      rowsPerPage,
    });
  }

  renderTextualContextRow(textualContext) {
    const { start, rowsPerPage } = this.state;
    return textualContext.slice(start, start + rowsPerPage).map((context, index) => {
      return (
        <TableRow key={index}>
          <TableColumn>{context}</TableColumn>
        </TableRow>
      );
    });
  }

  render() {
    const style = {
      'height': '300px',
      'width': '100%',
    };

    const {
      subfigure,
      modalities,
      textualContext,
    } = this.props;

    return (
      <div>
        <SubfigureCarrousel />

        <Paper zDepth={5}>
          <Grid>
            <Cell size={5}>
              <div>
                <img
                  src={`/dist/images/subfigures/${subfigure.id}`}
                  alt="random"
                  style={style}
                />
              </div>
              <div>
                <p>
                  {subfigure.caption}
                </p>
              </div>
            </Cell>
            <Cell size={4}>
              <DataTable plain selectable="false" baseId="TextualContextTable">
                <TableHeader>
                  <TableRow>
                    <TableColumn>Textual Context</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {this.renderTextualContextRow(textualContext)}
                </TableBody>
                <TablePagination rows={textualContext.length} defaultRowsPerPage={1} rowsPerPage={1} rowsPerPageLabel="Rows" rowsPerPageItems={[1]} onPagination={this.handlePagination} />
              </DataTable>
            </Cell>
            <Cell size={3}>
              <SelectField
                id="modality-select-field"
                label="Modality"
                className="md-cell"
                menuItems={modalities}
              />
              <TextField
                id="subfigure_comments"
                label="Comments"
                rows={4}
                maxRows={4}
                className="md-cell md-cell--12"
              />
              <Button flat primary swapTheming>Save</Button>
            </Cell>
          </Grid>
          <Divider />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.selectedFigureData) {
    return {
      figure: {
        textualContext: [],
      },
      subfigure: {
        id: 'sample.png',
      },
      modalities: state.modalities,
      textualContext: [],
    };
  }

  return {
    figure: state.selectedFigureData.figure,
    textualContext: state.selectedFigureData.figure.textual_context,
    subfigure: state.selectedFigureData.selectedSubfigure,
    modalities: state.modalities,
  };
}

export default connect(mapStateToProps, null)(SubfigureDetails2);
