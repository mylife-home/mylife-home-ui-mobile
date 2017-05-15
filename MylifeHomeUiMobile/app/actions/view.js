'use strict';

import { createAction } from 'redux-actions';
import { constants, actions, selectors } from 'mylife-home-ui-common/lib/index';

const internalViewPopup  = createAction(constants.actionTypes.VIEW_POPUP);
const internalViewClose  = createAction(constants.actionTypes.VIEW_CLOSE);
const internalViewChange = createAction(constants.actionTypes.VIEW_CHANGE);

function getDefaultView(dispatch, done) {
  return dispatch(actions.resourceQuery({ resource: 'default_window', done: (err, data) => {
    if(err) { return done(err); } // eslint-disable-line no-console
    const windows = JSON.parse(data);
    return done(null, windows.mobile);
  }}));
}

export const viewInit = () => (dispatch, getState) => {
  const state = getState();
  return getDefaultView(dispatch, (err, defaultWindow) => {
    if(err) { return console.error(err); } // eslint-disable-line no-console

    console.log(`using default window: ${defaultWindow}`); // eslint-disable-line no-console
    dispatch(viewChange(defaultWindow));
  });
};

export const viewChange = (id) => (dispatch, getState) => {
  return dispatch(actions.windowLoad(id, (err) => {
    if(err) { return console.error(err); } // eslint-disable-line no-console
    return dispatch(internalViewChange(id));
  }));
};

export const viewPopup = (id) => (dispatch) => {
  return dispatch(actions.windowLoad(id, (err) => {
    if(err) { return console.error(err); } // eslint-disable-line no-console
    return dispatch(internalViewPopup(id));
  }));
};

export const viewClose = () => (dispatch, getState) => {
  const state = getState();
  const view = selectors.getView(state);
  if(view.size <= 1) {
    console.error('Cannot close root window!'); // eslint-disable-line no-console
    return;
  }
  return dispatch(internalViewClose());
};
