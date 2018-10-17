/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  Button,
  DialogContainer,
  Toolbar,
  TextField,
  SelectField,
} from 'react-md';

export default class EditGroupDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', supervisor: '' };
    this.onChangeSupervisor = this.onChangeSupervisor.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeSupervisor(value) {
    this.setState({ supervisor: value });
  }

  onChangeName(value) {
    this.setState({ name: value });
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    const { name, supervisor } = this.state;

    onSubmit(name, supervisor);
  }

  render() {
    const { visible, onHide, groupId } = this.props;
    const title = (groupId) ? 'Edit Group' : 'Create Group';
    const { name } = this.state;

    return (
      <DialogContainer
        id="edit-group-dialog"
        aria-labelledby="edit-group-dialog-title"
        visible={visible}
        onHide={onHide}
        fullPage
      >
        <CSSTransitionGroup
          id="edit-group-form"
          component="form"
          onSubmit={this.handleSubmit}
          className="md-text-container md-toolbar--relative"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <Toolbar
            nav={<Button icon onClick={onHide}>arrow_back</Button>}
            title={title}
            titleId="edit-user-dialog-title"
            fixed
            colored
            actions={<Button type="submit" flat>Submit</Button>}
          />
          <h1>Temporal</h1>
          <h1>Temporal</h1>
          <TextField
            id="group_name"
            name="name"
            label="Group Name"
            className="md-cell md-cell--bottom"
            value={name}
            onChange={this.onChangeName}
            required
          />
          <SelectField
            id="group_supervisor"
            name="supervisor"
            label="Supervisor"
            placeholder="Supervisor Name"
            className="md-cell"
            onChange={this.onChangeSupervisor}
          />
        </CSSTransitionGroup>
      </DialogContainer>
    );
  }
}
