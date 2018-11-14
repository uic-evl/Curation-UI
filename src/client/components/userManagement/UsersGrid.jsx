/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableColumn,
  DataTable,
  TableHeader,
  TableBody,
  Card,
} from 'react-md';
import TableActions from './TableActions';
import EditUserDialog from './EditUserDialog';

class UsersGrid extends Component {
  constructor(props) {
    super(props);

    const { users } = props;
    this.state = {
      count: 0,
      selectedRows: users.map(() => false),
      dialogVisible: false,
      selectedUserId: null,
    };

    this.createOrEditUser = this.createOrEditUser.bind(this);
  }

  handleRowToggle = (row, selected, count) => {
    let selectedRows = this.state.selectedRows.slice();
    if (row === 0) {
      selectedRows = selectedRows.map(() => selected);
    } else {
      selectedRows[row - 1] = selected;
    }

    let selectedUserId = null;
    if (count === 1) {
      const { users } = this.props;
      selectedUserId = users[row - 1]._id;
    }

    this.setState({ selectedRows, count, selectedUserId });
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  hideEditRowDialog = () => {
    this.setState({ dialogVisible: false });
  }

  addUser() {
    // selectedUserId is null when none of the rows is selected
    this.setState({ dialogVisible: true });
  }

  createOrEditUser(email, organization, username) {
    const { create } = this.props; // get organization from here? TODO
    debugger;
    create(email, organization, username);
  }

  renderUsers() {
    const { users } = this.props;
    if (!users) return;

    return users.map((user) => {
      return (
        <TableRow key={user._id}>
          <TableColumn>{user.username}</TableColumn>
          <TableColumn>{user.email}</TableColumn>
          <TableColumn>{user.roles.toString()}</TableColumn>
          <TableColumn>{user.status}</TableColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { count, dialogVisible, selectedUserId } = this.state;
    return (
      <div>
        <Card tableCard>
          <TableActions
            title="Users"
            count={count}
            onAssignClick={null}
            onEditClick={this.showDialog}
            onRemoveClick={this.reset}
            onAddClick={this.showDialog}
          />
          <DataTable baseId="users-magenement-table" onRowToggle={this.handleRowToggle}>
            <TableHeader>
              <TableRow>
                <TableColumn>Username</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Roles</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { this.renderUsers() }
            </TableBody>
          </DataTable>
          <EditUserDialog
            onHide={this.hideEditRowDialog}
            visible={dialogVisible}
            userId={selectedUserId}
            onSubmit={this.createOrEditUser}
          />
        </Card>
      </div>
    );
  }
}

UsersGrid.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  create: PropTypes.func,
};

export default UsersGrid;
