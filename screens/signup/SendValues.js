import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Alert } from 'react-native';


import { colors } from "../../constants";

const SendValues = (props) => {
  const [isSendComplete, setIsSendComplete] = useState(false);

  const values = props.user;


  const confirmarRegistro = () => {
    console.log(values);
    fetch('https://sheltered-bastion-34059.herokuapp.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    })
    .then((response) => {
      console.log(response.status);
      if (response.status != 200){
        Alert.alert('Error', 'El registro no pudo realizarse.');
        props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "SignupNavigation" }]}))
      }else{
        setIsSendComplete(true);
      }
    })
    };
    

  if (!isSendComplete) {
    return (
      <View style={styles.screen}>
        {confirmarRegistro()}
        <ActivityIndicator size="small" color={colors.PRIMARY} />
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
    marginTop: 10,
  },
});

function mapStateToProps(state) {
  return {
    user: state.register,
  };
}

export default connect(mapStateToProps)(SendValues);
