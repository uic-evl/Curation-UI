/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import prettyDate from 'pretty-date';
import {
  SelectField,
  Button,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
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
    fetchAvailableUserTest('users_uic');
    fetchTests();
  }

  onChangeUser(value) {
    this.setState({ user: value });
  }

  onClickCreateTest() {
    const { user } = this.state;
    const { createClassificationTest, fetchTests } = this.props;
    createClassificationTest(user, () => {
      fetchTests();
    });
  }

  renderCreationOptions() {
    const { users } = this.props;
    const { user } = this.state;

    if (!users) {
      return (<div />);
    }

    return (
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
    );
  }

  renderTable() {
    const { tests } = this.props;

    if (!tests) {
      return <div />;
    }

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Curator</TableColumn>
            <TableColumn>Creation Date</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Start Date</TableColumn>
            <TableColumn>End Date</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { this.renderTableContent(tests) }
        </TableBody>
      </DataTable>
    );
  }

  renderTableContent(tests) {
    return tests.map((test) => {
      return (
        <TableRow key={test.username}>
          <TableColumn>{test.username}</TableColumn>
          <TableColumn>{prettyDate.format(new Date(test.creationDate))}</TableColumn>
          <TableColumn>{test.status}</TableColumn>
          <TableColumn />
          <TableColumn />
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        { this.renderCreationOptions() }
        { this.renderTable() }
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
