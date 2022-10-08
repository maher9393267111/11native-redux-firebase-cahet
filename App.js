import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './lib/screens/welcome/WelcomeScreen';
import SignInScreen from './lib/screens/signIn/SignInScreen';
import { COLORS } from './lib/constants/colors';
import SignUpScreen from './lib/screens/signUp/SignUpScreen';
import DiscussionsScreen from './lib/screens/discussions/DiscussionsScreen';
import ChatScreen from './lib/screens/chat/ChatScreen';

import { Provider } from "react-redux";
import { store } from "./lib/redux/store";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.white
  },
};

export default function App(){
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Discussions"
          component={DiscussionsScreen}
        />
         <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};