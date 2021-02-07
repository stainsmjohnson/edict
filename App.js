import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DarkTheme, DefaultTheme} from './src/common/constants';
import {
  useTheme,
  Provider as PaperProvider,
  Text,
  Portal,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import store from './src/redux/store';
import {Provider as ReduxProvider} from 'react-redux';

import LockScreen from './src/screens/Lock';
import BillingScreen from './src/screens/BillScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import StatsScreen from './src/screens/StatScreen';
import MyStoreScreen from './src/screens/MyStore';
import {SearchBar} from './src/components';

//font Poppins - 700
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function RecoverPasswordScreen() {
  return (
    <View>
      <StatusBar hidden={false} />
      <Text>PASSWORD RECOVERRY</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View>
      <StatusBar hidden={false} />
      <Text>SettingsScreen SettingsScreen</Text>
    </View>
  );
}

function TabNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bills" options={{}}>
        {(prop) => <BillingScreen {...prop} val={props.val} />}
      </Tab.Screen>
      <Tab.Screen name="Prints" component={PreviewScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}

function DrowerNavigator() {
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="TabNav"
      screenOptions={{
        header: (props) => (
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            onLeftPress={props.scene.descriptor.navigation.openDrawer}
            style={{
              margin: 10,
            }}
          />
        ),
      }}>
      <Drawer.Screen
        name="TabNav"
        options={{
          drawerLabel: 'Home',
          headerShown: true,
        }}>
        {(props) => <TabNavigator {...props} val={searchValue} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="MyStore" component={MyStoreScreen} />
      {/* Logout button */}
    </Drawer.Navigator>
  );
}

function App() {
  const dark = useColorScheme();
  const THEME = dark === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={THEME}>
        <NavigationContainer theme={THEME}>
          <Stack.Navigator>
            <Stack.Screen
              name="Lock"
              component={LockScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPasswordScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DrowerNav"
              component={DrowerNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
