import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors.js";

const Boton = (props) => {

    return (
    <TouchableOpacity style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

Boton.propTypes = {
  text: PropTypes.string.isRequired,
  //onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },

  buttonStyle: {
    paddingHorizontal: 55,
    paddingVertical: 13,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
});

export default Boton;
