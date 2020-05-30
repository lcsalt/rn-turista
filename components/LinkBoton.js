import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../constants";


const LinkBoton = (props) => {

    return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

LinkBoton.propTypes = {
  text: PropTypes.string.isRequired,
  //onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    color: colors.PRIMARY,
    textAlign: "center",
    fontFamily: 'openSansBold',
  },

  buttonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
});

export default LinkBoton;
