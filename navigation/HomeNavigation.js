import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home/Home.js';
import Perfil from '../screens/home/Perfil.js';
import Mochila from '../screens/home/Mochila.js';

const Tab = createBottomTabNavigator();

function HomeNavigation()  {
  return (
    //<NavigationContainer>
      <Tab.Navigator initialRouteName="Mapa" 
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen name="Mapa" component={Home} />
        <Tab.Screen name="Mochila" component={Mochila} />
      </Tab.Navigator>
    //</NavigationContainer>
  );
}

export default HomeNavigation;