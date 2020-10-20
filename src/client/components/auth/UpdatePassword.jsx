/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Button, Snackbar } from "react-md";
import { updatePassword } from "client/actions";
import textInput from "client/components/form/textInput";

class UpdatePassword extends Component {
  state = { toasts: [], autohide: true, errorText: "" };

  onSubmit = (formProps) => {
    const { updatePassword, id } = this.props;

    updatePassword(id, formProps.password, (message) => {
      this.toastSubmit(message);
    });
  };

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  toastSubmit = (message) => {
    this.addToast(message);
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;
    const { toasts, autohide, errorText } = this.state;

    return (
      <form className="md-grid" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          id="password"
          name="password"
          component={textInput}
          label="Enter your password"
          lineDirection="center"
          className="md-cell md-cell--12 md-cell--bottom"
          type="password"
          required
        />
        <Field
          id="passwordConfirmation"
          name="passwordConfirmation"
          component={textInput}
          label="Confirm your password"
          lineDirection="center"
          className="md-cell md-cell--12 md-cell--bottom"
          type="password"
          required
          errorText={errorText}
        />
        <div>{errorMessage}</div>
        <Button flat primary type="submit" className="md-cell--right">
          `&apos;`Update Password`&apos;`
        </Button>
        <Snackbar
          id="message-snackbar"
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />
      </form>
    );
  }
}

function isValid(val) {
  if (val === undefined) {
    return val;
  }
  if (val.length === 0) {
    return "Required";
  }
  if (val.length < 5) {
    return "Minimum password length is 5 characters";
  }
  return undefined;
}

function validate(values) {
  if (!values.password && !values.passwordConfirmation) {
    return {};
  }

  const errors = {};
  // Check required validation
  errors.password = isValid(values.password);
  errors.passwordConfirmation = isValid(values.passwordConfirmation);

  if (!errors.password && !errors.passwordConfirmation) {
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords should have the same value";
    }
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  const props = {
    id: ownProps.match.params.id,
    errorMessage: "",
  };

  return props;
}

UpdatePassword.propTypes = {
  updatePassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
};

export default compose(
  connect(mapStateToProps, { updatePassword }),
  reduxForm({ form: "updatepwd", validate })
)(UpdatePassword);
