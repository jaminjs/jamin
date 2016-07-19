import { IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './home/home';

export default function getRoutes() {
  return (
    <IndexRoute component={App}>
      <IndexRoute name="home" component={Home} />
    </IndexRoute>
  );
}
