import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


import { colors } from "../constants";

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    
  },
  errorText: {
    fontFamily: 'openSans',
    fontSize: 10,
    color: colors.ERROR
  }
})

export default ErrorMessage;