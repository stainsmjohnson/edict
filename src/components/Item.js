import React, { useRef } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Text,
  Card,
  Caption,
  TouchableRipple,
  useTheme,
  Subheading,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CountInput from './CountInput';
import Modal from './Modal';

const getDefaultCount = measurementIn => {
  switch (measurementIn) {
    case 'kg':
      return '2';
    case 'l':
      return '2';
    case 'n':
      return '5';
    case 'g':
      return '200';
    default:
      return '5';
  }
};

export const Item = ({
  item: { name, image, measurementIn, cost, id },
  onPress,
}) => {
  const [itemModalVisible, setItemModalVisible] = React.useState(false);
  const [count, setCount] = React.useState(getDefaultCount(measurementIn));
  const theme = useTheme();
  const SIZE = 100;
  const onSubmit = () => {
    if (count <= 0) return;
    setItemModalVisible(false);
    onPress({ name, id, cost, count, measurementIn, image });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          margin: 10,
        }}
        onPress={() => {
          setItemModalVisible(true);
          // modalRef.current.focus();
        }}>
        <>
          <Card
            style={{
              width: SIZE,
              height: SIZE,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: image }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </Card>
          <Caption>{name}</Caption>
        </>
      </TouchableOpacity>
      <Modal
        visible={itemModalVisible}
        onDismiss={() => setItemModalVisible(false)}>
        <View
          style={{
            width: 300,
            height: 400,
            backgroundColor: theme.colors.card,
            borderRadius: theme.roundness,
            overflow: 'hidden',
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => setItemModalVisible(false)}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 2,
            }}>
            <Icon name="times-circle" size={35} />
          </TouchableOpacity>
          <View style={{ width: '100%', height: '50%', position: 'relative' }}>
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                left: 20,
                bottom: 20,
                borderRadius: 20,
                padding: 10,
                backgroundColor: theme.colors.accent,
                borderWidth: 1,
                borderColor: theme.colors.border,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {cost}/{measurementIn}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              padding: 24,
            }}>
            <Subheading>{`How much?  (${measurementIn})`}</Subheading>
            <CountInput
              onSubmit={onSubmit}
              value={count}
              onChange={value => setCount(`${value > 0 ? Number(value) : 0}`)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({});
