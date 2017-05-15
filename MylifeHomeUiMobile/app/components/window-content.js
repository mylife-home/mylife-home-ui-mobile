'use strict';

import React from 'react';
import { View, Image } from 'react-native';

import Control from './control';

function getStyleSize(window) {
  const { height, width } = window;
  return { height, width };
}

const WindowContent = ({ window, onActionPrimary, onActionSecondary }) => (
  <View style={getStyleSize(window)}>
    <Image source={window.resource && { uri: `data:image/png;base64,${window.resource}`}} />
  </View>
);

WindowContent.propTypes = {
  window            : React.PropTypes.object.isRequired,
  onActionPrimary   : React.PropTypes.func.isRequired,
  onActionSecondary : React.PropTypes.func.isRequired,
};

export default WindowContent;

/*

    {window.controls.map(control => (<Control key={control.id}
                                              control={control}
                                              onActionPrimary={() => onActionPrimary(window.id, control.id)}
                                              onActionSecondary={() => onActionSecondary(window.id, control.id)}/>))}

*/