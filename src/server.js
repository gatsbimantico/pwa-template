import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import qs from 'qs';
import fs from 'fs';
import serialize from 'serialize-javascript';
import 'isomorphic-fetch';

import configureStore from './common/store/configureStore';
import { fetchCounter } from './common/api/counter';
import { getLanguage, getTranslations, fallbackLng } from './common/utils/language';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    fetchCounter(apiResult => {
      // Read the counter from the request, if provided
      const params = qs.parse(req.query);
      const counter = parseInt(params.counter, 10) || apiResult || 0;
      // Map your domains or params to a language
      const lang = getLanguage(req.hostname, params) || fallbackLng;

      // Compile an initial state
      const preloadedState = {
        counter,
        lang: {
          current: lang,
          translations: getTranslations(lang, fs),
        },
      };
      // Create a new Redux store instance
      const store = configureStore(preloadedState);
      // Grab the initial state from our Redux store
      const finalState = store.getState();

      const helmetContext = {};
      const context = {};
      // Render the component to a string
      const markup = renderToString((
        <App
          routerContext={context}
          helmetContext={helmetContext}
          location={req.url}
          store={store}
        />
      ));

      const { helmet } = helmetContext;

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
`<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  ${assets.client.css ? (
   `<link rel="stylesheet" href="${assets.client.css}">`
  ) : ''}
  ${process.env.NODE_ENV === 'production' ? (
   `<link rel="preload" href="${assets.client.js}" as="script" />`
  ) : ''}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${markup}</div>
    <script>window.__PRELOADED_STATE__ = ${serialize(finalState)}</script>
  ${process.env.NODE_ENV === 'production' ? (
   `<script src="${assets.client.js}" defer></script>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
    </script>`
  ) : (
   `<script src="${assets.client.js}" defer crossorigin></script>`
  )}
  </body>
</html>`
        );
      }
    });
  });

export default server;
