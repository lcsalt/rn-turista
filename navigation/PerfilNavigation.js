import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import EditarPerfil from '../screens/home/EditarPerfil.js';
import Perfil from "../screens/home/Perfil.js";

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

function PerfilNavigation() {
  return (
    <Stack.Navigator  initialRouteName="Perfil" 
                      screenOptions={{headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    transitionSpec: {open: config, close: closeConfig,},
                                    }}
                      animation="fade">
      <Stack.Screen  name="Perfil" component={Perfil} />
      <Stack.Screen  name="EditarPerfil" options={{gestureDirection: 'horizontal-inverted'}} component={EditarPerfil} />
      </Stack.Navigator>
  );
}

export default PerfilNavigation;