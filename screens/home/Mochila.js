import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import { colors } from "../../constants";


const Mochila = (props) =>{
return (
      <View style={styles.screen}>
        <Text style={styles.text}>Mochila</Text>
        <Text style={styles.text}>Una mochila en donde se guardan tus ultimos recorridos, sitios cerca recomendados
         y preguntas frecuentes.</Text>
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
      textAlign: 'center'
    },
});

export default Mochila;