/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  FontIcon,
  Avatar,
  Subheader,
} from 'react-md';

class SubfigureList extends Component {
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
          leftAvatar={<Avatar icon={<FontIcon error>image</FontIcon>} />}
          primaryText={figure.name}
          secondaryText={figure.subfigures.length}
          className={this.applyStyle(figure)}
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
};

function mapStateToProps(props) {
  return {
    'figures': props.labeling.selectedFigure.subfigures,
    'selectedFigure': props.labeling.selectedSubfigure,
  };
}

export default connect(mapStateToProps, null)(SubfigureList);
