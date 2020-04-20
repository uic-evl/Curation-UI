/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
/* eslint-disable quotes */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */

import React, { Component } from "react";
import prettyDate from "pretty-date";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Toolbar,
  SelectField,
} from "react-md";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchTasks } from "client/actions";
import requireAuth from "client/components/auth/requireAuth";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);

    const users = [
      {
        value: "arighi",
        label: "Cecilia Arighi",
      },
      {
        value: "daniela",
        label: "Daniela Raciti",
      },
      {
        value: "jtrell2",
        label: "Juan Trelles",
      },
      {
        value: "juantrelles",
        label: "Juan Trelles",
      },
      {
        value: "shatkay",
        label: "Hagit Shatkay",
      },
      {
        value: "cynthia.smith",
        label: "Cynthia Smith",
      },
      {
        value: "pengyuan",
        label: "Pengyuan Li",
      },
      {
        value: "martin.ringwald",
        label: "Martin Ringwald",
      },
      {
        value: "gmarai",
        label: "Liz Marai",
      },
    ];

    this.state = {
      selectedUser: this.props.username,
      users,
    };
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

  onChangeUser(value) {
    const { fetchTasks } = this.props;
    fetchTasks(value);
    // this.setState({ selectedUser: value });
  }

  renderTasks() {
    const { tasks } = this.props;
    if (!tasks) return;

    return tasks.map((task) => {
      let startDate = "";
      let endDate = "";
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
          <TableColumn>
            {prettyDate.format(new Date(task.creationDate))}
          </TableColumn>
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
            actions={
              <SelectField
                id="cbox-users"
                label="User"
                className="md-cell md-cell--12 md-cell--top custom-input-field"
                menuItems={this.state.users}
                onChange={this.onChangeUser}
                value={this.selectedUser}
              />
            }
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
          <TableBody>{this.renderTasks()}</TableBody>
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

export default connect(mapStateToProps, { fetchTasks })(
  requireAuth(Inbox, "inbox")
);
