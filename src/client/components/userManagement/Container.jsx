/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';
import UsersGrid from 'client/components/userManagement/UsersGrid';
import GroupsGrid from 'client/components/userManagement/GroupsGrid';
import {
  fetchUsersByGroup,
  fetchGroupsByOrganization,
  createGroup,
  createUser,
} from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';

class UserManagement extends Component {
  componentDidMount() {
    const { fetchUsersByGroup, fetchGroupsByOrganization, organization } = this.props;
    fetchUsersByGroup(organization);
    fetchGroupsByOrganization(organization);
  }

  renderTableUsers() {
    const { users, organization, createUser } = this.props;
    if (!users) {
      return (<div />);
    }

    return <UsersGrid users={users} organization={organization} create={createUser} />;
  }

  renderTableGroups() {
    const { groups, organization, createGroup } = this.props;
    return <GroupsGrid groups={groups} organization={organization} create={createGroup} />;
  }

  render() {
    return (
      <div>
        <Grid className="md-grid--no-spacing">
          <Cell size={12}>
            {this.renderTableUsers()}
          </Cell>
        </Grid>
        <br />
        <Grid className="md-grid--no-spacing">
          <Cell size={12}>
            {this.renderTableGroups()}
          </Cell>
        </Grid>
      </div>
    );
  }
}

UserManagement.propTypes = {
  fetchUsersByGroup: PropTypes.func,
  fetchGroupsByOrganization: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  organization: PropTypes.string,
  createGroup: PropTypes.func,
  createUser: PropTypes.func,
};

function mapStateToProps(state) {
  const props = {
    username: null,
    users: null,
  };

  if (state.auth) {
    props.username = state.auth.username;
    props.organization = state.auth.organization;
  }

  if (state.mgt) {
    if (state.mgt.users) {
      props.users = state.mgt.users;
    }
    if (state.mgt.groups) {
      props.groups = state.mgt.groups;
    }
  }

  return props;
}

export default connect(mapStateToProps, {
  fetchUsersByGroup,
  fetchGroupsByOrganization,
  createGroup,
  createUser,
})(requireAuth(UserManagement, 'userManagement'));
