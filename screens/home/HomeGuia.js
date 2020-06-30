import React, { useState, useEffect } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

import GuideMarker from "../../components/GuideMarker.js";
import { colors, images } from "../../constants";

const io = require("socket.io-client");
const socket = io("https://sheltered-bastion-34059.herokuapp.com/");

const HomeGuia = (props) => {
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [guiasLocations, setGuiasLocations] = useState(null);
  const [guiasKeys, setGuiasKeys] = useState([""]);
  const [recorridoDetalle, setRecorridoDetalle] = useState(null); //al clickear en el icono de un guía, se busca el recorrido y se guarda acá

  const userToken = useSelector((state) => state.auth.token);
  const estadoRecorrido = useSelector((state) => state.recorridoActivo.estado);

  /////PERMISOS Y CURRENT POSITION
  useEffect(() => {
    let unmounted = false;
    console.log(estadoRecorrido);
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setIsLocationPermissionGranted(false);
      }
      setIsLocationPermissionGranted(true);
      if (!unmounted) {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        if (estadoRecorrido == "Por empezar") {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "RecorridoActivo" }],
            })
          );
        }
      }
    })();
    if (!unmounted) {
      socket.on("guideData", (location) => {
        if (!guiasLocations) {
          setGuiasLocations([location]);
          setGuiasKeys([location.key]);
        } else {
          if (guiasKeys.includes(location.key)) {
            const newGuiasLocations = guiasLocations.filter((guideData) => {
              return guideData.key != location.key;
            });
            console.log("ubicacion recibida: ", location.coordinates);
            newGuiasLocations.push(location);
            setGuiasLocations([...newGuiasLocations]);
          } else {
            setGuiasLocations([...guiasLocations, location]);
            setGuiasKeys([...guiasKeys, location.key]);
          }
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const handleGetRecorrido = async (key) => {
    //fetch get key=recorridoId
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    });
    let success = await fetch(
      "https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/" +
      key,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((response) => {
          //setRecorridoDetalle(response);
          console.log(response);
          return true;
        });
      } else if (res.status === 500) {
        Alert.alert("Error", "Hubo un error, intenta nuevamente");
        setIsLoading(false);
        return false;
      } else {
        console.log(res.status);
        setIsLoading(false);
        return false;
      }
    });
  };

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
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Guía"}
              onPress={() => { }}
            />
            {guiasLocations
              ? guiasLocations.map((guideData) => {
                return (
                  <GuideMarker
                    key={guideData.key}
                    coordinate={guideData.coordinates}
                    onPress={() => handleGetRecorrido(guideData.key)}
                  />
                );
              })
              : null}
          </MapView>

          <View style={{position: "absolute",marginHorizontal: 50,bottom: (Dimensions.get("window").height * 1) / 100,left: "48%",}}>
            <View style={{}}>
              <TouchableOpacity onPress={() => {props.navigation.navigate("IniciarRecorrido");}} style={{...styles.horizontalButton, backgroundColor: colors.WHITE,}}>
                <Text style={{ ...styles.buttonText, color: colors.PRIMARY }}> ¡Iniciar recorrido! </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity onPress={() => {props.navigation.navigate("CrearRecorrido");}} style={styles.horizontalButton}>
                <Text style={styles.buttonText}>Crear recorrido</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  horizontalButton: {
    width: 150,
    height: 50,
    backgroundColor: colors.PRIMARY,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default HomeGuia;
