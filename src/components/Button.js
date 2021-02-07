import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

export const Button = (props) => {
  const {primary} = props;
  return <PaperButton mode={primary ? 'contained' : 'text'} {...props} />;
};

const styles = StyleSheet.create({});
