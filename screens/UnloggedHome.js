import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";


import Boton from "../components/Boton.js";
import LinkBoton from "../components/LinkBoton.js";
import MarginTop from "../decorator_components/MarginTop.js";
import { colors, images } from "../constants";

const UnloggedHome = (props) => {  

  return (
    <View style={styles.screen}>

      <View style={styles.containerTop}>
        <Image
          source={images.inicioImg}
          style={styles.image}
          resizeMode="contain"
        ></Image>
        <Text style={styles.logoText}>Turista</Text>
      </View>


      <View style={styles.containerBottom}>
        <Boton text={"EMPEZAR"} onPress={() => {props.navigation.navigate('Singup')}} />
        <MarginTop size={40}>
          <Text style={styles.textHome}>¿Ya tienes cuenta?</Text>
          <LinkBoton text={"Iniciar sesión"} onPress={() => {props.navigation.navigate('Login')}} />
        </MarginTop>
      </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  containerTop: {
    marginTop: Dimensions.get('window').height * 10 / 100,
    paddingHorizontal: Dimensions.get('window').width * 9 / 100,
    alignItems: "center",
  },
  containerBottom: {
    marginBottom: Dimensions.get('window').height * 10 / 100,
    paddingHorizontal: Dimensions.get('window').width * 9 / 100,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "54%",
  },
  logoText: {
    fontSize: Dimensions.get('window').height * 6.6 / 100,
    fontFamily: 'paytoneOne',
    color: colors.PRIMARY,
  },
  textHome: {
    fontFamily: 'openSansSemibold',
    fontSize: 14,
    color: colors.TEXT,
  },
});

export default UnloggedHome;