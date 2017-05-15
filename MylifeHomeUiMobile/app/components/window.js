'use strict';

import React from 'react';

import { StyleSheet, Image, View } from 'react-native';

import WindowContent from './window-content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth  : 1,
    borderRadius : 4
  },
  waitingImage: {
    width        : 90,
    height       : 90,
    borderWidth  : 1,
    borderRadius : 4
  }
});

function popups(view, onActionPrimary, onActionSecondary, onWindowClose) {
  const components = [];
/*
  for(const [index, popup] of view.popups.entries()) {
    components.push(<div key={`${index}_overlay`} className="mylife-overlay" onTouchTap={onWindowClose} />);
    components.push(
      <div key={`${index}_dialog`} className="mylife-window-popup">
        <div className="modal-content" title={popup.id}>
          <div className="modal-header">
            <button onTouchTap={onWindowClose} className="close">x</button>
            <h4 className="modal-title">{popup.id}</h4>
          </div>
          <div className="modal-body">
            <WindowContent window={popup} onActionPrimary={onActionPrimary} onActionSecondary={onActionSecondary} />
          </div>
        </div>
      </div>
    );
  }
*/
  return components;
}

const Window = ({ online, view, onActionPrimary, onActionSecondary, onWindowClose }) => (
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
      <WindowContent window={view.main} onActionPrimary={onActionPrimary} onActionSecondary={onActionSecondary} />
    )}

    {online && view && popups(view, onActionPrimary, onActionSecondary, onWindowClose)}
  </View>
);

Window.propTypes = {
  online            : React.PropTypes.bool.isRequired,
  view              : React.PropTypes.object,
  onActionPrimary   : React.PropTypes.func.isRequired,
  onActionSecondary : React.PropTypes.func.isRequired,
  onWindowClose     : React.PropTypes.func.isRequired,
};

export default Window;
