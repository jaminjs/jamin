import 'babel-polyfill';

import { server } from 'universal-webpack';
import settings from '../setup/universal-webpack-settings';
import configuration from '../setup/webpack.config';

server(configuration, settings);
