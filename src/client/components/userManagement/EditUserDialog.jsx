/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, DialogContainer, Toolbar } from 'react-md';
import UserForm from './UserForm';

export default class EditUserDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && this.props.visible !== nextProps.visible) {
      // this.setState({ count: 1 });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.addDesserts(e);
  };

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
          <UserForm key={0} index={0} userId={userId} />
        </CSSTransitionGroup>
      </DialogContainer>
    );
  }
}
