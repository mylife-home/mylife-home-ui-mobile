'use strict';

import { combineReducers } from 'redux';
import { reducers } from 'mylife-home-ui-common';
import screen from './screen';

export default combineReducers({
  errors     : reducers.errors,
  online     : reducers.online,
  repository : reducers.repository,
  resources  : reducers.resources,
  view       : reducers.view,
  windows    : reducers.windows,
  screen
});
