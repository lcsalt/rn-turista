import React from "react";
import { View, Image,TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";


import Boton from "./Boton.js"
import LinkBoton from "./LinkBoton.js"

import { colors, images } from "../constants";

const DetalleRecorrido = (props) => {
  const horarioComienzo = props.horarioComienzo;
  const duracion = props.duracion;
  const nombreRecorrido = props.nombreRecorrido;
  const idioma = props.idioma;
  const maxParticipantes = props.maxParticipantes;

  let minutos;
  if (horarioComienzo.getMinutes() < 10){
      minutos = `0${horarioComienzo.getMinutes()}`;
  }else{
      minutos = `${horarioComienzo.getMinutes()}`;
  }  

  
  const handleCancelar = () => {
    props.cancelar();
  };


    return (
        <View>
            <View style={styles.recorridoPorEmpezar}>
                <Text style={{ fontFamily: "openSansBold", fontSize: 16, color: colors.TEXT_DARK, }}>{nombreRecorrido}</Text>
                
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={{ ...styles.text,}}>{idioma}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={{ ...styles.text, marginLeft: 10, }}>0/{maxParticipantes} Turistas Inscriptos</Text>
                </View>
                <LinkBoton text={'¡Unirse!'} customStyle={{ maxWidth: '100%', paddingHorizontal: 10, backgroundColor: colors.PRIMARY }} onPress={props.unirse} />

            </View>
            <View style={styles.horarioComienzoBox}>
                <Text style={{ ...styles.text, fontSize: 12, }}>Horario comienzo</Text>
                <Text style={{ fontFamily: "openSansBold", fontSize: 16, marginTop: 1, color: colors.TEXT_DARK, }}>{horarioComienzo.getHours()}:{minutos} hs</Text>
            </View>
            <View style={{...styles.horarioComienzoBox, bottom: Dimensions.get("window").height * 32/100,}}>
                <Text style={{ ...styles.text, fontSize: 12, }}>Duración</Text>
                <Text style={{ fontFamily: "openSansBold", fontSize: 16, marginTop: 1, color: colors.TEXT_DARK, }}>{duracion} min.</Text>
            </View>
            <View style={styles.cancelarRecorridoBox}>
                <Boton text={'Cancelar'} customStyle={{ maxWidth: '100%', paddingHorizontal: 10, backgroundColor: colors.ERROR }} onPress={handleCancelar} />
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
        right: Dimensions.get('window').width * 54/ 100,
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

export default DetalleRecorrido;
