import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import { colors } from "../constants";
import BackTextBoton from '../components/BackTextBoton.js';

const Singup = (props) => {
    return(
        <View style={styles.screen}>
             <BackTextBoton text="Crear Cuenta" color={colors.PRIMARY} onPress={() => props.navigation.goBack()}/>
            <Text style={styles.text}>Singup</Text>
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

export default Singup;