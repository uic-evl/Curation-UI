/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const MainImage = (props) => {
  const { name, uri, caption } = props;
  return (
    <div className="md-grid md-grid--no-spacing">
      <div className="md-cell md-cell--12">{name}</div>
      <div>
        <img
          src="https://dummyimage.com/200x200/000/fff.png"
          alt="random"
        />
      </div>
      <div>
        <p>{caption}</p>
      </div>
    </div>
  );
};

MainImage.propTypes = {
  name: PropTypes.string,
  uri: PropTypes.string,
  caption: PropTypes.string,
};

export default MainImage;
