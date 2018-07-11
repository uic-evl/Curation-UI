/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Grid, Cell } from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSubfigure } from 'client/actions/index';

class SubfigureCarrousel extends Component {
  applyStyle(subfigure) {
    const { selectedSubfigure } = this.props;

    if (selectedSubfigure.id === subfigure.id) {
      return 'carousel selected';
    }
    return 'carousel';
  }

  renderList() {
    const { subfigures, selectSubfigure } = this.props;

    if (!subfigures || subfigures.length === 0) {
      const emptyCarrouselImage = '/dist/images/empty_carrousel.png';
      const arr = Array.from(Array(12).keys());
      return arr.map((elem) => {
        return (
          <Cell size={1} key={elem}>
            <img src={emptyCarrouselImage} className="carousel" alt="empty" />
          </Cell>
        );
      });
    }

    return subfigures.map((subfigure) => {
      const url = `/dist/images/subfigures/${subfigure.id}`;
      return (
        <Cell size={1} key={subfigure.id}>
          <img
            src={url}
            className={this.applyStyle(subfigure)}
            onClick={() => selectSubfigure(subfigure)}
            alt="temp"
          />
        </Cell>
      );
    });
  }

  render() {
    return (
      <div className="carousel">
        <Grid>
          {this.renderList()}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.selectedFigureData) {
    return { subfigures: [] };
  }

  return {
    subfigures: state.selectedFigureData.subfigures,
    selectedSubfigure: state.selectedFigureData.selectedSubfigure,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectSubfigure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubfigureCarrousel);
