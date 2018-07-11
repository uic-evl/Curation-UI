/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { List, ListItem, Subheader } from 'react-md';
import { connect } from 'react-redux';

class MicroscopyImagesList extends Component {
  renderList() {
    const { images } = this.props;

    if (!images) {
      return <div />;
    }

    return images.map((image) => {
      return (
        <ListItem
          key={image.name}
          primaryText={image.name}
        />
      );
    });
  }

  render() {
    const listStyle = {
      'height': '70vh',
      'overflow': 'scroll',
    };

    return (
      <div style={listStyle}>
        <List>
          <Subheader primaryText="To Classify" />
          {this.renderList()}
        </List>
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

export default connect(mapStateToProps, null)(MicroscopyImagesList);
