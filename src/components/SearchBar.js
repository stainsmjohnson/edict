import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const SearchBar = ({
  value,
  onChangeText,
  style,
  placeholder = 'Find',
  onLeftPress,
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          borderRadius: theme.roundness,
          overflow: 'hidden',
        },
        style,
      ]}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Icon
          name="bars"
          size={20}
          onPress={onLeftPress}
          style={{padding: 5}}
        />
      </View>

      <TextInput
        style={{backgroundColor: 'white', flex: 1}}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <View style={{backgroundColor: 'blue', height: '100%'}} />
    </View>
  );
};

const styles = StyleSheet.create({});
