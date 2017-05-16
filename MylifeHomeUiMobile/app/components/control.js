'use strict';

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { getPhysicalSize, getPhysicalPosition } from '../utils/viewport.js';

import { utils } from 'mylife-home-ui-common';

const styles = StyleSheet.create({
  wrapper: {
    position   : 'absolute',
    top        : 0,
    left       : 0,
    right      : 0,
    bottom     : 0,
  },
  image: {
    position   : 'absolute',
    top        : 0,
    left       : 0,
    right      : 0,
    bottom     : 0,
    resizeMode : 'contain'
  },
  text: {
    position : 'absolute',
    top      : 0,
    left     : 0,
    right    : 0,
    bottom   : 0
  },
  active: {
    borderWidth  : 1,
    borderRadius : 4,
    borderColor  : 'rgb(200, 200, 200)'
    // TODO: animate on hover
  }
});

function getStyleSizePosition(control) {
  return {
    ... getPhysicalSize(control),
    ... getPhysicalPosition(control)
  };
}

class Control extends React.PureComponent {

  constructor(props) {
    super(props);

    this.inputManager = new utils.InputManager();
    this.configureInputManager(props);
  }

  componentWillReceiveProps(nextProps) {
    this.configureInputManager(nextProps);
  }

  configureInputManager(props) {
    const { onActionPrimary, onActionSecondary } = props;
    this.inputManager.config = {
      s  : onActionPrimary,
      l  : onActionSecondary,
      ss : onActionSecondary
    };
  }

  renderInner(control) {
    return (
      <View style={styles.wrapper}>
        {control.display && (<Image style={styles.image} source={{ uri: `data:image/png;base64,${control.display}`}} />)}
        {control.text && (<Text style={styles.text}>{control.text}</Text>)}
      </View>
    );
  }

  render() {
    const { control } = this.props;

    return (
      <View style={[{ position : 'absolute' }, getStyleSizePosition(control), control.active && styles.active]}>
        {control.active ? (
          <TouchableHighlight style={styles.wrapper}
                              onPressIn={() => this.inputManager.down()}
                              onPressOut={() => this.inputManager.up()}
                              delayPressIn={0}
                              delayPressOut={0}>
            {this.renderInner(control)}
          </TouchableHighlight>
        ) : (
          this.renderInner(control)
        )}
      </View>
    );
  }
}

Control.propTypes = {
  control           : React.PropTypes.object.isRequired,
  onActionPrimary   : React.PropTypes.func.isRequired,
  onActionSecondary : React.PropTypes.func.isRequired,
};

export default Control;
