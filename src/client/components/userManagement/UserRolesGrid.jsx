/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
} from 'react-md';
import TableActions from './TableActions';

export default class UserRolesGrid extends Component {
  constructor(props) {
    super(props);

    const { values } = props;
    this.state = {
      count: 0,
      selectedRows: values.map(() => false),
    };
    this.onAddUserToRole = this.onAddUserToRole.bind(this);
  }

  onRemoveFromRole() {
    console.log('remove');
  }

  onAddUserToRole(value) {
    const { onClickAdd } = this.props;
    onClickAdd(value);
  }

  handleRowToggle = (row, selected, count) => {
    let selectedRows = this.state.selectedRows.slice();
    if (row === 0) {
      selectedRows = selectedRows.map(() => selected);
    } else {
      selectedRows[row - 1] = selected;
    }

    this.setState({ selectedRows, count });
  }

  renderValues() {
    const { values } = this.props;
    if (!values) return;

    return values.map((val) => {
      return (
        <TableRow key={val}>
          <TableColumn>{val}</TableColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { count } = this.state;
    const { title, baseId, selectValues } = this.props;

    return (
      <Card tableCard>
        <TableActions
          title={title}
          count={count}
          onAddClick={this.onAddUserToRole}
          onRemoveClick={this.onRemoveFromRole}
          onEditClick={null}
          selectValues={selectValues}
        />
        <DataTable baseId={baseId} onRowToggle={this.handleRowToggle}>
          <TableHeader>
            <TableRow>
              <TableColumn>Name</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.renderValues() }
          </TableBody>
        </DataTable>
      </Card>
    );
  }
}

UserRolesGrid.propTypes = {
  selectValues: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  baseId: PropTypes.string.isRequired,
  onClickAdd: PropTypes.func,
};
