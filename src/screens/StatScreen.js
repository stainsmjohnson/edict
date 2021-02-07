import React from 'react';
import {Image, StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Caption,
  Card,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from 'react-native-responsive-linechart';

const {width, height} = Dimensions.get('screen');

const StatScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableRipple
        onPress={() => alert('No data available!!')}
        borderless
        style={{
          position: 'absolute',
          top: 25,
          right: 20,
          zIndex: 2,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 18,
            }}>
            hasdbsjdh
          </Text>
          <Icon name="chevron-down" size={18} color={theme.colors.text} />
        </View>
      </TouchableRipple>
      <Chart
        style={{height: '100%', width: '100%'}}
        padding={{left: 40, bottom: 20, right: 20, top: 20}}
        xDomain={{min: -2, max: 10}}
        disableGestures
        // disableTouch
        yDomain={{min: 0, max: 20}}>
        <VerticalAxis
          tickCount={10}
          theme={{
            labels: {
              formatter: (v) => v.toFixed(2),
              label: {
                color: theme.colors.text,
              },
            },
            ticks: {
              visible: true,
              stroke: {
                color: '#fff',
                width: 1,
                opacity: 1,
              },
            },
            grid: {
              visible: true,
              stroke: {
                color: '#ccc',
                width: 0.5,
                opacity: 1,
                dashArray: [],
              },
            },
            axis: {
              visible: true,
              stroke: {
                color: '#bbb',
                width: 1,
                opacity: 1,
                dashArray: [],
              },
              dx: 0,
            },
          }}
        />
        <HorizontalAxis />
        <Area
          theme={{
            gradient: {
              from: {color: theme.colors.accent, opacity: 0.7},
              to: {color: theme.colors.accent, opacity: 0.4},
            },
          }}
          smoothing="cubic-spline"
          data={[
            {x: -2, y: 15},
            {x: -1, y: 10},
            {x: 0, y: 12},
            {x: 5, y: 8},
            {x: 6, y: 12},
            {x: 9, y: 13.5},
            {x: 10, y: 15},
          ]}
        />
        <Area
          theme={{
            gradient: {
              from: {color: theme.colors.primary, opacity: 0.7},
              to: {color: theme.colors.primary, opacity: 0.3},
            },
          }}
          smoothing="cubic-spline"
          data={[
            {x: -2, y: 0},
            {x: -1, y: 2},
            {x: 0, y: 7},
            {x: 2, y: 5},
            {x: 3, y: 12},
            {x: 7, y: 16},
            {x: 9, y: 17},
            {x: 10, y: 12},
          ]}
        />
      </Chart>
    </View>
  );
};

export default StatScreen;

const styles = StyleSheet.create({});
