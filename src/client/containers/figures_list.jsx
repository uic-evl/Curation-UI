/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
  Media,
  Card,
  CardText,
  Button,
  CardActions,
} from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFigure } from 'client/actions/index';

class FiguresList extends Component {
  applyStyle(figureToShow) {
    const { figure } = this.props;

    if (figure) {
      if (figure.id === figureToShow.id) {
        return 'selected';
      }
    }
    return '';
  }

  renderList() {
    const styleCard = {
      marginBottom: '5px',
    };

    const { figures, selectFigure } = this.props;

    return figures.map((figure) => {
      const imageUrl = `/images/${figure.path}`;

      return (
        <Card className="md-cell md-cell--12 md-cell--12-tablet" key={figure.id} style={styleCard}>
          <Media aspectRatio="1-1">
            <img src={imageUrl} alt="random" className={this.applyStyle(figure)} />
          </Media>
          <CardActions expander>
            <Button flat onClick={() => selectFigure(figure)}>
              Select
            </Button>
          </CardActions>
          <CardText expandable>
            <p>
              { figure.caption }
            </p>
          </CardText>
        </Card>
      );
    });
  }

  render() {
    const styleTest = {
      height: '77vh',
      overflow: 'scroll',
    };

    return (
      <div className="md-grid md-grid--no-spacing" style={styleTest}>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    figures: [],
    figure: null,
  };

  if (state.selectedDocumentData) {
    props.figures = state.selectedDocumentData.figures;
  }

  if (state.selectedFigureData) {
    props.figure = state.selectedFigureData.figure;
  }

  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFigure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiguresList);
