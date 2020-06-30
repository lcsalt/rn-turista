import React from "react";
import { Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../constants";

const TextoRecuadrado = (props) => {
    return (
      <Text style={styles.textRecuadro}>{props.text}</Text>
  );
};

TextoRecuadrado.propTypes = {
    text: PropTypes.string.isRequired,
  };


  const styles = StyleSheet.create({
  textRecuadro:{
    fontFamily: "openSansSemibold",
    fontSize: 20,
    color: TextoRecuadrado.propTypes.text==="Guia" ? colors.GUIDE : colors.TURIST,
    marginBottom: 10,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: TextoRecuadrado.propTypes.text==="Guia" ? colors.GUIDE : colors.TURIST 
  }
})

export default TextoRecuadrado;