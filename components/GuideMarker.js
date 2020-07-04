import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import {Marker, Callout} from "react-native-maps";
import { images } from "../constants";


const GuideMarker = (props) => {
    return (
        <Marker coordinate={props.coordinate} title={props.title}
            onPress={props.onPress}>
            <Image source={images.iconGuiaMap} />
        </Marker>
  );
};

/*const styles = StyleSheet.create({
    plainView: {
        width: 60,
      },
});
*/
export default GuideMarker;
