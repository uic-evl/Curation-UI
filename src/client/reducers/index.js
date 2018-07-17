import { combineReducers } from 'redux';
import DocumentsReducer from 'client/reducers/reducer_documents';
import FiguresReducer from 'client/reducers/reducer_figures';
import Modalities from 'client/reducers/reducer_modalities';
import ActiveElementReducer from 'client/reducers/reducer_active_element';
import SelectDocumentReducer from 'client/reducers/reducer_selected_document';
import SelectFigureReducer from 'client/reducers/reducer_selected_figure';
import FetchTrainingImages from 'client/reducers/reducer_training';
import DbModalities from 'client/reducers/reducer_db_modalities';

const rootReducer = combineReducers({
  documents: DocumentsReducer,
  selectedFigures: FiguresReducer,
  modalities: Modalities,
  selectedElement: ActiveElementReducer,
  selectedDocumentData: SelectDocumentReducer,
  selectedFigureData: SelectFigureReducer,
  trainingImages: FetchTrainingImages,
  dbmodalities: DbModalities,
});

export default rootReducer;
