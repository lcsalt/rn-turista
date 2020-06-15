import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

import { colors } from "../../constants";

const Home = (props) => {
  const [
    isLocationPermissionGranted,
    setIsLocationPermissionGranted,
  ] = useState(null);
  const [location, setLocation] = useState(null);

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
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.screen}>
      {location ? (
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      ) : (
        <View>
          <Text style={{marginBottom: 20}}>{text}</Text>

          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Home;
