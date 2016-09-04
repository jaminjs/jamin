import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import useNamedRoutes from 'use-named-routes';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import getRoutes from 'routes/routes';
import { SetInitialState } from 'data/initial-state';
import createStore from 'data/create-store';

function ServerHTML(props) {
  const {
    children,
    chunks,
    initialState,
  } = props;

  // content needs to be run before Helmet.rewind() call
  const content = children ? ReactDOM.renderToString(children) : '';
  const head = Helmet.rewind();

  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.style.toComponent()}

        <link type="stylesheet" href={chunks.styles.main} />
      </head>
      <body>
        <div id="main" dangerouslySetInnerHTML={{ __html: content }} />

        <SetInitialState state={initialState} />

        <script src={chunks.javascript.main} />
      </body>
    </html>
  );
}

ServerHTML.propTypes = {
  children: PropTypes.node,
  chunks: PropTypes.shape({
    javascript: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }).isRequired,
  initialState: PropTypes.object,
};

export default (params) => function* Handler() {
  const ctx = this;

  const store = createStore();

  const routes = getRoutes();
  // Enhance history to support named routes.
  const historyCreator = useNamedRoutes(createMemoryHistory);
  const history = historyCreator({ routes });

  match(
    { history, routes, location: ctx.path },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        ctx.throw(error);
      } else if (renderProps) {
        // Let's do some rendering!
        ctx.body = `<!doctype html>${ReactDOM.renderToString(
          <ServerHTML initialState={store.getState()} chunks={params.chunks()}>
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          </ServerHTML>
        )}`;
        ctx.type = 'html';
      } else {
        ctx.status = 404;
      }
    }
  );
}
