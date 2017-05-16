'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { middlewares, utils } from 'mylife-home-ui-common';
import reducer from './reducers/index';
import viewportMiddleware from './middlewares/viewport';

import View from './containers/view';

import { viewInit } from './actions/view';
import { viewportSetup } from './utils/viewport';

utils.setupLocation('http://mylife-home-ui.apps.mti-team2.dyndns.org');

const store = createStore(
  reducer,
  applyMiddleware(viewportMiddleware, middlewares.socket, middlewares.resources, thunk)
);

viewportSetup();
store.dispatch(viewInit());

export default class MylifeHomeUiMobile extends Component {
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MylifeHomeUiMobile', () => MylifeHomeUiMobile);
