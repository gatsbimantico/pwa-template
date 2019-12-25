import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './common/store/configureStore';
import { HelmetProvider } from 'react-helmet-async';
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import theme from './common/utils/theme';
import App from './common/App';

// Create a new class name generator.
const generateClassName = createGenerateClassName();

class Client extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <HelmetProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </HelmetProvider>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
// Create Redux store with initial state
const store = configureStore(preloadedState);

hydrate(<Client />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./common/App', () => {
    hydrate(<Client />, document.getElementById('root'));
  });
}
