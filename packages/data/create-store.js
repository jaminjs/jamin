import {
  createStore as baseCreateStore,
} from 'redux';

import reducer from './reducer';

export default function createStore(initialState = {}) {
  return baseCreateStore(reducer, initialState);
}
