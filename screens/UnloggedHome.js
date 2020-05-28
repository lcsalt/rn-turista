import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import Colors from "../constants/Colors.js";
import Boton from "../components/Boton.js";
import LinkBoton from "../components/LinkBoton.js";
import MarginTop from "../decorator_components/MarginTop.js";

const UnloggedHome = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={require("../assets/inicioImg.png")}
          style={styles.image}
          resizeMode="cover"
        ></Image>
        <Text style={styles.logoText}>Turista</Text>
      </View>


      <View style={styles.container}>
        <Boton text={"EMPEZAR"} onPress={() => {}} />
        <MarginTop size={40}>
          <Text style={styles.textHome}>¿Ya tienes cuenta?</Text>
          <LinkBoton text={"Iniciar sesión"} />
        </MarginTop>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginVertical: 40,
  },
  container: {
    marginTop: 100,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: 255,
  },
  logoText: {
    fontSize: 53,
    fontFamily: "paytone-one",
    color: Colors.PRIMARY,
  },
  textHome: {
    fontFamily: "open-sans-semibold",
    fontSize: 14,
    color: Colors.TEXT,
  },
});

export default UnloggedHome;