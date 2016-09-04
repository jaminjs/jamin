import { client_configuration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import config from './webpack.config';

export default client_configuration(config, settings);
