import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import { colors } from "../constants";
import BackTextBoton from '../components/BackTextBoton.js';

const Login = (props) => {
    return(
        <View style={styles.screen}>
            <BackTextBoton text="Inicio de Sesión" color={colors.PRIMARY} onPress={() => props.navigation.navigate('UnloggedHome')}/>
            <Text style={styles.text}>Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
    text: {
        fontFamily: 'openSansSemibold',
        fontSize: 14,
        color: colors.TEXT,
      },
});

export default Login;