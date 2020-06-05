import React from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from "react-native";

import { colors } from "../../constants";


const Home = (props) =>{
return (
      <View style={styles.screen}>
        <MapView style={styles.mapStyle} />
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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default Home;