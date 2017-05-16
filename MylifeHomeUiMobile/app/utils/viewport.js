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
  return {
    x : physWith / logicalWidth,
    y : physHeight / logicalHeight
  };
}

export function getPhysicalSize(size) {
  const ratio = getRatio();
  return {
    width  : size.width * ratio.x,
    height : size.height * ratio.y
  };
}

export function getPhysicalPosition(pos) {
  const ratio = getRatio();
  return {
    left : pos.left * ratio.x,
    top  : pos.top * ratio.y
  };
}