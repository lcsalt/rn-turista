import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";


import { colors } from "../../constants";

const SendValues = (props) => {
  const [isSendComplete, setIsSendComplete] = useState(false);

  const values = props.user;


  const confirmarRegistro = () => {
    setTimeout(() => {
      console.log(values);
      setIsSendComplete(true);
    }, 3000);
  };

  if (!isSendComplete) {
    return (
      <View style={styles.screen}>
        {confirmarRegistro()}
        <Text style={styles.text}>Confirmando registro...</Text>
      </View>
    );
  }
  return (
    <View>
      {props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Login" }]}))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "openSansSemibold",
    fontSize: 14,
    color: colors.TEXT,
  },
});

function mapStateToProps(state) {
  return {
    user: state.register,
  };
}

export default connect(mapStateToProps)(SendValues);
