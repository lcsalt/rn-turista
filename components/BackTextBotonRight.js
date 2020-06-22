import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../constants";
import NextArrow from "../assets/images/nextArrow.svg";

const BackTextBoton = (props) => {

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={{...styles.textStyle, color: props.color}}>{props.text}</Text>
      <NextArrow width={12.25} height={17.5} fill={props.color}/>
    </TouchableOpacity>
  );
};

BackTextBoton.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 16,
      color: colors.PRIMARY,
      textAlign: "center",
      fontFamily: 'openSansBold',
      marginRight: 30
    },
  
    buttonStyle: {
      marginTop: 50,
      marginRight: 15,
      backgroundColor: 'transparent',
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
    },
  });

export default BackTextBoton;
