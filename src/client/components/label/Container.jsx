/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Cell,
  Button,
  Media,
  Paper,
  Toolbar,
  Snackbar,
  SelectionControl,
  DialogContainer,
} from 'react-md';
import {
  fetchDocument,
  fetchModalities,
  openTask,
  finishTask,
  updateFigureMissingPanels,
} from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';
import DocumentTitle from 'client/components/label/Header';
import FigureList from 'client/components/label/FigureList';
import SubfigureList from 'client/components/label/SubfigureList';
import MainImage from 'client/components/label/MainImageCaption';
import SubImage from 'client/components/label/SubImage';
import SubImageModList from 'client/components/label/SubImageModList';
import ModalitiesTree from 'client/components/label/Tree';
import { parseValuesSelectField } from 'client/containers/utils/training_form';

class LabelDocument extends Component {
  constructor(props) {
    super(props);
    this.onClickFinishTask = this.onClickFinishTask.bind(this);
    this.onChangeIsMissingPanels = this.onChangeIsMissingPanels.bind(this);

    this.state = {
      toasts: [],
      autohide: true,
      toastMessage: true,
      dialogVisible: false,
    };
  }

  componentDidMount() {
    const { documentId, taskId } = this.props;
    const { fetchDocument, fetchModalities, openTask } = this.props;
    fetchDocument(documentId);
    fetchModalities();
    openTask(taskId);
  }

  onClickFinishTask() {
    if (this.validateTaskDone()) {
      const { task, username, userId } = this.props;
      const { history, finishTask } = this.props;

      finishTask(task, username, userId, () => {
        console.log('Task finished');
        history.push('/inbox');
      });
    } else {
      console.log('not reviewed');
      this.toastSubmit('You need to review all the figures and subfigures');
    }
  }

  onChangeIsMissingPanels(value) {
    const { updateFigureMissingPanels, selectedFigure } = this.props;
    updateFigureMissingPanels(selectedFigure._id, value, () => {
      this.toastSubmit('Figure updated');
    });
  }

  addToast = (text, action, autohide: true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  toastSubmit = (message) => {
    this.addToast(message);
  }

  hideDialog = () => {
    this.setState({ dialogVisible: false });
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  validateTaskDone() {
    const { figures } = this.props;
    const STATE_TO_REVIEW = 'To Review';
    let isDocReviewed = true;

    for (let i = 0; i < figures.length; i += 1) {
      if (figures[i].state === STATE_TO_REVIEW) {
        console.log(figures[i]);
        isDocReviewed = false;
        break;
      }
    }

    return isDocReviewed;
  }

  render() {
    const { document, figures } = this.props;
    const { modalities, modalities1 } = this.props;
    if (!document || !figures || !modalities || !modalities1) {
      return (<div />);
    }

    const { toasts, autohide, toastMessage } = this.state;
    const { dialogVisible } = this.state;
    const { selectedFigure, selectedSubfigure } = this.props;
    const pdfUri = `/images${document.uri}`;
    const imageUrl = `/images${selectedSubfigure.uri}`;
    const figureUrl = `/images${selectedFigure.uri}`;

    // temp fix for missing attribute
    if (selectedFigure.isMissingPanels === undefined) {
      selectedFigure.isMissingPanels = false;
    }

    const dialogActions = [
      {
        onClick: this.hideDialog,
        primary: true,
        children: 'Close',
      },
    ];

    return (
      <div className="md-grid--no-spacing">
        <Grid className="md-grid--no-spacing">
          <Toolbar
            themed
            className="md-cell--12"
            title={<a target="_blank" href={pdfUri} download>{`Document ${document.name}`}</a>}
            actions={
              (
                <Button
                  raised
                  primary
                  onClick={this.onClickFinishTask}
                >
                  Finish Task
                </Button>
              )
            }
          />
        </Grid>
        <Grid className="md-grid">
          <Cell size={2} className="md-grid--no-spacing">
            <Grid className="md-grid--no-spacing">
              <Cell size={12}>
                <div className="md-cell--12 figure-thumbnail">
                  <Media aspectRatio="1-1">
                    <img src={figureUrl} alt={selectedFigure.name} onClick={this.showDialog} />
                  </Media>
                </div>
                <div className="md-cell--12 figure-caption-name">
                  {`Fig. Page ${selectedFigure.name}`}
                </div>
                <div className="md-cell--12 figure-caption-name">
                  <SelectionControl
                    id="chbx-missing-panels"
                    type="checkbox"
                    label="Figure missing panels"
                    name="chbx-missing-panels"
                    className="md-cell md-cell--12 custom-input-field"
                    checked={selectedFigure.isMissingPanels}
                    onChange={this.onChangeIsMissingPanels}
                  />
                </div>
              </Cell>
              <Cell size={12} className="md-cell md-cell--12 md-cell--bottom">
                <FigureList />
              </Cell>
            </Grid>
          </Cell>
          <Cell size={10}>
            <Paper zDepth={2}>
              <Toolbar
                themed
                className="md-grid--no-spacing figure-header-2 "
                title={`Properties of Figure in Page ${selectedFigure.name}`}
              />
              <Grid className="md-grid">
                <div className="caption-container">{selectedFigure.caption}</div>
              </Grid>
              <Grid className="md-grid--no-spacing">
                <Cell size={12}><SubfigureList /></Cell>
              </Grid>
              <Grid className="md-grid--no-spacing">
                <Cell size={7}>
                  <SubImageModList figure={selectedSubfigure} modalities={modalities} />
                </Cell>
                <Cell size={5}>
                  <img src={imageUrl} alt={selectedSubfigure.name} />
                </Cell>
              </Grid>
            </Paper>
          </Cell>
        </Grid>
        <Snackbar
          id="message-snackbar-2"
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />

        <DialogContainer
          id="dc-large-figure"
          visible={dialogVisible}
          title={selectedFigure.name}
          onHide={this.hideDialog}
          modal
          actions={dialogActions}
        >
          <Media aspectRatio="1-1">
            <img src={figureUrl} alt={selectedFigure.name} />
          </Media>
        </DialogContainer>
      </div>
    );
  }
}

LabelDocument.propTypes = {
  fetchDocument: PropTypes.func,
  fetchModalities: PropTypes.func,
  openTask: PropTypes.func,
  finishTask: PropTypes.func,
  documentId: PropTypes.string,
  taskId: PropTypes.string,
  task: PropTypes.object,
  document: PropTypes.object,
  figures: PropTypes.arrayOf(PropTypes.object),
  modalities: PropTypes.arrayOf(PropTypes.object),
  modalities1: PropTypes.arrayOf(PropTypes.object),
  selectedFigure: PropTypes.object,
  selectedSubfigure: PropTypes.object,
  history: PropTypes.object,
  username: PropTypes.string,
  userId: PropTypes.string,
  organization: PropTypes.string,
  updateFigureMissingPanels: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  const props = {
    documentId: ownProps.match.params.id,
    taskId: ownProps.match.params.taskId,
    username: null,
    modalities: null,
    modalities1: [],
    task: null,
  };

  if (state.auth) {
    props.username = state.auth.username;
    props.organization = state.auth.organization;
    props.userId = state.auth.userId;
  }

  if (state.labeling) {
    props.document = state.labeling.document;
    props.figures = state.labeling.figures;
    props.selectedFigure = state.labeling.selectedFigure;
    props.selectedSubfigure = state.labeling.selectedSubfigure;
  }

  if (state.dbmodalities && !props.modalities) {
    props.modalities = state.dbmodalities;
    const modalities1 = [...new Set(props.modalities.map(item => item.modality1))];
    props.modalities1 = parseValuesSelectField(modalities1);
  }

  if (state.tasks && state.tasks.currentTask) {
    props.task = state.tasks.currentTask;
  }

  return props;
}

export default connect(mapStateToProps, {
  fetchDocument,
  fetchModalities,
  openTask,
  finishTask,
  updateFigureMissingPanels,
})(requireAuth(LabelDocument, 'labelDocument'));
