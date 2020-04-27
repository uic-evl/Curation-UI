/* eslint-disable prefer-destructuring */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable object-shorthand */

import _ from "lodash";
import axios from "axios";
import {
  FETCH_ELEMENT,
  SELECT_DOCUMENT,
  SELECT_FIGURE,
  SELECT_SUBFIGURE,
  FETCH_IMAGE_TO_TRAIN,
  FETCH_MODALITIES,
  UPDATE_TRAINING_IMAGE,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_HUMAN_ERR_AVAILABLE_USERS,
  CREATE_TEST,
  FETCH_TESTS,
  FETCH_TASKS,
  FETCH_NEXT_TEST_IMAGE,
  UPDATE_USER_TEST_IMAGE,
  VERIFY_USER,
  UPDATE_PASSWORD,
  FETCH_USERS_BY_GROUP,
  FETCH_USER_BY_ID,
  ADD_USER_TO_ROLE,
  FETCH_GROUPS_BY_ORG,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  REMOVE_USER_FROM_ROLE,
  REMOVE_USER_FROM_ROLE_SUCCESS,
  ADD_USER_TO_ROLE_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  FETCH_DOCUMENT,
  SELECT_FIGURE_X,
  SELECT_SUBFIGURE_X,
  UPDATE_SUBFIGURE,
  UPDATE_SUBFIGURE_SUCCESS,
  FETCH_TASK,
  FINISH_TASK,
  FINISH_TASK_SUCCESS,
  OPEN_TASK,
  UPDATE_ALL_SUBFIGURES,
  UPDATE_ALL_SUBFIGURES_SUCCESS,
  MARK_FIGURE_MISSING_PANELS,
  MARK_FIGURE_MISSING_PANELS_SUCCESS,
} from "client/actions/action_types";
import TEST_DOCUMENTS from "client/data/test_documents";
import TEST_FIGURES from "client/data/test_figures";
import TEST_SUBFIGURES from "client/data/test_subfigures";
import TEST_ELEMENTS from "client/data/test_elements";

const API_URL = process.env.API_URL;

export function fetchElement(id) {
  const element = _.find(TEST_ELEMENTS, { id: `${id}` });
  const documents = _.filter(TEST_DOCUMENTS, { pid: `${id}` });

  return {
    type: FETCH_ELEMENT,
    payload: {
      element,
      documents,
    },
  };
}

export function selectDocument(document) {
  const figures = _.filter(TEST_FIGURES, { document_id: `${document.id}` });

  return {
    type: SELECT_DOCUMENT,
    payload: {
      document,
      figures,
    },
  };
}

export function selectFigure(figure) {
  const subfigures = _.filter(TEST_SUBFIGURES, { figure_id: `${figure.id}` });
  let selectedSubfigure = null;
  if (subfigures.length > 0) {
    selectedSubfigure = subfigures[0];
  }

  return {
    type: SELECT_FIGURE,
    payload: {
      figure,
      subfigures,
      selectedSubfigure,
    },
  };
}

export function selectSubfigure(subfigure) {
  return {
    type: SELECT_SUBFIGURE,
    payload: subfigure,
  };
}

export function fetchTrainingImages(currHistory) {
  const url = `${API_URL}training/${currHistory}`;
  const request = axios.get(url);

  return {
    type: FETCH_IMAGE_TO_TRAIN,
    payload: request,
  };
}

export function fetchModalities() {
  const url = `${API_URL}modalities`;
  const request = axios.get(url);

  return {
    type: FETCH_MODALITIES,
    payload: request,
  };
}

export function updateTrainingImage(id, values, callback) {
  const request = axios
    .patch(`${API_URL}training/${id}`, values)
    .then(() => callback());

  return {
    type: UPDATE_TRAINING_IMAGE,
    payload: request,
  };
}

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}signup/`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}signin/`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("roles", response.data.roles);
    localStorage.setItem("organization", response.data.organization);
    localStorage.setItem("userId", response.data.user_id);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export function fetchAvailableUserTest(groupName) {
  const url = `${API_URL}getGroup/${groupName}`;
  const request = axios.get(url);

  return {
    type: FETCH_HUMAN_ERR_AVAILABLE_USERS,
    payload: request,
  };
}

export function createClassificationTest(username, callback) {
  const request = axios
    .patch(`${API_URL}createTest`, { curator: username })
    .then(() => callback());

  return {
    type: CREATE_TEST,
    payload: request,
  };
}

export function fetchTests() {
  const url = `${API_URL}getTests`;
  const request = axios.get(url);

  return {
    type: FETCH_TESTS,
    payload: request,
  };
}

export function fetchTasks(username) {
  const url = `${API_URL}getTasks/${username}`;

  return (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: FETCH_TASKS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log("error fetching tasks");
        console.log(error);
      });
  };

  /*
  debugger;
  const request = axios.get(url);

  return {
    type: FETCH_TASKS,
    payload: request,
  }; */
}

export function fetchNextTestImage(taskId, username, previousId) {
  const values = { username, taskId };
  let service = "getNextTestImage";
  if (previousId) {
    service = "getPreviousTestImage";
    values.previous_id = previousId;
  }

  const request = axios.patch(`${API_URL}${service}`, values);
  return {
    type: FETCH_NEXT_TEST_IMAGE,
    payload: request,
  };
}

export function updateUserTestImage(image, callback) {
  const request = axios
    .patch(`${API_URL}updateUserTestImage`, { image })
    .then(() => callback());
  return {
    type: UPDATE_USER_TEST_IMAGE,
    payload: request,
  };
}

export function verifyUser(token, callback) {
  const request = axios.patch(`${API_URL}verify/${token}`).then((response) => {
    callback(response.data.id);
  });
  return {
    type: VERIFY_USER,
    payload: request,
  };
}

export function updatePassword(id, password, callback) {
  const request = axios
    .patch(`${API_URL}updatePassword`, { _id: id, password: password })
    .then((response) => {
      callback(response.data.message);
    });

  return {
    type: UPDATE_PASSWORD,
    payload: request,
  };
}

export function fetchUsersByGroup(groupName) {
  const url = `${API_URL}fetchUsersByGroup/${groupName}`;
  const request = axios.get(url);

  return {
    type: FETCH_USERS_BY_GROUP,
    payload: request,
  };
}

export function fetchUserById(id) {
  const url = `${API_URL}fetchUserById/${id}`;
  const request = axios.get(url);

  return {
    type: FETCH_USER_BY_ID,
    payload: request,
  };
}

export function fetchGroupsByOrganization(organization) {
  const url = `${API_URL}getGroupsByOrganization/${organization}`;
  const request = axios.get(url);

  return {
    type: FETCH_GROUPS_BY_ORG,
    payload: request,
  };
}

export function createGroup(name, organization, supervisor, type, callback) {
  return (dispatch) => {
    const values = {
      name,
      organization,
      type,
      supervisor,
    };
    dispatch({ type: CREATE_GROUP });
    axios
      .patch(`${API_URL}createGroup`, values)
      .then((res) => {
        // mapstatetoprops on container, catch event and hide pop up
        dispatch({ type: CREATE_GROUP_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error creating group");
        console.log(error);
      });
  };
}

export function addUserToRole(userId, role) {
  return (dispatch) => {
    dispatch({ type: ADD_USER_TO_ROLE });
    axios
      .patch(`${API_URL}addRole`, { _id: userId, roles: [role] })
      .then((res) => {
        dispatch({ type: ADD_USER_TO_ROLE_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.log("error adding user to role");
        console.log(error);
      });
  };
}

// Passing callback as a parameter doesn't work with reducers as it breaks
// the reducer lifecycle. Consider using this approach and control the UI changes
// with the redux state
export function removeUserFromRoles(userId, roles) {
  return (dispatch) => {
    dispatch({ type: REMOVE_USER_FROM_ROLE });
    axios
      .patch(`${API_URL}removeRole`, { _id: userId, roles })
      .then((res) => {
        dispatch({ type: REMOVE_USER_FROM_ROLE_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.log("error removing role");
        console.log(error);
      });
  };
}

export function createUser(email, organization, username, callback) {
  return (dispatch) => {
    const user = {
      email,
      organization,
      username,
      password: "1234", // TODO: change for a random sequence
    };

    dispatch({ type: CREATE_USER });
    axios
      .patch(`${API_URL}signup`, user)
      .then((res) => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error adding user");
        console.log(error);
      });
  };
}

export function fetchDocument(documentId) {
  const url = `${API_URL}fetchDocumentContent/${documentId}`;
  const request = axios.get(url);

  return {
    type: FETCH_DOCUMENT,
    payload: request,
  };
}

export function selectFigureX(selectedFigure) {
  return {
    type: SELECT_FIGURE_X,
    payload: selectedFigure,
  };
}

export function selectSubfigureX(selectedSubfigure) {
  return {
    type: SELECT_SUBFIGURE_X,
    payload: selectedSubfigure,
  };
}

export function updateSubfigure(id, values, callback) {
  return (dispatch) => {
    dispatch({ type: UPDATE_SUBFIGURE });
    axios
      .patch(`${API_URL}updateSubfigure`, { id: id, values: values })
      .then((res) => {
        dispatch({ type: UPDATE_SUBFIGURE_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error updating figure");
        console.log(error);
      });
  };
}

export function updateAllSubfigures(figureId, subfigureId, values, callback) {
  return (dispatch) => {
    dispatch({ type: UPDATE_ALL_SUBFIGURES });
    axios
      .patch(`${API_URL}updateAllSubfigures`, {
        figureId: figureId,
        values: values,
        subfigureId: subfigureId,
      })
      .then((res) => {
        dispatch({ type: UPDATE_ALL_SUBFIGURES_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error updating subfigures");
        console.log(error);
      });
  };
}

export function updateFigureMissingPanels(id, isMissingPanels, callback) {
  return (dispatch) => {
    dispatch({ type: MARK_FIGURE_MISSING_PANELS });
    axios
      .patch(`${API_URL}markFigureMissingPanels`, {
        id: id,
        isMissingPanels: isMissingPanels,
      })
      .then((res) => {
        dispatch({ type: MARK_FIGURE_MISSING_PANELS_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error updating figure");
        console.log(error);
      });
  };
}

export function fetchTask(id) {
  const url = `${API_URL}fetchTask/${id}`;
  const request = axios.get(url);

  return {
    type: FETCH_TASK,
    payload: request,
  };
}

export function openTask(id) {
  const request = axios.patch(`${API_URL}openTask`, { id: id });

  return {
    type: OPEN_TASK,
    payload: request,
  };
}

export function finishTask(task, username, userId, callback) {
  return (dispatch) => {
    dispatch({ type: FINISH_TASK });
    axios
      .patch(`${API_URL}finishTask`, {
        task: task,
        username: username,
        userId: userId,
      })
      .then((res) => {
        dispatch({ type: FINISH_TASK_SUCCESS, payload: res });
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log("error finishing the task");
        console.log(error);
      });
  };
}
