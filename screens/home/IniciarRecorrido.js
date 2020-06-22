import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import BackTextBoton from "../../components/BackTextBoton.js";
import { colors } from "../../constants";


const IniciarRecorrido = (props) =>{
return (
      <View style={styles.screen}>
      <BackTextBoton
        text="Volver a Mapa"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
        <Text style={styles.text}>Elija un recorrido</Text>
        <Text style={{...styles.text, fontFamily: "openSansItalic",}}>(lista de recorridos creados)</Text>
      </View>
    );
};


const styles = StyleSheet.create({
    screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
    text: {
      fontFamily: "openSansSemibold",
      fontSize: 14,
      color: colors.TEXT,
      textAlign: 'center'
    },
});

export default IniciarRecorrido;