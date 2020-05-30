import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "../constants";


const Boton = (props) => {
    return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

Boton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: colors.WHITE,
    textAlign: "center",
    fontFamily: 'openSansBold',
  },

  buttonStyle: {
    paddingHorizontal: 55,
    paddingVertical: 13,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
  },
});

export default Boton;
