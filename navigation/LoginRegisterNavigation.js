import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UnloggedHome from '../screens/UnloggedHome.js';
import Login from '../screens/Login.js';
import Singup from '../screens/Singup.js';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function LoginRegisterNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="UnloggedHome" screenOptions={{headerShown: false, transitionSpec: {open: config, close: config,}}}>
      <Stack.Screen  name="UnloggedHome" component={UnloggedHome} />
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen  name="Singup" component={Singup} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default LoginRegisterNavigation;