import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Item } from './Item';
import { Divider, Headline } from 'react-native-paper';

export const Section = ({ item, onPress }) => {
  return (
    <View>
      <Headline
        style={{
          padding: 16,
        }}>
        {item.title}
      </Headline>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={item.items}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Item item={item} onPress={onPress} />}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});
