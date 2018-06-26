/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
import _ from 'lodash';
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
    const { documents, selectDocument } = this.props;
    return documents.map((document) => {
      return (
        <ListItem
          key={document.id}
          leftAvatar={<Avatar suffix="blue" icon={<FontIcon>insert_drive_file</FontIcon>} />}
          primaryText={document.title}
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
  if (!state.selectedElement) {
    return { documents: [] };
  }

  return {
    documents: _.filter(state.documents, { 'pid': `${state.selectedElement.id}` }),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
