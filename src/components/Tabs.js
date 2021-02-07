import React from 'react';
import {StyleSheet, View, Dimensions, Animated} from 'react-native';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {Theme} from '../common/constants';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const TAB_HEIGHT = 40;
const WIDTH = Dimensions.get('screen').width - 50;

const Tabs = ({style, scrollX, onChange}) => {
  const theme = useTheme();
  const tabs = [{title: 'Login'}, {title: 'Create User'}];

  const changeTab = (tab) => {
    const index = tabs.findIndex((item) => item.title === tab.title);
    onChange({...tab, index});
  };

  const xpos = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, WIDTH / tabs.length],
  });
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.roundness,
          borderColor: theme.colors.primary,
        },
        style,
      ]}>
      {tabs.map((item) => (
        <TouchableRipple
          key={item.title}
          style={styles.item}
          onPress={() => changeTab(item)}>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableRipple>
      ))}
      <Animated.View
        style={[
          styles.bar,
          {
            width: WIDTH / tabs.length,
            backgroundColor: theme.colors.primary,
            transform: [{translateX: xpos}],
          },
        ]}
      />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: WIDTH,

    borderWidth: 2,
  },
  item: {
    flex: 1,
    height: TAB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    fontSize: 18,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    textTransform: 'uppercase',
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 6,
  },
  bar: {
    height: TAB_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
