import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './home/home';

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute name="home" component={Home} />
    </Route>
  );
}
