/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';

import FigureList from 'containers/figures_list';
import SubFigureDetails2 from 'containers/subfigure_details_2';
import DocumentTitle from 'containers/document_title';
import DocumentList from 'containers/document_list';
import SimilarImagesList from 'components/similar_images_list';
import ElementTitle from 'components/element_title';

import { fetchElement } from 'actions';

class ElementContainer extends Component {
  componentDidMount() {
    const { match, fetchElement } = this.props;
    fetchElement(match.params.id);
  }

  render() {
    const { element } = this.props;

    return (
      <Grid className="md-grid--no-spacing">
        <Cell size={2} className="md-grid--no-spacing">
          {ElementTitle(element)}
          <DocumentList />
        </Cell>
        <Cell size={10} className="md-grid--no-spacing">
          <DocumentTitle />
          <Grid className="md-grid--no-spacing">
            <Cell size={2}>
              <FigureList />
            </Cell>
            <Cell size={9}>
              <SubFigureDetails2 />
            </Cell>
            <Cell size={1}>
              <SimilarImagesList />
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const props = {
    id: ownProps.match.params.id,
    element: null,
  };

  if (state.selectedElement) {
    props.element = state.selectedElement.element;
  }

  return props;
}

export default connect(mapStateToProps, { fetchElement })(ElementContainer);
