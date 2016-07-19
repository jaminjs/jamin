import 'babel-polyfill';
import 'isomorphic-fetch';
import koa from 'koa';

import Handler from './server-html';

const PORT = (+process.env.PORT) || 3000;

const app = koa();

app.use(Handler);

app.listen(PORT);
