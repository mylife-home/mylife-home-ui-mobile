'use strict';

import { handleActions } from 'redux-actions';
import { constants } from 'mylife-home-ui-common';

export default handleActions({

  [constants.actionTypes.SCREEN_RESIZE] : {
    next : (state, action) => action.payload
  }

}, {});
