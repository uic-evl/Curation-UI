/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { SelectField, Button } from 'react-md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvailableUserTest, createClassificationTest, fetchTests } from 'client/actions';

class ManageTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickCreateTest = this.onClickCreateTest.bind(this);
  }

  componentDidMount() {
    const { fetchAvailableUserTest, fetchTests } = this.props;
    fetchAvailableUserTest('users_udel');
    fetchTests();
  }

  onChangeUser(value) {
    this.setState({ user: value });
  }

  onClickCreateTest() {
    const { user } = this.state;
    const { createClassificationTest } = this.props;
    createClassificationTest(user, () => {
      console.log('test!');
    });
  }

  render() {
    const { users, tests } = this.props;
    const { user } = this.state;

    if (!users || !tests) {
      return (<div />);
    }

    return (
      <div>
        <div className="md-grid md-grid--no-spacing">
          <div className="md-cell--3">
            <SelectField
              id="select-field-curator"
              label="Curator"
              placeholder="Placeholder"
              className="md-cell"
              menuItems={users}
              onChange={this.onChangeUser}
            />
            <Button
              flat
              primary
              type="submit"
              className="md-cell--left"
              onClick={this.onClickCreateTest}
              disabled={!user}
            >
              {'Create Test'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ManageTest.propTypes = {
  fetchAvailableUserTest: PropTypes.func,
  createClassificationTest: PropTypes.func,
  fetchTests: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  tests: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  const props = {
    users: null,
  };

  if (state.classificationTest) {
    props.users = state.classificationTest.users;
    props.tests = state.classificationTest.tests;
  }

  return props;
}

export default connect(mapStateToProps, { fetchAvailableUserTest, createClassificationTest, fetchTests })(ManageTest);
