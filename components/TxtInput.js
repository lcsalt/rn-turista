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
  ];

  return (
      <View
        style={{
          overflow: "hidden",
          paddingBottom: 5,
          width: "70%",
          maxWidth: "80%",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <View style={inputStyles}>
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.TEXT_LIGHT}
            style={styles.input}
            value={props.value}
            secureTextEntry={props.isPassword}
            textContentType={props.type}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            keyboardType={props.keyboardType}
          />
        </View>
      </View>
      
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
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
});

export default TxtInput;

