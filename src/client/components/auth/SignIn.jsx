import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

import { signin } from 'client/actions';
import textInput from 'client/components/form/textInput';

class SignIn extends Component {
  onSubmit = (formProps) => {
    const { signin, history } = this.props;

    signin(formProps, () => {
      // history.push('/training/0');
      history.push('/inbox');
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <form className="md-grid" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="email"
          component={textInput}
          label="Email"
          lineDirection="center"
          placeholder="Email"
          className="md-cell md-cell--12 md-cell--bottom"
          type="text"
        />
        <Field
          name="password"
          component={textInput}
          label="Enter your password"
          lineDirection="center"
          className="md-cell md-cell--12 md-cell--bottom"
          type="password"
        />
        <div>
          {errorMessage}
        </div>
        <Button flat primary type="submit" className="md-cell--right">
          {'Sign In'}
        </Button>
      </form>
    );
  }
}

SignIn.propTypes = {
  signin: PropTypes.func,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, { signin }),
  reduxForm({ form: 'signin' })
)(SignIn);
