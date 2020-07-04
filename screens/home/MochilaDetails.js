import React, {useState, useEffect} from "react";
import { StyleSheet, View, Dimensions,Text, ActivityIndicator ,TouchableOpacity} from "react-native";
import { useDispatch, useSelector} from 'react-redux';
import BackTextBoton from "../../components/BackTextBoton";
import MapView, {  PROVIDER_GOOGLE,  Marker,  Callout,  Polyline,} from "react-native-maps";
import * as Location from "expo-location";
import { colors, images } from "../../constants";



const MochilaDetails= ({ route,navigation },props) =>{
  recorridoDetalle = route.params.rec;
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [unmounted, setUnmounted] =useState(false)

  useEffect(() => {

    if(!unmounted){
     { console.log(`mochila details: ${recorridoDetalle.recorrido.puntoInicio}`)}
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setIsLocationPermissionGranted(false);
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setUnmounted(true)
      })();
    
  }}
  );
  let text = 'Waiting..';
  if (!location) {
    return(<View>
      <Text style={styles.screen}>{text}</Text>
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>)
  } else {

  return (
    <View style={styles.conteiner}>
      {location ? (
        <View style={styles.screen}>
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
          
            {recorridoDetalle ? (
              <Marker
              key={'PuntoInicio'}
              coordinate={ recorridoDetalle.recorrido.puntoInicio}
              title={'Punto de Partida'}
            />
            )
            :(null)}
            {recorridoDetalle ? (
               //Coloca todos los markers
                recorridoDetalle.recorrido.recorrido.map((marker) => {
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
               coordinates={recorridoDetalle.recorrido.recorrido.map((marker) => {
                return marker.coordinates
               })}
               strokeColor={colors.PRIMARY}
               strokeWidth={3}
              />
            )
            :(null)}

        </MapView>
      
        </View>
      ):(null)}
  </View>
      )
}
}  

      

const styles = StyleSheet.create({
    conteiner: {
      flex: 1,
      backgroundColor: colors.WHITE,
     // alignItems: "center",
    //  justifyContent: "center",
    },
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
      textAlign: 'center'
    },
    mapStyle: {
      flex: 1,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      zIndex: -1,
    },
});

export default MochilaDetails;