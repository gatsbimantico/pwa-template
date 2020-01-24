import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect, StaticRouter,
} from 'react-router-dom';
import {
  Helmet,
  HelmetProvider,
} from 'react-helmet-async';
import {
  Provider,
} from 'react-redux';
import {
  I18nextProvider,
} from 'react-i18next';
import i18next from 'i18next';
import ExecutionEnvironment from 'exenv';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';

import theme from './common/utils/theme';
import { fallbackLng } from './common/utils/language';
import Layout from './common/components/Layout';
import CheckoutMap from './common/pages/checkout/CheckoutMap';
import LandingMap from './common/pages/landing/LandingMap';
import ProfileMap from './common/pages/profile/ProfileMap';
import SearchMap from './common/pages/search/SearchMap';

const AppLayout = Layout;
const CheckoutLayout = Layout;
const SEOLayout = Layout;
const ProfileLayout = Layout;

const App = ({ lang }) => (
  <>
    <Helmet>
      <title>SSSR</title>
      <html lang={lang} />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="SSR on steroid!" />
      <meta name="theme-color" content="#008f68" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
    </Helmet>
    <CssBaseline />
    <Switch>
      <Route path="/search">
        <AppLayout><SearchMap /></AppLayout>
      </Route>
      <Route path="/checkout">
        <CheckoutLayout><CheckoutMap /></CheckoutLayout>
      </Route>
      <Route path="/u">
        <ProfileLayout><ProfileMap /></ProfileLayout>
      </Route>
      <Route>
        <SEOLayout><LandingMap /></SEOLayout>
      </Route>
    </Switch>
  </>
);

// Create a new class name generator.
const generateClassName = createGenerateClassName();

export default ({
  helmetContext = {},
  routerContext = {},
  location,
  store,
}) => {
  const Router = ExecutionEnvironment.canUseDOM ? BrowserRouter : StaticRouter;
  const lang = (store && store.getState().lang) || {};
  const lng = lang.current || fallbackLng;

  i18next
    .init({
      lng,
      fallbackLng,
      defaultNS: 'main',
      interpolation: { escapeValue: false },  // React already does escaping
      resources: lang.translations || {},
    });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <HelmetProvider context={helmetContext}>
            <Router context={routerContext} location={location}>
              <I18nextProvider i18n={i18next}>
                <App lang={lng} />
              </I18nextProvider>
            </Router>
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};
