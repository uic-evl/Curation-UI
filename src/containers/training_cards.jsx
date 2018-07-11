/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Media,
  CardActions,
  Button,
  CardText,
  CardTitle,
} from 'react-md';

class TrainingCards extends Component {
  renderCards() {
    const { images } = this.props;

    if (!images) {
      return <div />;
    }

    return images.map((image) => {
      const url = `/dist/images/Microscopy/${image.name}`;
      return (
        <Card className="cards__example md-cell md-cell--3 md-cell--3-tablet" key={image.name}>
          <CardTitle
            title={image.name}
            subtitle={image.modality}
          />
          <Media>
            <img src={url} alt="" />
          </Media>
          <CardActions>
            <Button flat>
              Electron
            </Button>
            <Button flat>
              Light
            </Button>
            <Button flat>
              Fluorescence
            </Button>
          </CardActions>
          <CardText>
            <p>
              {image.observations}
            </p>
          </CardText>
        </Card>
      );
    });
  }

  render() {
    return (
      <div className="md-grid">
        {this.renderCards()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    images: state.microscopyImages,
  };

  return props;
}

export default connect(mapStateToProps)(TrainingCards);
