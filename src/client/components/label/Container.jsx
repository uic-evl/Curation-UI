/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Cell,
  Button,
  Media,
} from 'react-md';
import { fetchDocument, fetchModalities } from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';
import DocumentTitle from 'client/components/label/Header';
import FigureList from 'client/components/label/FigureList';
import SubfigureList from 'client/components/label/SubfigureList';
import MainImage from 'client/components/label/MainImageCaption';
import SubImage from 'client/components/label/SubImage';
import { parseValuesSelectField } from 'client/containers/utils/training_form';

class LabelDocument extends Component {
  componentDidMount() {
    const { documentId, fetchDocument, fetchModalities } = this.props;
    fetchDocument(documentId);
    fetchModalities();
  }

  render() {
    const { document, figures } = this.props;
    const { modalities, modalities1 } = this.props;
    if (!document || !figures || !modalities || !modalities1) {
      return (<div />);
    }

    const { selectedFigure, selectedSubfigure } = this.props;
    return (
      <div className="md-grid--no-spacing">
        <Grid className="md-grid--no-spacing">
          <Cell size={11}>
            <DocumentTitle name={`Document: ${document.name}`} uri={document.uri} />
          </Cell>
          <Cell size={1} className="md-cell--middle">
            <Button raised primary>
              Finish Task
            </Button>
          </Cell>
        </Grid>
        <Grid className="md-grid--no-spacing">
          <Cell size={1} className="md-grid--no-spacing">
            <FigureList />
          </Cell>
          <Cell size={8} className="md-grid--no-spacing">
            <Grid className="md-grid--no-spacing">
              <Cell size={12}>
                <Grid className="md-grid--no-spacing">
                  <Cell size={4}>
                    <SubfigureList />
                  </Cell>
                  <Cell size={8}>
                    <Media aspectRatio="16-9">
                      <img
                        src="https://dummyimage.com/200x200/000/fff.png"
                        alt="random"
                      />
                    </Media>
                  </Cell>
                </Grid>
              </Cell>
              <Cell size={12}>
                <p>{selectedFigure.caption}</p>
              </Cell>
            </Grid>
          </Cell>
          <Cell size={3}>
            <SubImage
              image={selectedSubfigure}
              existsPrevious={false}
              modalities={modalities}
              modalities1={modalities1}
            />
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
  modalities: PropTypes.arrayOf(PropTypes.object),
  modalities1: PropTypes.arrayOf(PropTypes.object),
  selectedFigure: PropTypes.object,
  selectedSubfigure: PropTypes.object,
  fetchModalities: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  const props = {
    documentId: ownProps.match.params.id,
    username: null,
    modalities: null,
    modalities1: [],
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

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseValuesSelectField(modalities1);
  }

  return props;
}

export default connect(mapStateToProps, { fetchDocument, fetchModalities })(requireAuth(LabelDocument, 'labelDocument'));
