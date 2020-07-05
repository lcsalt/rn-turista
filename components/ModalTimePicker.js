import React, { useState, useEffect, } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";

import { Field, Form, Formik, FormikProps } from "formik";
import {Picker} from '@react-native-community/picker';

import LinkBoton from "./LinkBoton.js";
import { colors } from "../constants";
import { set } from "react-native-reanimated";

const ModalTimePicker = (props) => {
  const [timeString, setTimeString] = useState("");
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [fueElegida, setFueElegida] = useState(false);
  const [hora, setHora] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [minutosTexto, setMinutosTexto] = useState('00');
  let allHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  let pickableMinutes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,
                                                         23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,
                                                         43,44,45,46,47,48,4,50,51,52,53,54,55,56,57,58,59];
  const inputStyles = [styles.border, styles.shadow];
  
  useEffect(()=>{
    if (!fueElegida){
      setHora(new Date().getHours()+1)
    }
  })
   const hours = new Date().getHours();
   const minutes = new Date().getMinutes();
   const pickableHours = allHours.filter((hora) => {
      return hora >= hours;
    });
  

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = () => {
    hideTimePicker();
    setFueElegida(true);
    if(minutos < 10){
      setMinutosTexto('0'+minutos)
    }else{
      setMinutosTexto(minutos)
    }
    const selectedTime = {hora: hora, minutos: minutos};
    props.setFieldValue(selectedTime);
  };

  return (
    <View style={{ width: "50%", alignItems: "center" , marginTop: 15,}}>
      <TouchableOpacity
        onPress={showTimePicker}
        style={{
          overflow: "hidden",
          paddingBottom: 5,
          width: "80%",
          maxWidth: "80%",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <View style={inputStyles}>
          <View style={styles.input}>
            {fueElegida? (
              <Text style={{textAlign: "center",fontSize: 18,}}> {hora}:{minutosTexto} hs </Text>
            ):(
              <Text style={{ color: colors.TEXT, textAlign: "center",fontSize: 16,}}> Presione para elegir </Text>
            )}
            
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTimePickerVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           
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
                itemStyle={{ textAlign: 'center'}}
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
            <LinkBoton text={"Confirmar"} onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    flex: 1,
  },
  pickers: {
    flexDirection: 'row',
  },
});

export default ModalTimePicker;
