import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../constants";

import NextArrow from "../assets/images/nextArrow.svg";

const NextBoton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
     
      <NextArrow width={16.25} height={21.5} fill={'#fff'}/>
      
    </TouchableOpacity>
  );
};

NextBoton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 60,
    height: 60,
    backgroundColor: colors.PRIMARY,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default NextBoton;

//
