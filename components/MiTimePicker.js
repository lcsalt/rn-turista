import React, { useState, useEffect} from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import {Picker} from '@react-native-community/picker';

import { colors } from "../constants";

const ModalTimePicker = (props) => {
  const [hora, setHora] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const pickableHours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  const pickableMinutes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,
                                                         23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,
                                                         43,44,45,46,47,48,4,50,51,52,53,54,55,56,57,58,59];
  const inputStyles = [styles.border, styles.shadow];
  useEffect(()=>{
    const selectedTime = {hora: hora, minutos: minutos};
    console.log(selectedTime);
    props.setFieldValue(selectedTime);
  });

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View style={{ overflow: "hidden", paddingBottom: 5, width: "70%", maxWidth: "80%", marginTop: 15, marginBottom: 15,}}>
        <View style={inputStyles}>
        <View style={styles.pickers}>
              <Picker
                style={styles.picker}
                selectedValue={hora}
                onValueChange={(itemValue) => setHora(itemValue)}
              >
                {pickableHours.map((hour) => {
                  return (
                    <Picker.Item
                      key={hour}
                      value={hour}
                      label={`${hour.toString()}`}
                    />
                  );
                })}
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={minutos}
                onValueChange={(itemValue) => setMinutos(itemValue)}
              >
                {pickableMinutes.map((minutes) => {
                  return (
                    <Picker.Item
                      key={minutes}
                      value={minutes}
                      label={`${minutes.toString()}`}
                    />
                  );
                })}
              </Picker>
            </View>
        </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  picker: {
    flex: 1,
  },
  pickers: {
    flexDirection: 'row',
  },
});

export default ModalTimePicker;
