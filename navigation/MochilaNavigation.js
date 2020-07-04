import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import MochilaDetails from '../screens/home/MochilaDetails.js';
import Mochila from "../screens/home/Mochila.js";

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

function MochilaNavigation() {
  return (
    <Stack.Navigator  initialRouteName="Mochila" 
                      screenOptions={{headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    transitionSpec: {open: config, close: closeConfig,},
                                    }}
                      animation="fade">
      <Stack.Screen  name="Mochila" component={Mochila} />
      <Stack.Screen  name="MochilaDetails" options={{gestureDirection: 'horizontal'}} component={MochilaDetails} />
      </Stack.Navigator>
  );
}

export default MochilaNavigation;