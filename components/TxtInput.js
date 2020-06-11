import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";

import { colors } from "../constants";

const TxtInput = (props) => {
  const inputStyles = [
    styles.border,
    styles.shadow,
    //props.success && styles.focus,
    props.error && styles.error,
    props.alternative && styles.alternative
  ];

  const innerInputStyles = [
    styles.input,
    props.alternative && styles.alternativeInner,
  ]

  const outerInputStyles = [
    styles.outer,
    props.alternative && styles.alternativeOuter,
  ]

  return (
      <View style={outerInputStyles}>
        <View style={inputStyles}>
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.TEXT_LIGHT}
            style={innerInputStyles}
            value={props.value}
            secureTextEntry={props.isPassword}
            textContentType={props.type}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
          />
        </View>
      </View>
      
  );
};

const styles = StyleSheet.create({
  outer: {
    overflow: "hidden",
    paddingBottom: 5,
    width: "70%",
    maxWidth: "80%",
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderRadius: 4,
    padding: 10,
    borderColor: "transparent",
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  success: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
  },
  error: {
    borderBottomWidth: 1,
    borderBottomColor: colors.ERROR,
  },
  border: {
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomWidth: 0.5,
    borderRadius: 4,
    borderBottomColor: colors.TEXT_LIGHT,
  },
  shadow: {
    shadowColor: colors.TEXT_LIGHT,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
    elevation: 4,
  },
  alternative: {
    borderWidth:0,
    borderRadius: 5,
    borderBottomColor: 'transparent',
    shadowColor: '#C1C6CC',
    shadowRadius: 8,
    shadowOpacity: 0.01,
    elevation: 2,
  },
  alternativeInner: {
    borderRadius: 5,
    padding: 10,
    borderColor: "transparent",
    height: 55,
  },
  alternativeOuter : {
    width: "82%",
    maxWidth: "85%",
    marginTop: 15,
    marginBottom: 15,
  }
});

export default TxtInput;

