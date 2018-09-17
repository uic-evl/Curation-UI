/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SignButtons extends Component {
  renderLinks() {
    const { authenticated, username } = this.props;

    if (authenticated) {
      return (
        <div>
          <span>Welcome! {username}</span>
          <Link to="/signout">Sign Out</Link>
        </div>
      );
    }

    return (
      <div>
        <Link to="/signin">Sign In</Link>
      </div>
    );
  }

  render() {
    return (
      <div> {this.renderLinks()} </div>
    );
  }
}

SignButtons.propTypes = {
  authenticated: PropTypes.string,
  username: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
  };
}

export default connect(mapStateToProps)(SignButtons);
