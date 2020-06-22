import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import LinkBoton from "./LinkBoton.js";
import { colors, images } from "../constants";

const CoordinatePicker = ({ field, form, ...props }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);

  const inputStyles = [styles.border, styles.shadow];
  
  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const handleConfirmar = () => {
    form.setFieldValue(field.name, marker);
    toggleModal();
  };

  return (
    <View>
      <View style={{marginTop: 30, alignItems: 'center'}}>
      <TouchableOpacity style={styles.buttonStyle} onPress={toggleModal}>
        <Image
            source={images.mapPin}
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
                      latitude: location.coords.latitude || -34.59884 ,
                      longitude:  location.coords.longitude || -58.406216,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,}}
                onLongPress={(value) => setMarker(value.nativeEvent.coordinate) }
               >
              { marker ? (
                <Marker draggable
                coordinate={marker}
                onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
              />
              ) : (
                  null
              )}

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

export default CoordinatePicker;
