/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyUser } from 'client/actions';

class Verify extends Component {
  componentDidMount() {
    const { verifyUser, token, history } = this.props;

    verifyUser(token, (id) => {
      console.log(`navigate to update password with id ${id}`);
      history.push(`/updatePassword/${id}`);
    });
  }

  render() {
    return (
      <div>Verifyng...</div>
    );
  }
}

Verify.propTypes = {
  verifyUser: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const props = {
    token: ownProps.match.params.token,
  };

  return props;
}

export default connect(mapStateToProps, { verifyUser })(Verify);
