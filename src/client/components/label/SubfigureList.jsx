/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubfigureX } from 'client/actions';
import {
  List,
  ListItem,
  Subheader,
} from 'react-md';

class SubfigureList extends Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow(figure) {
    const { selectSubfigureX } = this.props;
    selectSubfigureX(figure);
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
          primaryText={figure.name}
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
        <Subheader primaryText="Subfigures" />
        {this.renderFigures()}
      </List>
    );
  }
}

SubfigureList.propTypes = {
  figures: PropTypes.arrayOf(PropTypes.object),
  selectedFigure: PropTypes.object,
  selectSubfigureX: PropTypes.func,
};

function mapStateToProps(props) {
  return {
    'figures': props.labeling.selectedFigure.subfigures,
    'selectedFigure': props.labeling.selectedSubfigure,
  };
}

export default connect(mapStateToProps, { selectSubfigureX })(SubfigureList);
