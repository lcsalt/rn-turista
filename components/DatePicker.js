import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {Field, Form, Formik, FormikProps} from 'formik';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { colors } from "../constants";

const DatePicker = ({field, form, ...props}) => {
  const [dateString, setDateString] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const inputStyles = [styles.border, styles.shadow];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (selectedDate) => {
    hideDatePicker(); 
    const dateParsed = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1,selectedDate.getDate());
    setDateString(`${selectedDate.getDate().toString()}/${(selectedDate.getMonth() + 1).toString()}/${selectedDate.getFullYear().toString()}`);
    form.setFieldValue(field.name, dateParsed);
  };


  

  return (
    <View style={{width: '100%', alignItems: "center"}}>
      <TouchableOpacity onPress={showDatePicker}
        style={{ overflow: "hidden", paddingBottom: 5, width: "70%", maxWidth: "80%", marginTop: 15, marginBottom: 15,}}>
        <View style={inputStyles}>
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.TEXT_LIGHT}
            style={styles.input}
            value={dateString}
            secureTextEntry={props.isPassword}
            textContentType={props.type}
            //onChangeText={form.setFieldValue('fechaDeNacimiento', dateString)}
            //onBlur={form.setFieldValue('fechaDeNacimiento', dateString)}
            editable={false}
          />

        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
});

export default DatePicker;
