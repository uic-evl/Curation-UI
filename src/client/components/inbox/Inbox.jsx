/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */

import React, { Component } from 'react';
import prettyDate from 'pretty-date';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTasks } from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
  }

  componentDidMount() {
    const { fetchTasks, username } = this.props;
    if (username) {
      fetchTasks(username);
    }
  }

  onClickRow(task) {
    const { history } = this.props;
    history.push(`${task.url}/${task._id}`);
  }

  renderTasks() {
    const { tasks } = this.props;

    if (!tasks) return;

    return tasks.map((task) => {
      return (
        <TableRow key={task._id} onClick={() => this.onClickRow(task)}>
          <TableColumn>{task.type}</TableColumn>
          <TableColumn>{prettyDate.format(new Date(task.creationDate))}</TableColumn>
          <TableColumn>{task.status}</TableColumn>
          <TableColumn />
          <TableColumn />
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Type</TableColumn>
              <TableColumn>Creation Date</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Start Date</TableColumn>
              <TableColumn>End Date</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.renderTasks() }
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

Inbox.propTypes = {
  fetchTasks: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  const props = {
    username: null,
    tasks: null,
  };

  if (state.auth) {
    props.username = state.auth.username;
  }

  if (state.tasks) {
    props.tasks = state.tasks;
  }

  return props;
}

export default connect(mapStateToProps, { fetchTasks })(requireAuth(Inbox, 'inbox'));
