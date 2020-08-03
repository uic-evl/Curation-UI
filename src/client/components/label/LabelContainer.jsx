/* eslint-disable */
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

import {
    fetchDocument,
    fetchModalities,
    openTask,
    finishTask,
    updateFigureMissingPanels,
} from 'client/actions';
import requireAuth from 'client/components/auth/requireAuth';
import FigureList2 from './FigureList2';
import PdfViewer from '../pdfViewer/PdfViewer';
import Matrix from './Matrix';
import SubfigureList2 from './SubfigureList2';
import Observations from './Observations';

class LabelContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toasts: [],
            autohide: true,
            toastMessage: true,
            dialogVisible: false,
            drawerVisible: false,
        };
    }

    componentDidMount() {
        const { documentId, taskId } = this.props;
        const { fetchDocument, fetchModalities, openTask } = this.props;
        fetchDocument(documentId);
        //fetchModalities();
        openTask(taskId);
    }


    render() {

        return (
            <div className="labeling-container">
                <header className="header"></header>
                <section className="left-panel">
                    {this.props.figures && <FigureList2 figures={this.props.figures} selectedId={null} />}
                </section>
                <section className="document-panel">
                    <PdfViewer pdfUrl={'https://tinman.cis.udel.edu/images/pP31412244/P31412244.pdf'} />
                </section>
                <section className="main-panel">
                    {this.props.figures && <SubfigureList2 subfigures={this.props.figures[0].subfigures} />}
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div><img src="https://via.placeholder.com/500" width="500" height="500" alt="" /></div>
                        <Observations />
                    </div>
                    <Matrix />
                </section>
            </div>
        )
    }
}

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
})(requireAuth(LabelContainer, 'labelDocument'));
