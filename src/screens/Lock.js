import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useTheme, Card, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { User } from '../database/db';

const { width, height } = Dimensions.get('screen');

//comp
import Tabs from '../components/Tabs';
import { Button } from '../components';
import { Theme } from '../common/constants';

const Lock = ({ navigation }) => {
  const scrollViewRef = useRef();
  const scrollX = useState(new Animated.Value(0))[0];

  const theme = useTheme();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const setSelectedTab = tab => {
    scrollViewRef.current.scrollTo({
      x: width * tab.index,
      y: 0,
    });
  };
  return (
    <>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 24,
        }}>
        <Tabs scrollX={scrollX} onChange={setSelectedTab} />

        <ScrollView
          keyboardShouldPersistTaps="always"
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                width: width,
                height: '100%',
              }}>
              <Login navigation={navigation} />
            </View>
            <View
              style={{
                width: width,
                height: '100%',
              }}>
              <Signup
                navigation={navigation}
                onCreate={async ({ email, password, name }) => {
                  try {
                    const dbUser = await User.create({
                      name,
                      email,
                      password,
                    });
                    setSelectedTab({ index: 0 });
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('grahamstains1999@gmail.com');
  const [password, setPassword] = useState('abcd');

  const login = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const dbUser = await User.get({
        email,
        password,
      });
      console.log(`-----login success user ${dbUser.name} , ${dbUser.id}`);
      dispatch({
        type: 'login',
        payload: {
          user_id: dbUser.id,
          user_name: dbUser.name,
        },
      });
      navigation.navigate('DrowerNav');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View>
      <Card
        style={{
          marginHorizontal: 16,
          marginVertical: 24,
          paddingVertical: 24,
          paddingHorizontal: 12,
          height: '90%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}>
          <TextInput
            dense
            style={{ marginBottom: 16 }}
            label="Email"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon name="account" />}
          />
          <TextInput
            dense
            label="Password"
            secureTextEntry={!passwordVisible}
            left={<TextInput.Icon name="key" />}
            value={password}
            onChangeText={setPassword}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setPasswordVisible(pre => !pre)}
              />
            }
          />

          <TouchableOpacity
            onPress={() => alert('Under dev')}
            style={{
              alignSelf: 'flex-end',
              marginVertical: 16,
            }}>
            <Text
              style={{
                textAlign: 'right',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              Recover password?
            </Text>
          </TouchableOpacity>
          <Button primary onPress={login}>
            Login
          </Button>
        </View>
      </Card>
    </View>
  );
};

const Signup = ({ navigation, onCreate }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  return (
    <View>
      <Card
        style={{
          marginHorizontal: 16,
          marginVertical: 24,
          paddingVertical: 24,
          paddingHorizontal: 12,
          height: '90%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}>
          <ScrollView keyboardShouldPersistTaps="always">
            <TextInput
              dense
              style={{ marginBottom: 16 }}
              label="Fullname"
              value={name}
              onChangeText={setName}
              left={<TextInput.Icon name="text" />}
            />
            <TextInput
              dense
              style={{ marginBottom: 16 }}
              label="Email"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon name="mail" />}
            />
            <TextInput
              dense
              label="Password"
              secureTextEntry={!passwordVisible}
              style={{ marginBottom: 16 }}
              value={password}
              onChangeText={setPassword}
              left={<TextInput.Icon name="key" />}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => setPasswordVisible(pre => !pre)}
                />
              }
            />
            <TextInput
              dense
              style={{ marginBottom: 16 }}
              label="Confirm password"
              secureTextEntry={!passwordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              left={<TextInput.Icon name="key" />}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => setPasswordVisible(pre => !pre)}
                />
              }
            />

            <Button
              primary
              onPress={() => {
                if (
                  name &&
                  email &&
                  password &&
                  confirmPassword &&
                  password === confirmPassword
                ) {
                  onCreate({
                    email,
                    password,
                    name,
                  });
                } else {
                  alert('Fill all details');
                }
              }}>
              Create Account
            </Button>
          </ScrollView>
        </View>
      </Card>
    </View>
  );
};

export default Lock;

const styles = StyleSheet.create({});
