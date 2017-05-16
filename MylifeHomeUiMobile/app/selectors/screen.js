'use strict';

import { selectors } from 'mylife-home-ui-common';

export const getScreen = (state) => state.screen;

export const getRatio = (state) => {
  const wid = selectors.getView(state).first();
  const window = wid && selectors.getWindow(state, { window: wid });
  const screen = getScreen(state);
  if(!window || !screen.width) { return 1; }

  const x = screen.width / window.width;
  const y = screen.height / window.height;
  return Math.min(x, y);
};
