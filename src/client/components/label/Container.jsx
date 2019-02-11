/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'react-md';
import { fetchDocument } from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';
import DocumentTitle from 'client/components/label/Header';
import FigureList from 'client/components/label/FigureList';
import SubfigureList from 'client/components/label/SubfigureList';
import MainImage from 'client/components/label/MainImageCaption';

class LabelDocument extends Component {
  componentDidMount() {
    const { documentId, fetchDocument } = this.props;
    fetchDocument(documentId);
  }

  render() {
    const { document, figures } = this.props;
    if (!document || !figures) {
      return <div />;
    }

    const fig = figures[0];
    return (
      <div className="md-grid--no-spacing">
        <DocumentTitle name={document.name} uri={document.uri} />
        <Grid className="md-grid--no-spacing">
          <Cell size={2} className="md-grid--no-spacing">
            <FigureList />
          </Cell>
          <Cell size={3}>
            <MainImage name={fig.name} uri={fig.uri} caption={fig.caption} />
          </Cell>
          <Cell size={2}>
            <SubfigureList />
          </Cell>
        </Grid>
      </div>
    );
  }
}

LabelDocument.propTypes = {
  fetchDocument: PropTypes.func,
  documentId: PropTypes.string,
  document: PropTypes.object,
  figures: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  organization: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const props = {
    documentId: ownProps.match.params.id,
    username: null,
  };

  if (state.auth) {
    props.username = state.auth.username;
    props.organization = state.auth.organization;
  }

  if (state.labeling) {
    props.document = state.labeling.document;
    props.figures = state.labeling.figures;
    props.selectedFigure = state.labeling.selectedFigure;
    props.selectedSubfigure = state.labeling.selectedSubfigure;
  }

  return props;
}

export default connect(mapStateToProps, { fetchDocument })(requireAuth(LabelDocument, 'labelDocument'));
