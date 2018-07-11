/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Collapse, Grid } from 'react-md';
import QuickNavLink from './quick_nav_link';

import './_footer_styles.scss';

class QuickNav extends Component {
  render() {
    const collased = true;
    const previousTo = 'something';
    const nextTo = 'other';

    return (
      <Grid component="footer" className="footer">
        <Collapse>
          <nav className="footer__quick-nav md-grid md-grid--no-spacing md-cell md-cell--12 md-cell--12-tablet">
            <QuickNavLink
              to={this.previousTo}
              titles={!this.nextTo}
              name={this.previousName}
              label="Previous"
              icon="arrow_back"
              left
            />
            <QuickNavLink
              to={this.nextTo}
              name={this.nextName}
              label="Next"
              icon="arrow_forward"
              titles
            />
          </nav>
        </Collapse>
      </Grid>
    );
  }
}

export default QuickNav;
