import React, { useState, useEffect } from "react";
import MapView, {  PROVIDER_GOOGLE,  Marker,  Callout,  Polyline,} from "react-native-maps";
import {  StyleSheet,  View,  Text,  Dimensions,  ActivityIndicator,  Alert,  TouchableOpacity,  Image,} from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

import { CommonActions } from "@react-navigation/native";


import { unirseRecorrido } from '../../store/actions/recorridoActivo';
import GuideMarker from "../../components/GuideMarker.js";
import { colors, images } from "../../constants";
import DetalleRecorrido from "../../components/DetalleRecorrido.js";

const io = require("socket.io-client");


const HomeTurista = (props) => {
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState(null);
  const [guiasLocations, setGuiasLocations] = useState(null);
  const [guiasKeys, setGuiasKeys] = useState([""]);
  const [recorridoDetalle, setRecorridoDetalle] = useState(null); //al clickear en el icono de un guía, se busca el recorrido y se guarda acá

  const userToken = useSelector((state) => state.auth.token);
  const estadoRecorrido = useSelector((state) => state.recorridoActivo.estado);

  /////PERMISOS , CURRENT POSITION , SOCKET
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
          props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "RecorridoActivo" }],}));
        }else if (estadoRecorrido == "En curso"){
          props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "RecorridoEnCurso" }],}));
        }
      }
    })();
    if (!unmounted) {
      
      const socket = io("https://sheltered-bastion-34059.herokuapp.com/");
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
      socket.on("guidesData", (recorridosActivos)=>{
        console.log(recorridosActivos);
        if(recorridosActivos.length <1 ){
          console.log('no hay recorridos')
          setGuiasLocations(null);
          setGuiasKeys([''])
          return;
        }
          const locacionesGuia = recorridosActivos.map((recorrido)=>{
            return {
              key: recorrido.id,
              coordinates: recorrido.locationActual,
              }
          })
          const locacionesKeys = recorridosActivos.map((recorrido)=>{
            return recorrido.key;
          })
          setGuiasLocations([...locacionesGuia]);
          setGuiasKeys([...locacionesKeys]);
        
      })
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const handleGetRecorrido = (key) => {
    console.log(key)
    const recorridoId = key.toString()
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    });
    let success = fetch(
      "https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/"+recorridoId,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((response) => {
          console.log(response);
          setRecorridoDetalle(response);
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

  const cancelarDetalle = () =>{
    setRecorridoDetalle(null);
  }
  
  const dispatch = useDispatch();
  const joinRecorrido = (recorridoId) => {
    setIsSubmitting(true);
    let success;
    success =  dispatch(unirseRecorrido(userToken, recorridoId));
    if (!success) {
      setIsSubmitting(false);
      Alert.alert('Error', 'Hubo un error al iniciar el recorrido.')
    }else{
      setTimeout(()=>{ props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "RecorridoActivo" }]}))}, 2000);
      
    }
   
  }

  let text = "Cargando...";
  if (!isLocationPermissionGranted) {
    text = "No puede utilizarse esta función si no otorgas permisos.";
  }

  return (
    <View style={styles.screen}>
      {location && !isSubmitting ? (
        <View>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
           {guiasLocations ? (
             guiasLocations.map((guideData) => {
                return (
                  <GuideMarker
                    key={guideData.key}
                    coordinate={guideData.coordinates}
                    onPress={() => handleGetRecorrido(guideData.key)}
                  />
                );
              }))
            : null}

            {recorridoDetalle ? (
              <Marker
              key={'PuntoInicio'}
              coordinate={ recorridoDetalle.recorrido.recorrido.puntoInicio}
              title={'Punto de Partida'}
            />
            )
            :(null)}
            {recorridoDetalle ? (
               //Coloca todos los markers
                recorridoDetalle.recorrido.recorrido.recorrido.map((marker) => {
                    return (<Marker
                        key={marker.index}
                        image={images.mapPoint}
                        coordinate={marker.coordinates}
                        title={(marker.index).toString(10)}
                    />
                    );
                })
            )
            :(null)}
            {recorridoDetalle ? (
               <Polyline
               coordinates={recorridoDetalle.recorrido.recorrido.recorrido.map((marker) => {
                return marker.coordinates
               })}
               strokeColor={colors.PRIMARY}
               strokeWidth={2}
               lineCap={'round'}
              />
            )
            :(null)}

        </MapView>
        
        {recorridoDetalle ? (
          <DetalleRecorrido
           horarioComienzo={new Date(recorridoDetalle.recorrido.horarioComienzo)}
           duracion={recorridoDetalle.recorrido.recorrido.duracionMinutos}
           nombreRecorrido={recorridoDetalle.recorrido.recorrido.nombre}
           idioma={recorridoDetalle.recorrido.recorrido.idioma}
           maxParticipantes={recorridoDetalle.recorrido.recorrido.maxParticipantes}
           cancelar={()=> cancelarDetalle()}
           unirse={()=> joinRecorrido(recorridoDetalle.recorrido._id)}
           />
           
       )
       :(null)}
       </View>
      ) : (
        //Pantalla de Carga
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

export default HomeTurista;
