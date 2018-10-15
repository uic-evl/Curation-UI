/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Cell,
} from 'react-md';
import { fetchUserById, addUserToRole } from 'client/actions';
import UserRolesGrid from './UserRolesGrid';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.onAddUserToRole = this.onAddUserToRole.bind(this);
  }

  componentDidMount() {
    const { fetchUserById, userId } = this.props;
    fetchUserById(userId);
  }

  onAddUserToRole(role) {
    const { addUserToRole, fetchUserById, userId } = this.props;
    addUserToRole(userId, role, () => {
      fetchUserById(userId);
    });
  }

  renderRoles() {
    const { roles } = this.props;
    if (!roles) return;
    const { userId } = this.props;

    const selectValues = ['curator', 'lead', 'admin'];
    roles.forEach((val) => {
      const idx = selectValues.indexOf(val);
      if (idx > -1) {
        selectValues.splice(idx, 1);
      }
    });
    return (
      <UserRolesGrid
        title="Roles"
        baseId="userRoles"
        values={roles}
        selectValues={selectValues}
        onClickAdd={this.onAddUserToRole}
      />
    );
  }

  render() {
    const { userId } = this.props;

    return (
      <section className="md-grid--no-spacing" aria-labelledby="user-group-0-title">
        <div>
          <h2>{userId}</h2>
        </div>
        <Grid className="md-grid--no-spacing">
          <Cell size={12}>
            <h1>{userId}</h1>
          </Cell>
        </Grid>
        {this.renderRoles()}
      </section>
    );
  }
}

UserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  fetchUserById: PropTypes.func,
  addUserToRole: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state) {
  const props = {
    roles: null,
  };

  if (state.mgt && state.mgt.selectedUser) {
    props.roles = state.mgt.selectedUser.roles;
  }

  return props;
}

export default connect(mapStateToProps, { fetchUserById, addUserToRole })(UserForm);
