import React from "react";
import { StyleSheet, View, Text, ImageBackground, Dimensions } from "react-native";

import { colors, images } from "../constants";
import BackTextBoton from "../components/BackTextBoton.js";
import Boton from '../components/Boton.js';
import TxtInput from '../components/TxtInput.js';

const Login = (props) => {
  return (
    <View style={styles.screen}>
    <ImageBackground source={images.backgroundImg}  style={{width: '100%', height: '100%'}}>
    <BackTextBoton text="Inicio de Sesión" color={colors.WHITE} onPress={() => props.navigation.navigate("UnloggedHome")}/>
      <View style={styles.login}>
        
        <Text style={styles.logoText}>Turista</Text>
        
        <View style={styles.box}></View>
        <TxtInput
            placeholder={"E-mail"}
            isPassword={false}
            onChangeText={()=>{}}
            onBlur={()=>{}}
            keyboardType={'email-address'}
            alternative={true}
          />
          <TxtInput
            placeholder={"Contraseña"}
            isPassword={true}
            onChangeText={()=>{}}
            onBlur={()=>{}}
            alternative={true}
          />
        <View style={styles.box}></View>
        <View style={styles.boton}>
          <Boton text={"Entrar"} onPress={() => {}} />
        </View>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
  },
  login: {
    alignSelf: 'center',
    marginVertical: Dimensions.get('window').height * 7 / 100,
    height: Dimensions.get('window').height * 70 / 100,
    width: Dimensions.get('window').width * 90 / 100,
    backgroundColor: colors.WHITE_DARK,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: Dimensions.get('window').height * 7 / 100,
    fontFamily: 'paytoneOne',
    color: colors.PRIMARY,
  },
  boton: {
    marginTop: 20,
    marginBottom: Dimensions.get('window').height * 2 / 100,
    paddingHorizontal: Dimensions.get('window').width * 9 / 100,
  },
  box: {
    marginVertical: Dimensions.get('window').height * 2 / 100,
  }

});

export default Login;
