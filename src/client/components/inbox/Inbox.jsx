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
  Toolbar,
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
      let startDate = '';
      let endDate = '';
      if (task.startDate) {
        startDate = prettyDate.format(new Date(task.startDate));
      }
      if (task.endDate) {
        endDate = prettyDate.format(new Date(task.endDate));
      }

      return (
        <TableRow key={task._id} onClick={() => this.onClickRow(task)}>
          <TableColumn>{task.description}</TableColumn>
          <TableColumn>{task.type}</TableColumn>
          <TableColumn>{prettyDate.format(new Date(task.creationDate))}</TableColumn>
          <TableColumn>{task.status}</TableColumn>
          <TableColumn>{startDate}</TableColumn>
          <TableColumn>{endDate}</TableColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="md-grid md-grid--no-spacing">
          <Toolbar
            themed
            className="md-cell--12"
            title="Inbox"
          />
        </div>
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Description</TableColumn>
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

  if (state.tasks && state.tasks.tasks) {
    props.tasks = state.tasks.tasks;
  }

  return props;
}

export default connect(mapStateToProps, { fetchTasks })(requireAuth(Inbox, 'inbox'));
