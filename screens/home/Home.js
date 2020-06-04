import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import { colors } from "../../constants";


const Home = (props) =>{
return (
      <View style={styles.screen}>
        <Text style={styles.text}>Mapa</Text>
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
});

export default Home;