import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import { colors } from "../constants";

const Singup = (props) => {
    return(
        <View style={styles.screen}>
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