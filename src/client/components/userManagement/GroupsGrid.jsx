/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-debugger */
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
import EditGroupDialog from './EditGroupDialog';

class GroupsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      dialogVisible: false,
      selectedGroupId: null,
    };

    this.createNewGroup = this.createNewGroup.bind(this);
  }

  componentDidUpdate() {
    // set the selected rows here when the parent updates
  }

  showDialogGroup = () => {
    this.setState({ dialogVisible: true });
  }

  hideEditRowDialog = () => {
    this.setState({ dialogVisible: false });
  }

  createNewGroup(name, supervisor) {
    const { create, organization } = this.props;
    debugger;
    create(name, organization, supervisor, 'group', () => {
      this.setState({ dialogVisible: false });
    });
  }

  renderGroups() {
    const { groups } = this.props;
    if (!groups) return;

    return groups.map((group) => {
      return (
        <TableRow key={group._id}>
          <TableColumn>{group.name}</TableColumn>
          <TableColumn>{group.supervisor}</TableColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { count, dialogVisible, selectedGroupId } = this.state;

    return (
      <Card tableCard>
        <TableActions
          title="Groups"
          count={count}
          onAssignClick={null}
          onEditClick={null}
          onRemoveClick={null}
          onAddClick={this.showDialogGroup}
        />
        <DataTable baseId="groups-magenement-table">
          <TableHeader>
            <TableRow>
              <TableColumn>Name</TableColumn>
              <TableColumn>Supervisor</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.renderGroups() }
          </TableBody>
        </DataTable>
        <EditGroupDialog
          onHide={this.hideEditRowDialog}
          visible={dialogVisible}
          userId={selectedGroupId}
          onSubmit={this.createNewGroup}
        />
      </Card>
    );
  }
}

GroupsGrid.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  create: PropTypes.func,
  organization: PropTypes.string,
};

export default GroupsGrid;
