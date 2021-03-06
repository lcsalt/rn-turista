import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-community/picker";

import { Field, Form, Formik, FormikProps } from "formik";
import { colors } from "../constants";

const SelectInput = ({ field, form, ...props }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const inputStyles = [styles.border, styles.shadow];

  const handleValueChange = (selectedVal) => {
    setSelectedValue(selectedVal);
    form.setFieldValue(field.name, selectedVal);
  };


  return (
    <View style={{ overflow: "hidden", paddingBottom: 5, width: "70%", maxWidth: "80%", marginTop: 25,marginBottom: 15, }}>
      <View style={inputStyles}>
        <Picker
          selectedValue={selectedValue}
          style={{ width: '100%', ...styles.picker }}
          onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
        >
            { //options prop recibe un array
            props.options.map((item, index) => {
             return (< Picker.Item label={item} value={item} key={index} />);})}   
        </Picker>
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
  border: {
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomWidth: 3,
    borderRadius: 4,
    borderBottomColor: 'rgba(173, 181, 189, 0.5)',
  },
  shadow: {
    shadowColor: colors.TEXT_LIGHT,
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 0,
  },
  picker: {
    borderWidth: 0,
    borderColor: "transparent",
  }
});

export default SelectInput;
