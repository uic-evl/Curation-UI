import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-md';

const DocumentTitle = (props) => {
  const { name, uri } = props;
  return (
    <div className="md-grid md-grid--no-spacing figure-header">
      <Toolbar
        themed
        className="md-cell--12"
        title={<a href={uri}>{name}</a>}
      />
    </div>
  );
};

DocumentTitle.propTypes = {
  name: PropTypes.string,
  uri: PropTypes.string,
};

export default DocumentTitle;
