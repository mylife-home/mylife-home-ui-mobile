'use strict';

import { selectors } from 'mylife-home-ui-common';

export const getScreen = (state) => state.screen;

export const getRatio = (state) => {
  const window = selectors.getWindow(state, { window: selectors.getView(state).first() });
  const screen = getScreen(state);
  if(!window || !screen.width) { return 1; }

  const x = screen.width / window.width;
  const y = screen.height / window.height;
  return Math.min(x, y);
};
