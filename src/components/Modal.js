import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import ReactNativeModal from 'react-native-modal';
const {width, height} = Dimensions.get('screen');
const Modal = (props) => {
  const {children, onDismiss, visible} = props;
  return (
    <ReactNativeModal
      isVisible={visible}
      hardwareAccelerated
      animationIn="zoomIn"
      animationOut="zoomOut"
      onDismiss={onDismiss}
      animationInTiming={300}
      animationOutTiming={300}
      deviceHeight={height}
      deviceWidth={width}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      statusBarTranslucent
      avoidKeyboard
      {...props}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      presentationStyle="overFullScreen">
      {children}
    </ReactNativeModal>
  );
};

export default Modal;

const styles = StyleSheet.create({});
