/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  Button,
  DialogContainer,
  Toolbar,
  TextField,
} from 'react-md';
import UserForm from './UserForm';

export default class EditUserDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = { email: '', username: '' };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && this.props.visible !== nextProps.visible) {
      // this.setState({ count: 1 });
    }
  }

  onChangeEmail(value) {
    this.setState({ email: value });
  }

  onChangeUsername(value) {
    this.setState({ username: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, username } = this.state;
    const { onSubmit } = this.props;
    const organization = 'uic'; // TODO: update this from parent selection

    onSubmit(email, organization, username);
  }

  renderUserInformation() {
    const { email, username } = this.state;

    return (
      <div>
        <TextField
          id="user_email"
          name="email"
          label="Email"
          className="md-cell md-cell--bottom"
          value={email}
          onChange={this.onChangeEmail}
          required
        />
        <TextField
          id="username"
          name="username"
          label="Username"
          className="md-cell md-cell--bottom"
          value={username}
          onChange={this.onChangeUsername}
          required
        />
      </div>
    );
  }

  render() {
    const { visible, onHide, userId } = this.props;

    return (
      <DialogContainer
        id="edit-user-dialog"
        aria-labelledby="edit-user-dialog-title"
        visible={visible}
        onHide={onHide}
        fullPage
      >
        <CSSTransitionGroup
          id="edit-user-form"
          component="form"
          onSubmit={this.handleSubmit}
          className="md-text-container md-toolbar--relative"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <Toolbar
            nav={<Button icon onClick={onHide}>arrow_back</Button>}
            title="Edit User Info"
            titleId="edit-user-dialog-title"
            fixed
            colored
            actions={<Button type="submit" flat>Submit</Button>}
          />
          <div>
            <h2>TEMPORAL_TEXT</h2>
          </div>
          {this.renderUserInformation()}
          <UserForm key={0} index={0} userId={userId} />
        </CSSTransitionGroup>
      </DialogContainer>
    );
  }
}
