import React, { useState, useEffect } from "react";
import {  View,  StyleSheet,  Button,  Text,  Dimensions,  TouchableOpacity,  TextInput,  Image,  ActivityIndicator} from "react-native";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from "react-native-maps";

import LinkBoton from "./LinkBoton.js";
import { colors, images } from "../constants";

const MultiCoordinatePicker = ({ field, form, ...props }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([{index: -1, coordinates: {"latitude": 0, "longitude": 0}},]);
  const [allCoordinates, setAllCoordinates] = useState([{latitude: 0, longitude: 0}]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      if(!unmounted){
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
    return () => { unmounted = true };
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const handleConfirmar = () => {
    form.setFieldValue(field.name, markers);
    toggleModal();
  };

  const addMarker = (coordinates) =>{
    console.log(coordinates);
    if (markers[0].index == -1){
        const position = 0;
        const newMarker = {index: position, coordinates: coordinates};
        setMarkers([newMarker]);
        setAllCoordinates([coordinates]);
    }else {
        const position = markers.length;
        const newMarker = {index: position, coordinates: coordinates};
        setMarkers([...markers, newMarker]);
        setAllCoordinates([...allCoordinates, coordinates]);
    }  
  }    
    
  

  const moveMarker = (index, coordinates) =>{
     const removedMarkerList = markers.filter(marker => marker.index != index);
     const newCoordinateList = allCoordinates.splice(index,1,coordinates);
     const newMarker = {index: index, coordinates: coordinates};
     setMarkers([...removedMarkerList, newMarker])
     setAllCoordinates([...newCoordinateList]);
}
  

  return (
    <View>
      <View style={{marginTop: 30, alignItems: 'center'}}>
      <TouchableOpacity style={styles.buttonStyle} onPress={toggleModal}>
        <Image
            source={images.mapRoute}
            style={{width: "65%", height: "65%",}}
            resizeMode="contain"
          ></Image>
      </TouchableOpacity>
      
      <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.TEXT_LIGHT}
            style={styles.textInput}
            editable={false}
        />
      </View>

      {location ? (
      <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                showsUserLocation={true}
                initialRegion={{
                      latitude: location.coords.latitude,
                      longitude:  location.coords.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,}}
                onLongPress={(value) => addMarker(value.nativeEvent.coordinate) }
               >

                 { //Coloca todos los markers
                    markers.map((marker) => {
                        return (<Marker draggable
                                     key={marker.index}
                                     image={images.mapPoint}
                                     coordinate={marker.coordinates}
                                     title={(marker.index).toString(10)}
                                     onDragEnd={(e) => moveMarker(marker.index, e.nativeEvent.coordinate)}
                            />
                        );
                    })
                }
                <Polyline
                  coordinates={allCoordinates}
                  strokeColor={colors.PRIMARY}
                  strokeWidth={2}
                  lineCap={'round'}
                />


              </MapView>
              <View style={{flexDirection: "row",}}>
                <LinkBoton text="Confirmar" onPress={handleConfirmar} textStyle={{color: colors.PRIMARY_LIGHT}}/>
              </View>
           
          </View>
      </Modal>
      ) : (
        <Modal isVisible={isModalVisible}>
          <ActivityIndicator size="small" color={colors.PRIMARY} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 0,
    borderColor: "transparent",
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  border: {
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomWidth: 3,
    borderRadius: 4,
    borderBottomColor: "rgba(173, 181, 189, 0.5)",
  },
  shadow: {
    shadowColor: colors.TEXT_LIGHT,
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 0,
  },
  buttonStyle: {
    width: 60,
    height: 60,
    backgroundColor: colors.PRIMARY_LIGHT,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: (Dimensions.get("window").width * 80) / 100,
    height: (Dimensions.get("window").height * 80) / 100,
    zIndex: -1,
  },
});

export default MultiCoordinatePicker;
