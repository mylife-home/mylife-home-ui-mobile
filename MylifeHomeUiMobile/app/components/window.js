'use strict';

import React from 'react';

import { StyleSheet, Image, View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import { getPhysicalSize } from '../utils/viewport.js';
import WindowContent from './window-content';

const titleHeight = 50;

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
  },
  overlay: {
    position        : 'absolute',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, 0.6)',
    justifyContent  : 'center',
    alignItems      : 'center',
  },
  connectingImage: {
    width        : 120,
    height       : 90,
    borderWidth  : 0,
    borderRadius : 4
  },
  waitingImage: {
    width        : 90,
    height       : 90,
    borderWidth  : 0,
    borderRadius : 4
  },
  popupHeader: {
    position      : 'absolute',
    top           : 0,
    left          : 0,
    right         : 0,
    bottom        : 0,
    height        : titleHeight,
    justifyContent : 'center',
    alignItems     : 'center',
  },
  popupTitle: {
    fontSize : 16,
  },
  popupCloseButton: {
    position    : 'absolute',
    top         : 0,
    right       : 0,
    width       : titleHeight,
    height      : titleHeight,
  },
  popupContainer: {
    backgroundColor : 'rgb(255, 255, 255)',
    borderColor     : 'rgb(200, 200, 200)',
    borderWidth     : 1,
    borderRadius    : 4
  },
  popupContent: {
    position        : 'absolute',
    top             : titleHeight,
    left            : 0,
    right           : 0,
    bottom          : 0,
    borderColor     : 'rgb(200, 200, 200)',
    borderWidth     : 1,
  }
});

function popups(view, ratio, onActionPrimary, onActionSecondary, onWindowClose) {
  const components = [];

  for(const [index, popup] of view.popups.entries()) {
    const size = getPhysicalSize(ratio, popup);
    components.push(
      <TouchableWithoutFeedback key={`${index}`} onPress={onWindowClose}>
        <View style={styles.overlay}>
          {/* disable press on popup background */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.popupContainer, { height: size.height + titleHeight, width: size.width }]}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>{popup.id}</Text>
                <View style={styles.popupCloseButton}>
                  <Button onPress={onWindowClose} title={'x'} />
                </View>
              </View>
              <View style={styles.popupContent}>
                <WindowContent window={popup} ratio={ratio} onActionPrimary={onActionPrimary} onActionSecondary={onActionSecondary} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return components;
}

const Window = ({ online, view, ratio, onActionPrimary, onActionSecondary, onWindowClose }) => (
  <View style={styles.container}>
    {!online && (
      <View style={styles.overlay}>
        <Image source={require('../images/connecting.jpg')} style={styles.connectingImage} />
      </View>
    )}

    {online && !view && (
      <View style={styles.overlay}>
        <Image source={require('../images/spinner.gif')} style={styles.waitingImage} />
      </View>
    )}

    {online && view && (
      <WindowContent window={view.main} ratio={ratio} onActionPrimary={onActionPrimary} onActionSecondary={onActionSecondary} />
    )}

    {online && view && popups(view, ratio, onActionPrimary, onActionSecondary, onWindowClose)}
  </View>
);

Window.propTypes = {
  online            : React.PropTypes.bool.isRequired,
  view              : React.PropTypes.object,
  ratio             : React.PropTypes.number.isRequired,
  onActionPrimary   : React.PropTypes.func.isRequired,
  onActionSecondary : React.PropTypes.func.isRequired,
  onWindowClose     : React.PropTypes.func.isRequired,
};

export default Window;
