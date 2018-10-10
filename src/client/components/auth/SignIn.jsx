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
          required
        />
        <Field
          name="password"
          component={textInput}
          label="Enter your password"
          lineDirection="center"
          className="md-cell md-cell--12 md-cell--bottom"
          type="password"
          required
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

const email = (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return value && !regex.test(value) ? 'Invalid email address' : undefined;
};

const validate = (values) => {
  const errors = {};
  errors.email = email(values.email);

  return errors;
};

const mapStateToProps = (state) => {
  const { errorMessage } = state.auth;
  return { errorMessage };
};

export default compose(
  connect(mapStateToProps, { signin }),
  reduxForm({ form: 'signin', validate })
)(SignIn);
