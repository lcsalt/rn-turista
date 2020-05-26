import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors.js";
import BackArrow from '../assets/backArrow.svg';

const BackTextBoton = (props) => {

    return (
    <TouchableOpacity style={styles.buttonStyle}>
      <BackArrow  width={12.25} height={17.5}fill={props.color}/>
      <Text style={{...styles.textStyle, color: props.color}}>{props.text}</Text>
    </TouchableOpacity>
  );
};

BackTextBoton.propTypes = {
  text: PropTypes.string.isRequired,
  //onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 16,
      color: Colors.PRIMARY,
      textAlign: "center",
      fontFamily: "open-sans-bold",
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
