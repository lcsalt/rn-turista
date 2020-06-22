import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import { colors } from "../constants";
import MapNavigationGuia from "./MapNavigationGuia.js";
import HomeTurista from "../screens/home/HomeTurista.js";
import Perfil from "../screens/home/Perfil.js";
import Mochila from "../screens/home/Mochila.js";

const Tab = createBottomTabNavigator();

function HomeNavigation() {
  const role = useSelector((state) => state.auth.role);

  
  
  
  if (role == 'Turista'){
    return (
      <Tab.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
      
          if (route.name === "Perfil") {
            return <FontAwesome name="user-circle-o" size={size} color={color} />;
          } else if (route.name === "Mapa") {
            return <Feather name="map" size={size} color={color} />;
          } else if (route.name === "Mochila") {
            return <MaterialCommunityIcons name="bag-personal-outline" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: "gray",
      }}
      >
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Mapa" component={HomeTurista} />
      <Tab.Screen name="Mochila" component={Mochila}  />
      </Tab.Navigator>
    );
  }
   
  return (
      <Tab.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
      
          if (route.name === "Perfil") {
            return <FontAwesome name="user-circle-o" size={size} color={color} />;
          } else if (route.name === "Mapa") {
            return <Feather name="map" size={size} color={color} />;
          } else if (route.name === "Mochila") {
            return <MaterialCommunityIcons name="bag-personal-outline" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: "gray",
      }}
      >
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Mapa" component={MapNavigationGuia} />
      <Tab.Screen name="Mochila" component={Mochila}  />
      </Tab.Navigator>   
    );
  
  
}


export default HomeNavigation;

