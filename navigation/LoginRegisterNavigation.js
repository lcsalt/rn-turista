import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import UnloggedHome from '../screens/UnloggedHome.js';

const Stack = createStackNavigator();

function LoginRegisterNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name=" " component={UnloggedHome} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default LoginRegisterNavigation;