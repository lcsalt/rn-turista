import React, { useState, useEffect } from "react";
import {  StyleSheet,  View,  Text,  ScrollView,  Dimensions,} from "react-native";
import { useSelector, useDispatch} from 'react-redux';
import { Field, Form, Formik, FormikProps } from "formik";
import * as yup from 'yup';

import {setRole} from '../../store/actions/register.js'
import { colors } from "../../constants";
import BackTextBoton from "../../components/BackTextBoton.js";
import Boton from "../../components/Boton.js"
import SelectInput from "../../components/SelectInput.js";
import ErrorMessage from "../../components/ErrorMessage.js";



const Signup3 = (props) => {
  const role = useSelector(state => state.register.role);
 
  //envía valores a reducer
  const dispatch = useDispatch();
  const setValues = (values) =>{
    dispatch(setRole(values));
  };

  //opciones rol
  const opcionesRole = ['Elija una opción','Turista', 'Guía']
  //validaciones de formulario
  const validationSchema = yup.object().shape({
    role: yup.string()
      .label('Role')
      .lowercase()
      .matches(/(guía|turista)/,'Elija una opción' )
      .required('Debe elegir una opción')
      .ensure('Debe elegir una opción'),
  });

  return (
    <ScrollView style={styles.screen}>
      <BackTextBoton
        text="Volver a Cuenta"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
      
      <Formik
        initialValues={{ role: role}}
        onSubmit={(values) => {
                            setValues(values);
                            
                            props.navigation.navigate('SendValues');
            
                            }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Text style={styles.text}>¿Serás un Guía o un Turista?</Text>

            <Field name='role' placeholder='Role' component={SelectInput} options={opcionesRole} />
            <ErrorMessage errorValue={touched.role && errors.role} />

            <View style={styles.boton}>
            <Boton onPress={handleSubmit}
                  text="Crear Cuenta" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  form: {
    marginVertical: Dimensions.get('window').height * 5 / 100,
    alignItems: "center",
  },
  text: {
    fontFamily: "openSansSemibold",
    fontSize: 14,
    color: colors.TEXT,
  },
  boton: {
    marginTop: Dimensions.get('window').height * 5 / 100,
    marginBottom: Dimensions.get('window').height * 5 / 100,
  },
});


export default Signup3;
