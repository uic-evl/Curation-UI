/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TableCardHeader, SelectField } from 'react-md';
import FlatOrIconButton from './FlatOrIconButton';

class TableActions extends Component {
  constructor(props) {
    super(props);
    this.state = { role: '' };
    this.onChangeRoleSelected = this.onChangeRoleSelected.bind(this);
    this.onAddRole = this.onAddRole.bind(this);
  }

  onAddRole() {
    const { onAssignClick } = this.props;
    const { role } = this.state;
    onAssignClick(role);
  }

  onChangeRoleSelected(value) {
    this.setState({ role: value });
  }

  renderAssignMenu(onAssignClick) {
    const { role } = this.state;
    const { selectValues } = this.props;

    if (!onAssignClick) return;
    return (
      <span>
        <SelectField
          id="select-add-1"
          placeholder="Assign user to role"
          menuItems={selectValues}
          value={role}
          onChange={this.onChangeRoleSelected}
          required
        />
        <FlatOrIconButton onClick={this.onAddRole} disabled={role === ''}>Assign</FlatOrIconButton>
      </span>
    );
  }

  renderAddButton(onAddClick) {
    if (!onAddClick) return;
    return (
      <FlatOrIconButton onClick={onAddClick}>Add</FlatOrIconButton>
    );
  }

  render() {
    const { title, count } = this.props;
    const { onAssignClick, onEditClick } = this.props;
    const { onAddClick, onRemoveClick } = this.props;

    const actionEdit = (
      <Button
        icon
        key="edit"
        onClick={onEditClick}
        tooltipLabel="Edit user information"
        tooltipDelay={300}
        disabled={count > 1}
      >
        edit
      </Button>
    );

    const actionDelete = (
      <Button
        icon
        key="delete"
        onClick={onRemoveClick}
        tooltipLabel="Remove selected rows"
        tooltipDelay={300}
        tooltipPosition="left"
      >
        delete
      </Button>
    );

    const actions = [];
    if (onEditClick !== null) {
      actions.push(actionEdit);
    }
    if (onRemoveClick !== null) {
      actions.push(actionDelete);
    }

    return (
      <TableCardHeader
        title={title}
        visible={count > 0}
        contextualTitle={`${count} item${count > 1 ? 's' : ''} selected`}
        actions={actions}
      >
        {this.renderAddButton(onAddClick)}
        {this.renderAssignMenu(onAssignClick)}
      </TableCardHeader>
    );
  }
}

/*
const TableActions = (
  {
    title,
    count,
    onAssignClick,
    onEditClick,
    onRemoveClick,
  }
) => {
  const actionEdit = (
    <Button
      icon
      key="edit"
      onClick={onEditClick}
      tooltipLabel="Edit user information"
      tooltipDelay={300}
      disabled={count > 1}
    >
      edit
    </Button>
  );

  const actionDelete = (
    <Button
      icon
      key="delete"
      onClick={onRemoveClick}
      tooltipLabel="Remove selected rows"
      tooltipDelay={300}
      tooltipPosition="left"
    >
      delete
    </Button>
  );

  const actions = [];
  if (onEditClick !== null) {
    actions.push(actionEdit);
  }
  if (onRemoveClick !== null) {
    actions.push(actionDelete);
  }

  const renderAddMenu = (onAssignClick) => {
    if (!onAssignClick) return;
    return (
      <span>
        <SelectField
          id="select-add-1"
          placeholder="Assign user to role"
          menuItems={['curator', 'lead', 'admin']}
          required
        />
        <FlatOrIconButton onClick={onAssignClick}>Add</FlatOrIconButton>
      </span>
    );
  };

  return (
    <TableCardHeader
      title={title}
      visible={count > 0}
      contextualTitle={`${count} item${count > 1 ? 's' : ''} selected`}
      actions={actions}
    >
      {renderAddMenu(onAssignClick)}
    </TableCardHeader>
  );
};
*/

TableActions.propTypes = {
  selectValues: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onAssignClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onAddClick: PropTypes.func,
};

export default TableActions;
