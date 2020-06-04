import React from "react";
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import UnloggedHome from '../screens/UnloggedHome.js';
import Login from '../screens/Login.js';
import SignupNavigation from './SignupNavigation.js';
//temporalmente
import HomeNavigation from './HomeNavigation.js';

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
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear
  }
};

function LoginRegisterNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName="UnloggedHome" 
                      screenOptions={{headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    transitionSpec: {open: config, close: closeConfig,},
                                    }}
                      animation="fade">
      <Stack.Screen  name="UnloggedHome" component={UnloggedHome} />
      <Stack.Screen  name="Login" options={{gestureDirection: 'horizontal-inverted'}}component={Login} />
      <Stack.Screen  name="SignupNavigation" component={SignupNavigation} />
      <Stack.Screen  name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default LoginRegisterNavigation;