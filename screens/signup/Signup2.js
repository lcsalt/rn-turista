import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  ScrollView,  Dimensions,} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from "formik";
import * as yup from 'yup';

import {setCuenta} from '../../store/actions/register.js'
import { colors } from "../../constants";
import BackTextBoton from "../../components/BackTextBoton.js";
import NextBoton from "../../components/NextBoton.js"
import TxtInput from "../../components/TxtInput.js";
import ErrorMessage from "../../components/ErrorMessage.js";

const Signup2 = (props) => {
  const email = useSelector(state => state.register.email);
  const celular = useSelector(state => state.register.celular);
  const password = useSelector(state => state.register.password);
 
  const dispatch = useDispatch();
  const setValues = (values) =>{
    dispatch(setCuenta(values));
  }
  //validaciones de formulario
  const validationSchema = yup.object().shape({
    email: yup.string()
      .label('E-mail')
      .required('Debe ingresar su E-mail')
      .lowercase()
      .trim()
      .email('Ingrese una dirección válida')
      .ensure('Debe ingresar su E-mail'),
    celular: yup.string()
     .label('celular')
     .required('Ingrese su número')
     .trim('Remueva los espacios')
     .matches(/^\d+$/, 'Ingrese sólo números')
     .min(7, 'Ingrese un número válido')
     .max(15, 'Ingrese un número válido')
     .ensure('Ingrese su número'),
    password: yup.string()
     .required('Debe ingresar una contraseña')
     .min(6, 'La contraseña debe ser de al menos 6 carácteres')
     .ensure('Debe ingresar una contraseña')  
  })
  return (
    <ScrollView style={styles.screen}>
      <BackTextBoton
        text="Volver a Identidad"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
      
      <Formik
        initialValues={{ email: email, celular: celular, password: password}}
        onSubmit={(values) => {
                              setValues(values);
                              props.navigation.navigate('Signup3');
                            }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Text style={styles.text}>Identidad</Text>

            <TxtInput
                isPassword={false} error={false}
                placeholder={'E-mail'}
                value={values.email.trim()}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")} 
                keyboardType={'email-address'}
                autoCapitalize={'none'} 
            />
            <ErrorMessage errorValue={touched.email && errors.email} />

            <TxtInput
                isPassword={false} error={false}
                placeholder={'Celular'}
                value={values.celular.trim()}
                onChangeText={handleChange("celular")}
                onBlur={handleBlur("celular")}
                keyboardType={'numeric'}
            />
            <ErrorMessage errorValue={touched.celular && errors.celular} />

            <TxtInput
                isPassword={true} error={false}
                placeholder={'Contraseña'}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize={'none'} 
            />
            <ErrorMessage errorValue={touched.password && errors.password} />

            <View style={styles.boton}>
            <NextBoton onPress={handleSubmit} text="Siguiente" />
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

export default Signup2;
