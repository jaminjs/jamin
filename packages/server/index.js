import 'babel-polyfill';
import 'isomorphic-fetch';
import koa from 'koa';
import mount from 'koa-mount';
import StaticHandler from 'koa-static';
import path from 'path';

import Handler from './server-html';

const PORT = (+process.env.PORT) || 3000;
const REPO_ROOT = path.resolve(__dirname, '../../');
const DEV = process.env.NODE_ENV === 'dev';
const WDS_PORT = DEV ? (PORT + 1) : null;
const WDS_HOST = DEV ? (process.env.HOST || 'localhost') : null;

export default function(params) {

  const app = koa();

  // static assets (built by webpack)
  if (DEV) {
    const proxy = require('koa-proxy');

    // proxy to the webpack dev server when in dev mode
    app.use(proxy({
      host: `http://${WDS_HOST}:${WDS_PORT}`,
      match: /^\/assets\//,
    }));
  } else {
    app.use(mount('/assets', StaticHandler(path.join(REPO_ROOT, 'build'))));
  }

  // React handler
  app.use(Handler(params));

  console.log('LISTENING ON PORT', PORT);
  app.listen(PORT);
}
