import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from 'client/actions';
import PropTypes from 'prop-types';

class Signout extends Component {
  componentDidMount() {
    const { signout } = this.props;
    signout();
  }

  render() {
    return (
      <div>
        {'Sorry to see you go'}
      </div>
    );
  }
}

Signout.propTypes = {
  signout: PropTypes.func,
};

export default connect(null, { signout })(Signout);
