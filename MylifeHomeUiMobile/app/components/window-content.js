'use strict';

import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getPhysicalSize } from '../utils/viewport.js';

import Control from './control';

const styles = StyleSheet.create({
  backgroundImage: {
    position   : 'absolute',
    top        : 0,
    left       : 0,
    right      : 0,
    bottom     : 0,
    resizeMode : 'contain'
  }
});

const WindowContent = ({ window, ratio, onActionPrimary, onActionSecondary }) => (
  <View style={getPhysicalSize(ratio, window)}>
    <Image style={styles.backgroundImage} source={window.resource && { uri: `data:image/png;base64,${window.resource}`}} />
    {window.controls.map(control => (<Control key={control.id}
                                              control={control}
                                              ratio={ratio}
                                              onActionPrimary={() => onActionPrimary(window.id, control.id)}
                                              onActionSecondary={() => onActionSecondary(window.id, control.id)}/>))}

  </View>
);

WindowContent.propTypes = {
  window            : React.PropTypes.object.isRequired,
  ratio             : React.PropTypes.number.isRequired,
  onActionPrimary   : React.PropTypes.func.isRequired,
  onActionSecondary : React.PropTypes.func.isRequired,
};

export default WindowContent;
