import React, { useState, useEffect } from "react";
import MapView, {PROVIDER_GOOGLE ,Marker, Callout} from "react-native-maps";
import {  StyleSheet,  View,  Text,  Dimensions,  ActivityIndicator,  Alert,  TouchableOpacity} from "react-native";
import * as Location from "expo-location";

import Boton from "../../components/Boton.js";
import GuideMarker from "../../components/GuideMarker.js"
import { colors } from "../../constants";

const HomeGuia = (props) => {
  const [ isLocationPermissionGranted, setIsLocationPermissionGranted, ] = useState(null);
  const [location, setLocation] = useState(null);

  const handlePress = () => {
      Alert.alert(
        'value'
      )
  }

  /////PERMISOS
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setIsLocationPermissionGranted(false);
      }
      setIsLocationPermissionGranted(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });
  

  let text = "Esperando permisos...";
  if (!isLocationPermissionGranted) {
    text = "No puede utilizarse esta función si no otorgas permisos.";
  } 

  return (
    <View style={styles.screen}>
      {location ? (
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            showsUserLocation={true}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            
            <GuideMarker
              coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
              title={'Guía'} 
              onPress={handlePress}/>

              </MapView>
          
          <View  style={{position: "absolute", top: '84%', left: '48%', marginHorizontal: 50}}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('IniciarRecorrido')}}
                              style={{...styles.horizontalButton,  backgroundColor: colors.WHITE,}}><Text style={{...styles.buttonText, color: colors.PRIMARY,}}>¡Iniciar recorrido!</Text></TouchableOpacity>
          </View>
          <View  style={{position: "absolute", top: '91.5%', left: '48%', marginHorizontal: 50}}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('CrearRecorrido')}}
                              style={styles.horizontalButton}><Text style={styles.buttonText}>Crear recorrido</Text></TouchableOpacity>
          </View>
        </View>
      ) : (
        //Pantalla de carga
        <View>
          <Text style={{ marginBottom: 20 }}>{text}</Text>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};


//STYLES
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "openSansSemibold",
    fontSize: 14,
    color: colors.TEXT,
  },
  buttonText: {
    fontFamily: "openSansSemibold",
    fontSize: 12,
    color: colors.WHITE,
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  roundButton: {
    width: 70,
    height: 70,
    backgroundColor: colors.PRIMARY,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  horizontalButton: {
    width: 150,
    height: 50,
    backgroundColor: colors.PRIMARY,
    borderRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 }, 
    shadowOpacity: 1, 
    shadowRadius: 1, 
    elevation: 2, 
  },
});

export default HomeGuia;
