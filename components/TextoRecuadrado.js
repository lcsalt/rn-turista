import React from "react";
import { Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../constants";

const TextoRecuadrado = (props) => {
  let style;
  if (props.text == 'Guía'){
    style = [styles.textRecuadro, styles.colorsGuia]
  }else{
    style = [styles.textRecuadro, styles.colorsTurista]
  }
    return (
      <Text style={style}>{props.text.toUpperCase()}</Text>
  );
};

TextoRecuadrado.propTypes = {
    text: PropTypes.string.isRequired,
  };


  const styles = StyleSheet.create({
  textRecuadro:{
    fontFamily: "openSansSemibold",
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    textAlign:'center',
    paddingTop:6,
    paddingLeft:15,
    paddingRight:15,
    borderRadius: 10,
    borderWidth: 3,
  },
  colorsGuia: {
    color: colors.GUIDE,
    borderColor: colors.GUIDE,
  },
  colorsTurista: {
    color: colors.TURIST,
    borderColor: colors.TURIST,
  }
})

export default TextoRecuadrado;