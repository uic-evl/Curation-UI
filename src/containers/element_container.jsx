/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';

import FigureList from 'containers/figures_list';
import SubFigureDetails2 from 'containers/subfigure_details_2';
import DocumentTitle from 'containers/document_title';
import DocumentList from 'containers/document_list';
import SimilarImagesList from 'components/similar_images_list';

import { fetchElement } from 'actions';

class ElementContainer extends Component {
  componentDidMount() {
    const { match, fetchElement } = this.props;
    fetchElement(match.params.id);
  }

  render() {
    return (
      <Grid>
        <Cell size={2}>
          <DocumentList />
        </Cell>
        <Cell size={10}>
          <DocumentTitle />
          <Grid>
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
  return {
    id: ownProps.match.params.id,
  };
}

export default connect(mapStateToProps, { fetchElement })(ElementContainer);
