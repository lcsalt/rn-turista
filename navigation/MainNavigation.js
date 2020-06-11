import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import { useSelector } from "react-redux";

import LoginRegisterNavigation from "./LoginRegisterNavigation.js";
import HomeNavigation from "./HomeNavigation.js";

const Stack = createStackNavigator();

function MainNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}
                       animation="fade">
        {isLoggedIn ? (
            <Stack.Screen name="HomeNavigation" component={HomeNavigation}
            options={{ animationEnabled: false, }} />
        ) : (
            <Stack.Screen name="LoginRegisterNavigation" component={LoginRegisterNavigation}
            options={{ animationEnabled: false, }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
