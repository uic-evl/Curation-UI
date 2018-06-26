/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-assignment */
/* eslint-disable prefer-template */
import React from 'react';
import { FontIcon } from 'react-md';
// import { Link } from 'react-router-dom';
// https://github.com/mlaursen/react-md/blob/master/docs/src/components/App/Footer/QuickNav.jsx

const QuickNavLink = ({ to, className, label, icon, name, left, titles, ...props }) => {
  let navTitles;

  if (titles) {
    navTitles = (
      <div className='footer__link-label'>
        <h4 className="md-headline">{label}</h4>
        <h6 className="md-subheading-2">{name}</h6>
      </div>
    );
  }

  const fi = <FontIcon>{icon}</FontIcon>;
  let linkClassName = 'footer__link';
  console.log(left);
  if (!left || left === undefined) {
    linkClassName = linkClassName + ' md-cell--right';
  }

  return (
    <a className={linkClassName}>
      {left && fi}
      {navTitles}
      {!left && fi}
    </a>
  );
};

export default QuickNavLink;
