import React from "react";
import { View, Image,TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import { cancelarRecorrido } from '../store/actions/recorridoActivo';
import { iniciarRecorrido } from '../store/actions/recorridoActivo';

import Boton from "./Boton.js"
import LinkBoton from "./LinkBoton.js"
import { colors, images } from "../constants";

const RecorridoActivoGuia = (props) => {
  const horarioComienzo = props.horarioComienzo;
  const userToken = useSelector((state) => state.auth.token);
  const recorridoId = useSelector((state) => state.recorridoActivo.recorridoId);
  const usuariosInscriptos = props.usuariosInscriptos;

  let minutos;
  if (horarioComienzo.getMinutes() < 10){
      minutos = `0${horarioComienzo.getMinutes()}`;
  }else{
      minutos = `${horarioComienzo.getMinutes()}`;
  }  

  
  const dispatch = useDispatch();
  const handleCancelarRecorrido = () => {
    dispatch(cancelarRecorrido(userToken, recorridoId))
    .then((res)=>  props.cancelarRecorrido())
  };
  const handleIniciarRecorrido = () => {
    dispatch(iniciarRecorrido(userToken, recorridoId))
    .then((res)=>  props.comenzarRecorrido())
  };


    return (
        <View>
            <View style={styles.recorridoPorEmpezar}>
                <Text style={{ fontFamily: "openSansBold", fontSize: 16, color: colors.TEXT_DARK, }}>{props.nombreRecorrido}</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Image
                        source={images.crowd}
                        style={{ width: "25%" }}
                    ></Image>
                    <Text style={{ ...styles.text, marginLeft: 10, }}>{usuariosInscriptos}/{props.maxParticipantes} Turistas Inscriptos</Text>
                </View>
                <LinkBoton onPress={handleIniciarRecorrido} text={'Iniciar Recorrido'}/>
            </View>
            <View style={styles.horarioComienzoBox}>
                <Text style={{ ...styles.text, fontSize: 12, }}>Horario comienzo</Text>
                <Text style={{ fontFamily: "openSansBold", fontSize: 16, marginTop: 1, color: colors.TEXT_DARK, }}>{horarioComienzo.getHours()}:{minutos} hs</Text>
            </View>
            <View style={styles.cancelarRecorridoBox}>
                <Boton text={'Cancelar Recorrido'} customStyle={{ maxWidth: '100%', paddingHorizontal: 10, backgroundColor: colors.ERROR }} onPress={handleCancelarRecorrido} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    recorridoPorEmpezar: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 2/100,
        height: Dimensions.get('window').height * 20 / 100,
        width: Dimensions.get('window').width * 85 / 100,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', 
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1, 
        shadowRadius: 1, 
        elevation: 2, 
      },
      horarioComienzoBox: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 23/100,
        height: Dimensions.get('window').height * 8 / 100,
        width: Dimensions.get('window').width * 35 / 100,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left:' 58%',
        shadowColor: 'rgba(0,0,0, .4)', 
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1, 
        shadowRadius: 1, 
        elevation: 2, 
        
      },
      cancelarRecorridoBox: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 23/100,
        height: Dimensions.get('window').height * 8 / 100,
        width: Dimensions.get('window').width * 55 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        right: Dimensions.get('window').width * 44/ 100,
        shadowColor: 'rgba(0,0,0, .4)', 
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1, 
        shadowRadius: 1, 
        elevation: 2, 
        
      },
      text: {
        fontFamily: "openSansSemibold",
        fontSize: 14,
        color: colors.TEXT,
      },
});

export default RecorridoActivoGuia;
