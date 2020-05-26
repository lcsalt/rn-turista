import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font';

import Colors from './constants/Colors.js';
import Boton from './components/Boton.js';
import LinkBoton from './components/LinkBoton.js';
import MarginTop from './decorator_components/MarginTop.js';
import BackTextBoton from './components/BackTextBoton.js';


const fetchFonts = () => {
   return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'open-sans-semibold-italic': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-bold-italic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-light-italic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    'paytone-one': require('./assets/fonts/PaytoneOne-Regular.ttf'),

  });
};

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onError={(error) => console.log(error)}
      onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
          <Image source={require('./assets/inicioImg.png')} style={styles.image} resizeMode='cover'></Image>
          <Text style={styles.logoText}>Turista</Text>
      </View>
      <View style={styles.container}>
      
          <Boton  text={'EMPEZAR'} />
          <MarginTop size={40}>
          <Text style={styles.textHome}>¿Ya tienes cuenta?</Text>
          <LinkBoton text={'Iniciar sesión'} />
          
          </MarginTop>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginVertical: 40
  },
  container: {
    marginTop: 100,
    paddingHorizontal: 40,   
    alignItems: 'center'
  },
  image: {
    width: '95%',
    height: 255,
  },
  logoText: {
    fontSize: 53,
    fontFamily: 'paytone-one',
    color: Colors.PRIMARY,
  },
  textHome: {
    fontFamily: 'open-sans-semibold',
    fontSize: 14,
    color: Colors.TEXT,
  },
});

