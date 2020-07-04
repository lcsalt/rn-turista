import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import HomeTurista from '../screens/home/HomeTurista.js';
import RecorridoActivo from '../screens/home/HomeTuristaRecorridoActivo.js';

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

function MapNavigationGuia() {
  return (
    <Stack.Navigator  initialRouteName="Mapa" 
                      screenOptions={{headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    transitionSpec: {open: config, close: closeConfig,},
                                    }}
                      animation="fade">
      <Stack.Screen  name="Mapa" component={HomeTurista} />
      <Stack.Screen  name="RecorridoActivo" component={RecorridoActivo} />
      </Stack.Navigator>
  );
}

export default MapNavigationGuia;