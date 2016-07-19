import 'babel-polyfill';
import 'isomorphic-fetch';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useNamedRoutes from 'use-named-routes';
import useScroll from 'react-router-scroll';

import getRoutes from 'routes/routes';
import createStore from 'data/create-store';
import { getInitialState } from 'data/initial-state';

const store = createStore(getInitialState());

const historyCreator = useNamedRoutes(() => browserHistory);

const mainEl = document.getElementById('main');

function render() {
  const routes = getRoutes();
  const history = historyCreator({ routes });

  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>,
    mainEl
  );
}

render();
