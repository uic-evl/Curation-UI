import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import DocumentsReducer from 'client/reducers/reducer_documents';
import FiguresReducer from 'client/reducers/reducer_figures';
import Modalities from 'client/reducers/reducer_modalities';
import ActiveElementReducer from 'client/reducers/reducer_active_element';
import SelectDocumentReducer from 'client/reducers/reducer_selected_document';
import SelectFigureReducer from 'client/reducers/reducer_selected_figure';
import FetchTrainingImages from 'client/reducers/reducer_training';
import DbModalities from 'client/reducers/reducer_db_modalities';
import auth from 'client/reducers/auth';
import ClassificationTest from 'client/reducers/reducer_classification_test';
import TasksReducer from 'client/reducers/reducer_tasks';
import UserTest from 'client/reducers/reducer_user_test';
import Management from 'client/reducers/reducer_management';
import LabelDocument from 'client/reducers/labeling';

const rootReducer = combineReducers({
  auth,
  documents: DocumentsReducer,
  selectedFigures: FiguresReducer,
  modalities: Modalities,
  selectedElement: ActiveElementReducer,
  selectedDocumentData: SelectDocumentReducer,
  selectedFigureData: SelectFigureReducer,
  trainingImages: FetchTrainingImages,
  dbmodalities: DbModalities,
  form: formReducer,
  classificationTest: ClassificationTest,
  tasks: TasksReducer,
  userTest: UserTest,
  mgt: Management,
  labeling: LabelDocument,
});

export default rootReducer;
