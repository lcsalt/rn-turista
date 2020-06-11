import React, { useState, } from "react";
import { StyleSheet, View, Text, ImageBackground, Dimensions,  Modal, ActivityIndicator } from "react-native";
import { useDispatch } from 'react-redux';

import { login } from '../store/actions/auth';
import { colors, images } from "../constants";
import BackTextBoton from "../components/BackTextBoton.js";
import Boton from '../components/Boton.js';
import LoadingBoton from '../components/LoadingBoton.js';
import TxtInput from '../components/TxtInput.js';

const Login = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) =>{
    setEmail(value);
  };
  const handlePasswordChange = (value) =>{
    setPassword(value);
  };
  
  const dispatch = useDispatch();
  const handleLogin = async () =>{
      await setIsLoggingIn(true);
      let success;
      success = await dispatch(login({'email': email, 'password': password }));
      if (!success) {
        setIsLoggingIn(false);
      }
  }

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
            value={email}
            onChangeText={handleEmailChange}
            onBlur={()=>{}}
            keyboardType={'email-address'}
            alternative={true}
            autoCapitalize={'none'} 
          />
          <TxtInput
            placeholder={"Contraseña"}
            isPassword={true}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={()=>{}}
            alternative={true}
            autoCapitalize={'none'} 
          />
        <View style={styles.box}></View>
        <View style={styles.boton}>
          {isLoggingIn ? (
            <LoadingBoton />
          ) : (
            <Boton text={"Entrar"} onPress={handleLogin} />
          )}
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
  screenModal: {
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  text: {
    color: colors.TEXT_LIGHT,
    fontSize: 12,
    fontFamily: "openSans",
  },

});

export default Login;


/*<Modal animationType="fade" transparent={true} visible={isLoggingIn}>
      <View style={styles.screenModal}>
        <ActivityIndicator size="small" color={colors.PRIMARY} />
        <Text style={styles.text}>Iniciando sesión...</Text>
      </View>
    </Modal> */