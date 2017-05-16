'use strict';

import { createAction } from 'redux-actions';
import { constants } from 'mylife-home-ui-common';

export const screenResize = createAction(constants.actionTypes.SCREEN_RESIZE);
