import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../constants";
import BackArrow from '../assets/images/backArrow.svg';

const BackTextBoton = (props) => {

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <BackArrow  width={12.25} height={17.5}fill={props.color}/>
      <Text style={{...styles.textStyle, color: props.color}}>{props.text}</Text>
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
      marginLeft: 30
    },
  
    buttonStyle: {
      marginTop: 30,
      marginLeft: 15,
      backgroundColor: 'transparent',
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
  });

export default BackTextBoton;
