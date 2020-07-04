import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import HomeGuia from '../screens/home/HomeGuia.js';
import RecorridoActivo from '../screens/home/HomeGuiaRecorridoActivo.js';
import RecorridoEnCurso from '../screens/home/HomeGuiaRecorridoEnCurso.js';
import CrearRecorrido from '../screens/home/CrearRecorrido.js';
import IniciarRecorrido from '../screens/home/IniciarRecorrido.js';

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
      <Stack.Screen  name="Mapa" component={HomeGuia} />
      <Stack.Screen  name="CrearRecorrido" options={{gestureDirection: 'horizontal-inverted'}}component={CrearRecorrido} />
      <Stack.Screen  name="IniciarRecorrido" component={IniciarRecorrido} />
      <Stack.Screen  name="RecorridoActivo" component={RecorridoActivo} />
      <Stack.Screen  name="RecorridoEnCurso" component={RecorridoEnCurso} />
      </Stack.Navigator>
  );
}

export default MapNavigationGuia;