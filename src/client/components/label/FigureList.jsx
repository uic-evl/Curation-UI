/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFigureX } from 'client/actions';
import {
  List,
  ListItem,
  FontIcon,
  Avatar,
  Subheader,
} from 'react-md';

class FigureList extends Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow(figure) {
    const { selectFigureX } = this.props;
    selectFigureX(figure);
  }

  applyStyle(figureToShow) {
    const { selectedFigure } = this.props;

    if (selectedFigure) {
      if (selectedFigure._id === figureToShow._id) {
        return 'selected';
      }
    }
    return '';
  }

  renderFigures() {
    const { figures } = this.props;
    return figures.map((figure) => {
      return (
        <ListItem
          key={figure.name}
          primaryText={`Fig. ${figure.name}`}
          secondaryText={figure.state}
          className={this.applyStyle(figure)}
          onClick={() => this.onClickRow(figure)}
        />
      );
    });
  }

  render() {
    return (
      <List className="md-paper">
        <Subheader primaryText="Figures" />
        {this.renderFigures()}
      </List>
    );
  }
}

FigureList.propTypes = {
  figures: PropTypes.arrayOf(PropTypes.object),
  selectedFigure: PropTypes.object,
  selectFigureX: PropTypes.func,
};

function mapStateToProps(props) {
  return {
    'figures': props.labeling.figures,
    'selectedFigure': props.labeling.selectedFigure,
  };
}

export default connect(mapStateToProps, { selectFigureX })(FigureList);
