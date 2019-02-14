import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import App from 'client/components/app';
import reducers from 'client/reducers';

import 'client/styles/_globals.scss';
import 'client/styles/carousel.css';
import 'client/styles/curation.css';
import 'client/styles/figure_list.css';
import 'client/styles/header.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, {
    auth: {
      authenticated: localStorage.getItem('token'),
      access: localStorage.getItem('access'),
      username: localStorage.getItem('username'),
      roles: localStorage.getItem('roles'),
      organization: localStorage.getItem('organization'),
      userId: localStorage.getItem('userId'),
    },
  })}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('container')
);
