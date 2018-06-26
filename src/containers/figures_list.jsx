/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Media,
  Card,
  CardTitle,
  CardText,
  Button,
  CardActions,
} from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFigure } from 'actions/index';

class FiguresList extends Component {
  renderList() {
    const styleCard = {
      marginBottom: '5px',
    };

    const { figures, selectFigure } = this.props;

    return figures.map((figure) => {
      const imageUrl = `/dist/images/${figure.path}`;

      return (
        <Card className="md-cell md-cell--12 md-cell--12-tablet" key={figure.id} style={styleCard}>
          <CardTitle title={figure.title} />
          <Media>
            <img src={imageUrl} alt="random" />
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
      height: '85vh',
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
  if (!state.selectedDocumentData) {
    return {
      figures: [],
    };
  }

  return {
    figures: state.selectedDocumentData.figures,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFigure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiguresList);
