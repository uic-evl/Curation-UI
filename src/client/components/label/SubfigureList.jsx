/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectSubfigureX } from "client/actions";
import { List, ListItem, Subheader } from "react-md";

class SubfigureList extends Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow(figure) {
    const { selectSubfigureX } = this.props;
    selectSubfigureX(figure);
  }

  isActive(figureToShow) {
    const { selectedFigure } = this.props;

    if (selectedFigure) {
      if (selectedFigure._id === figureToShow._id) {
        return true;
      }
    }
    return false;
  }

  renderFigures() {
    const { figures } = this.props;
    return figures.map((figure) => {
      let state = "Reviewed";
      if (figure.state === "To Review") {
        state = "Unreviewed";
      } else if (figure.state === "Skipped") {
        state = "Skipped";
      }

      return (
        <ListItem
          key={figure.name}
          primaryText={`${figure.name} (${state})`}
          className="subfigure-item"
          activeBoxClassName="md-list-tile--active"
          active={this.isActive(figure)}
          onClick={() => this.onClickRow(figure)}
        />
      );
    });
  }

  render() {
    return (
      <List className="subfigure-list md-cell--12">
        <Subheader primaryText="Subfigures" className="subfigure-item" />
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
    figures: props.labeling.selectedFigure.subfigures,
    selectedFigure: props.labeling.selectedSubfigure,
  };
}

export default connect(mapStateToProps, { selectSubfigureX })(SubfigureList);
