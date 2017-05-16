'use strict';

import { Dimensions } from 'react-native';
let logicalWidth, logicalHeight;

export function setDimensions(requiredWidth, requiredHeight) {
  console.log(`viewport set dimensions: width=${requiredWidth}, heigth=${requiredHeight}`); // eslint-disable-line no-console
  logicalWidth  = requiredWidth;
  logicalHeight = requiredHeight;
}

function getRatio() {
  const { width: physWith, height: physHeight } = Dimensions.get('window');
  const x = physWith / logicalWidth;
  const y = physHeight / logicalHeight;
  return Math.min(x, y);
}

export function getPhysicalSize(size) {
  const ratio = getRatio();
  return {
    width  : size.width * ratio,
    height : size.height * ratio
  };
}

export function getPhysicalPosition(pos) {
  const ratio = getRatio();
  return {
    left : pos.left * ratio,
    top  : pos.top * ratio
  };
}