'use strict';

import { Dimensions } from 'react-native';
import { screenResize } from '../actions/screen';

export const viewportSetup = (dispatch) => {
  Dimensions.addEventListener('change', ({ window }) => dispatch(screenResize(window)));
  dispatch(screenResize(Dimensions.get('window')));
};

export const getPhysicalSize = (ratio, size) => ({
  width  : size.width * ratio,
  height : size.height * ratio
});

export const getPhysicalPosition = (ratio, pos) => ({
  left : pos.left * ratio,
  top  : pos.top * ratio
});
