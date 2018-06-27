import { combineReducers } from 'redux';
import DocumentsReducer from 'reducers/reducer_documents';
import FiguresReducer from 'reducers/reducer_figures';
import Modalities from 'reducers/reducer_modalities';
import ActiveElementReducer from 'reducers/reducer_active_element';
import SelectDocumentReducer from 'reducers/reducer_selected_document';
import SelectFigureReducer from 'reducers/reducer_selected_figure';

const rootReducer = combineReducers({
  documents: DocumentsReducer,
  selectedFigures: FiguresReducer,
  modalities: Modalities,
  selectedElement: ActiveElementReducer,
  selectedDocumentData: SelectDocumentReducer,
  selectedFigureData: SelectFigureReducer,
});

export default rootReducer;
