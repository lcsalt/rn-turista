import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useDispatch } from 'react-redux';

import { setLogout } from '../../store/actions/auth';
import { colors } from "../../constants";
import Boton from "../../components/Boton";


const Perfil = (props) =>{
  
  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch( setLogout() );
  }
  
return (
      <View style={styles.screen}>
        <Boton text={"Cerrar Sesión"} onPress={handleLogout} />
        <Text style={styles.text}>Perfil</Text>
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

export default Perfil;