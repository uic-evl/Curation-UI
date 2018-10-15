/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';
import UsersGrid from 'client/components/userManagement/UsersGrid';
import { fetchUsersByGroup } from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';

class UserManagement extends Component {
  componentDidMount() {
    const { fetchUsersByGroup, organization } = this.props;
    fetchUsersByGroup(organization);
  }

  renderTable() {
    const { users } = this.props;
    if (!users) {
      return (<div />);
    }

    return <UsersGrid users={users} />;
  }

  render() {
    return (
      <Grid className="md-grid--no-spacing">
        <Cell size={8}>
          {this.renderTable()}
        </Cell>
      </Grid>
    );
  }
}

UserManagement.propTypes = {
  fetchUsersByGroup: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  organization: PropTypes.string,
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
    props.users = state.mgt.users;
  }

  return props;
}

export default connect(mapStateToProps, { fetchUsersByGroup })(requireAuth(UserManagement, 'userManagement'));
