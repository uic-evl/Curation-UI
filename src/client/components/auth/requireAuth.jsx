/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent, componentName) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth, access, history } = this.props;
      if (!auth) {
        history.push('/signin');
      }
      if (access.indexOf(componentName) === -1) {
        history.push('/signout');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
      access: state.auth.access,
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
