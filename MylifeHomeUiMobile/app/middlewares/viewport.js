'use strict';

import { constants, selectors } from 'mylife-home-ui-common';

import { setDimensions } from '../utils/viewport.js';

function factory() {
  return store => next => action => {
    next(action);

    switch (action.type) {
      case constants.actionTypes.VIEW_CHANGE: {
        const state = store.getState();
        const window = selectors.getWindow(state, { window : action.payload });
        setDimensions(window.width, window.height);
      }
    }
  };
}

export default factory();
