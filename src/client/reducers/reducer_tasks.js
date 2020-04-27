/* eslint-disable no-debugger */
import {
  FETCH_TASKS,
  FETCH_TASK,
  FINISH_TASK_SUCCESS,
  OPEN_TASK,
} from "client/actions/action_types";

// FetchTask and FinishTaskSucess returning task + message
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        tasks: action.payload.data,
        currentTask: null,
        message: "",
      };
    case FETCH_TASK:
      return {
        tasks: null,
        currentTask: action.payload.data.currentTask,
        message: action.payload.data.message,
      };
    case OPEN_TASK:
      return {
        tasks: null,
        currentTask: action.payload.data.currentTask,
        message: action.payload.data.message,
      };
    case FINISH_TASK_SUCCESS:
      return {
        tasks: null,
        currentTask: action.payload.data.currentTask,
        message: action.payload.data.message,
      };
    default:
      return state;
  }
}
