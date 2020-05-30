import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import UnloggedHome from '../screens/UnloggedHome.js';
import Login from '../screens/Login.js';
import Singup from '../screens/Singup.js';

const Stack = createStackNavigator();

function LoginRegisterNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="UnloggedHome">
      <Stack.Screen name="UnloggedHome" component={UnloggedHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Singup" component={Singup} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default LoginRegisterNavigation;