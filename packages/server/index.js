import 'babel-polyfill';
import 'isomorphic-fetch';
import koa from 'koa';
import mount from 'koa-mount';
import static from 'koa-static';
import path from 'path';

import Handler from './server-html';

const PORT = (+process.env.PORT) || 3000;
const REPO_ROOT = path.resolve(__dirname, '../../');

const app = koa();

app.use(mount('/assets', static(path.join(REPO_ROOT, 'build'))))
app.use(Handler);

app.listen(PORT);
