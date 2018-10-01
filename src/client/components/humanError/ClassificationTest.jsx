/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Cell,
  SelectField,
  Button,
  Media,
  Paper,
  Toolbar,
} from 'react-md';
import { fetchModalities, fetchNextTestImage, updateUserTestImage } from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';
import PropTypes from 'prop-types';
import {
  filterModalities2,
  filterModalities3,
  filterModalities4,
  getStateInitVals,
  resetFormValues,
  parseValuesSelectField,
} from 'client/containers/utils/training_form';

class ClassificationTest extends Component {
  constructor(props) {
    super(props);
    this.state = getStateInitVals();

    this.onChangeModality1 = this.onChangeModality1.bind(this);
    this.onChangeModality2 = this.onChangeModality2.bind(this);
    this.onChangeModality3 = this.onChangeModality3.bind(this);
    this.onChangeModality4 = this.onChangeModality4.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { fetchNextTestImage, fetchModalities } = this.props;
    const { taskId, username } = this.props;
    fetchModalities();
    if (username) {
      fetchNextTestImage(taskId, username, null);
    }
  }

  componentDidUpdate(prevProps) {
    const { modalities, image } = this.props;

    if (prevProps && prevProps.image && image && prevProps.image._id !== image._id) {
      const { modality1, modality2 } = image;
      const { modality3, modality4 } = image;
      const { modalities2, disabledModality1, disabledModality2 } = filterModalities2(modalities, modality1);
      const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, modality2);
      const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, modality3);

      this.setState({
        modality1,
        modality2,
        modality3,
        modality4,
        modalities2,
        modalities3,
        modalities4,
        disabledModality2,
        disabledModality3,
        disabledModality4,
      });
    }
  }

  onChangeModality1(value) {
    const { modalities } = this.props;
    const { modalities2, disabledModality2 } = filterModalities2(modalities, value);
    this.setState({
      modality1: value,
      modalities2,
      modality2: '',
      modalities3: [],
      modality3: '',
      modalities4: [],
      modality4: '',
      disabledModality2,
      disabledModality3: true,
      disabledModality4: true,
    });
  }

  onChangeModality2(value) {
    const { modalities } = this.props;
    const { modality1 } = this.state;
    const { modalities3, disabledModality3 } = filterModalities3(modalities, modality1, value);

    this.setState({
      modality2: value,
      modalities3,
      disabledModality3,
      modalities4: [],
      modality4: '',
      disabledModality4: true,
    });
  }

  onChangeModality3(value) {
    const { modalities } = this.props;
    const { modality1, modality2 } = this.state;
    const { modalities4, disabledModality4 } = filterModalities4(modalities, modality1, modality2, value);

    this.setState({
      modality3: value,
      modalities4,
      disabledModality4,
    });
  }

  onChangeModality4(value) {
    this.setState({ modality4: value });
  }

  onPrevious() {
    const { image, username, fetchNextTestImage } = this.props;
    const { taskId } = this.props;
    fetchNextTestImage(taskId, username, image._id);
  }

  onSave() {
    const { image, updateUserTestImage, taskId } = this.props;
    const { modality1, modality2 } = this.state;
    const { modality3, modality4 } = this.state;

    image.modality1 = modality1;
    image.modality2 = modality2;
    image.modality3 = modality3;
    image.modality4 = modality4;
    image.state = 'reviewed';

    updateUserTestImage(image, () => {
      const { fetchNextTestImage, username } = this.props;
      fetchNextTestImage(taskId, username, null);
      this.setState(resetFormValues());
    });
  }

  render() {
    const { image, modalities, modalities1 } = this.props;
    const { previous, testCompleted } = this.props;

    if (testCompleted) {
      return (<div>Classification test completed</div>);
    }

    if (!image || !modalities || !modalities1) {
      return (<div />);
    }

    const imageUrl = `/images/validation/${image.folder}/${image.name}`;

    return (
      <Grid className="md-grid--no-spacing">
        <Toolbar themed className="md-cell--12" title="Classification Test" />
        <Cell size={4} className="md-grid--no-spacing">
          <Media aspectRatio="1-1">
            <img src={imageUrl} alt="random" />
          </Media>
        </Cell>
        <Cell size={8} className="md-grid--no-spacing">
          <Paper className="md-grid md-grid--no-spacing">
            <SelectField
              id="modality1-select-field"
              label="Category"
              className="md-cell md-cell--12"
              menuItems={modalities1}
              onChange={this.onChangeModality1}
              value={this.state.modality1}
              required
              errorText="Mandatory field"
            />
            <SelectField
              id="modality2-select-field"
              label="Modality"
              className="md-cell md-cell--12"
              menuItems={this.state.modalities2}
              value={this.state.modality2}
              onChange={this.onChangeModality2}
              disabled={this.state.disabledModality2}
              defaultValue=""
              required={!this.state.disabledModality2}
              errorText="Mandatory field"
            />
            <SelectField
              id="modality3-select-field"
              label="Sub-Modality"
              className="md-cell md-cell--12"
              value={this.state.modality3}
              menuItems={this.state.modalities3}
              onChange={this.onChangeModality3}
              disabled={this.state.disabledModality3}
              defaultValue=""
              required={!this.state.disabledModality3}
              errorText="Mandatory field"
            />
            <SelectField
              id="modality3-select-field"
              label="Sub-sub-Modality"
              className="md-cell md-cell--6"
              menuItems={this.state.modalities4}
              value={this.state.modality4}
              onChange={this.onChangeModality4}
              disabled={this.state.disabledModality4}
              defaultValue=""
            />
            <div className="md-grid md-cell md-cell--12">
              <Button
                flat
                primary
                swapTheming
                className="md-cell--5"
                onClick={this.onPrevious}
                disabled={!this.props.previous}
              >
                Previous
              </Button>
              <Button
                flat
                primary
                swapTheming
                className="md-cell--5"
                onClick={this.onSave}
              >
                Next
              </Button>
            </div>
          </Paper>
        </Cell>
      </Grid>
    );
  }
}

ClassificationTest.propTypes = {
  fetchNextTestImage: PropTypes.func,
  fetchModalities: PropTypes.func,
  updateUserTestImage: PropTypes.func,
  image: PropTypes.object,
  modalities: PropTypes.arrayOf(PropTypes.object),
  modalities1: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  previous: PropTypes.object,
  testCompleted: PropTypes.bool,
  taskId: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const props = {
    taskId: ownProps.match.params.id,
    username: null,
    image: null,
    previous: null,
    testCompleted: null,
    modalities: null,
    modalities1: null,
  };

  if (state.auth) {
    props.username = state.auth.username;
  }

  if (state.userTest) {
    props.image = state.userTest.image;
    props.previous = state.userTest.previous;
    props.testCompleted = (state.userTest.status === 'done');
  }

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseValuesSelectField(modalities1);
  }

  return props;
}

export default connect(mapStateToProps, {
  fetchModalities,
  fetchNextTestImage,
  updateUserTestImage,
})(requireAuth(ClassificationTest, 'userTest'));
