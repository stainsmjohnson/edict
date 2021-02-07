import React from 'react';
import {StyleSheet, View, TouchableOpacity, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

const CountInput = ({value, onChange, onSubmit}) => {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.blur();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: theme.colors.border,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Button
          title="-5"
          onPress={() => {
            const newValue = Number(value) - 5 >= 0 ? Number(value) - 5 : 0;
            onChange(newValue);
          }}
          left
        />
        <Button
          title="-1"
          onPress={() => {
            const newValue = Number(value) - 1 >= 0 ? Number(value) - 1 : 0;
            onChange(newValue);
          }}
          left
        />
      </View>
      <TextInput
        ref={inputRef}
        keyboardType="numeric"
        // autoFocus
        onSubmitEditing={onSubmit}
        blurOnSubmit
        returnKeyLabel="add to cart"
        value={value}
        onChangeText={onChange}
        style={{
          flex: 1,
          color: theme.colors.text,
          fontSize: 18,
          fontWeight: '900',
          textAlign: 'center',
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <Button title="+1" onPress={() => onChange(Number(value) + 1)} right />
        <Button title="+5" onPress={() => onChange(Number(value) + 5)} right />
      </View>
    </View>
  );
};

const Button = ({title, onPress, left, right}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRightWidth: left ? 1 : 0,
        borderLeftWidth: right ? 1 : 0,
        borderColor: theme.colors.border,
      }}>
      <Text style={[styles.button, {color: theme.colors.primary}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CountInput;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
