import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Avatar, Caption, Card, Text, useTheme } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen');

const PreviewScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const total = cart.reduce((total, item) => {
    return total + item.cost * item.count;
  }, 0);

  const onDelete = id => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card
        style={{
          width: '90%',
          height: '90%',
          overflow: 'hidden',
          position: 'relative',
        }}>
        <DataTable>
          <FlatList
            data={cart}
            ListHeaderComponent={() => (
              <DataTable.Header
                style={{
                  backgroundColor: theme.colors.card,
                }}>
                <DataTable.Title>IMAGE</DataTable.Title>
                <DataTable.Title sortDirection="descending">
                  ITEM
                </DataTable.Title>
                <DataTable.Title numeric>COUNT/PRICE</DataTable.Title>
                <DataTable.Title numeric>TOTAL</DataTable.Title>
                <DataTable.Title numeric>ACTIONS</DataTable.Title>
              </DataTable.Header>
            )}
            ListFooterComponent={() => (
              <DataTable.Row>
                <DataTable.Title>Total</DataTable.Title>
                <DataTable.Title numeric> {total}/-</DataTable.Title>
              </DataTable.Row>
            )}
            stickyHeaderIndices={[0]}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>
                  <Avatar.Image source={{ uri: item.image }} size={35} />
                </DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell
                  numeric>{`${item.count} ${item.measurementIn} * ${item.cost} `}</DataTable.Cell>
                <DataTable.Cell numeric>{`${
                  item.cost * item.count
                } /-`}</DataTable.Cell>
                <DataTable.Cell
                  numeric
                  onPress={() => onDelete(item.id)}
                  centered>
                  <Icon name="times-circle" size={20} />
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      </Card>
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({});
