// Index.js - root file on client side -- all about redux
// Initial bootup logic for react side and redux side of the app
// Put initial data layer considerations of the app, the redux side
// Render root coponent to development

import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';  //import statement for all the diff reducers

// First arg in createStore() are all the reducers we have in the application
// 2nd arg is initial state of the app
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


//ReactDOM takes 2 args (1st is the root component, 2nd where we are planning to render that component) Root component will be App component that has all the routing of the application
// Show the app component instance
// 2nd argument needs to refernence an existing DOM node; index.html houses the very root filr used to house the React side of the application
ReactDOM.render(
  <Provider store={store}><App /></Provider>, //Provider tag reads changes from redux store, any changes will cause the Provider to tell the rest of it's child components about the changes.
  document.querySelector('#root')
);
