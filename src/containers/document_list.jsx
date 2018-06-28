/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
  List,
  ListItem,
  Subheader,
  FontIcon,
  Avatar,
} from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDocument } from 'actions/index';

class DocumentList extends Component {
  renderList() {
    const { documents, selectDocument, selectedDocument } = this.props;

    return documents.map((document) => {
      let active = false;
      if (selectedDocument.id === document.id) {
        active = true;
      }

      return (
        <ListItem
          key={document.id}
          leftAvatar={<Avatar suffix="blue" icon={<FontIcon>insert_drive_file</FontIcon>} />}
          primaryText={document.title}
          active={active}
          onClick={() => selectDocument(document)}
        />
      );
    });
  }

  render() {
    const listStyle = {
      'height': '85vh',
      'overflow': 'scroll',
    };

    return (
      <div style={listStyle}>
        <List>
          <Subheader primaryText="Documents" />
          {this.renderList()}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    documents: [],
    selectedDocument: {
      id: '-1',
    },
  };


  if (state.selectedElement) {
    props.documents = state.selectedElement.documents;
  }

  if (state.selectedDocumentData) {
    props.selectedDocument = state.selectedDocumentData.document;
  }

  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
