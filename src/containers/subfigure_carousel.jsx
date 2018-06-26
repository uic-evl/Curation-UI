/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { Grid, Cell } from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSubfigure } from 'actions/index';

class SubfigureCarrousel extends Component {
  renderList() {
    const style = {
      'height': '60px',
      'width': '100%',
    };

    const { subfigures, selectSubfigure } = this.props;

    if (!subfigures) {
      return (<Cell />);
    }

    return subfigures.map((subfigure) => {
      const url = `/dist/images/subfigures/${subfigure.id}`;
      return (
        <Cell size={2}>
          <img
            src={url}
            style={style}
            onClick={() => selectSubfigure(subfigure)}
            alt="temp"
          />
        </Cell>
      );
    });
  }

  render() {
    return (
      <div>
        <Grid>
          {this.renderList()}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.subfiguresData) {
    return { subfigures: [] };
  }

  return {
    subfigures: state.subfiguresData.subfigures,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectSubfigure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubfigureCarrousel);
