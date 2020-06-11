import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';

import Signup1 from '../screens/signup/Signup1.js';
import Signup2 from '../screens/signup/Signup2.js';
import Signup3 from '../screens/signup/Signup3.js';
import SendValues from '../screens/signup/SendValues.js';

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

function SignupNavigation() {

  return (
    <Stack.Navigator  initialRouteName="Signup1" 
                      screenOptions={{headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    transitionSpec: {open: config, close: closeConfig,},
                                    }}
                      animation="fade">
      <Stack.Screen  name="Signup1" component={Signup1} />
      <Stack.Screen  name="Signup2" component={Signup2} />
      <Stack.Screen  name="Signup3" component={Signup3} />
      <Stack.Screen  name="SendValues" component={SendValues} />
      
    </Stack.Navigator>
  );
}

export default SignupNavigation;