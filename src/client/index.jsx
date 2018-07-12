import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import App from 'client/components/app';
import reducers from 'client/reducers';

import 'client/styles/carousel.css';
import 'client/styles/curation.css';
import 'client/styles/figure_list.css';
import 'client/styles/header.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('container')
);
