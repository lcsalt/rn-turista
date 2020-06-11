import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { colors } from "../constants";


const LoadingBoton = (props) => {
    return (
    <TouchableOpacity style={styles.buttonStyle} >
      <ActivityIndicator size="small" color={colors.WHITE} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: colors.WHITE,
    textAlign: "center",
    fontFamily: 'openSansBold',
  },

  buttonStyle: {
    maxWidth: '60%',
    paddingHorizontal: 55,
    paddingVertical: 17,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
  },
});

export default LoadingBoton;
