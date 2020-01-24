import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import configureStore from './common/store/configureStore';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
// Create Redux store with initial state
const store = configureStore(preloadedState);

const Client = () => (<App store={store} />);

hydrate(<Client />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    hydrate(<Client />, document.getElementById('root'));
  });
}
