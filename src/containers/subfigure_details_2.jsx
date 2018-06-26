/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Grid,
  Cell,
  SelectField,
  TextField,
  Paper,
  Divider,
} from 'react-md';
import { connect } from 'react-redux';

import SubfigureCarrousel from './subfigure_carousel';

class SubfigureDetails2 extends Component {
  render() {
    const style = {
      'height': '100%',
      'width': '100%',
    };

    const { subfigure, modalities } = this.props;
    return (
      <div>
        <SubfigureCarrousel />

        <Paper zDepth="5">
          <div>
            <h3>
              {subfigure.title}
            </h3>
            <span>
              1/3
            </span>
          </div>
          <Grid>
            <Cell size={6}>
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
            <Cell size={6}>
              <div>
                <h4>
                  Textual Context
                </h4>
                <p />
              </div>
            </Cell>
          </Grid>
          <Divider />
          <div>
            <SelectField
              id="modality-select-field"
              label="Modality"
              className="md-cell"
              menuItems={modalities}
            />
            <TextField
              id="subfigure_comments"
              label="Comments"
              rows={3}
              maxRows={6}
              className="md-cell md-cell--12"
            />
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.subfiguresData) {
    return {
      subfigure: {
        id: 'sample.png',
      },
      modalities: state.modalities,
    };
  }

  return {
    subfigure: state.subfiguresData.selectedSubfigure,
    modalities: state.modalities,
  };
}

export default connect(mapStateToProps, null)(SubfigureDetails2);
