import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  ScrollView,  Dimensions,} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import {Field, Form, Formik, FormikProps} from 'formik';
import * as yup from 'yup';

import {setIdentidad} from '../../store/actions/register.js'
import { colors } from "../../constants";
import BackTextBoton from "../../components/BackTextBoton.js";
import NextBoton from "../../components/NextBoton.js";
import DatePicker from "../../components/DatePicker.js";
import TxtInput from "../../components/TxtInput.js";
import SelectInput from "../../components/SelectInput.js";
import ErrorMessage from "../../components/ErrorMessage.js";

const Signup1 = (props) => {
  //trae valores del reducer de registro
  const nombre = useSelector(state => state.register.nombre);
  const apellido = useSelector(state => state.register.apellido);
  const fechaDeNacimiento = useSelector(state => state.register.fechaDeNacimiento);
  const genero = useSelector(state => state.register.genero);

  //envía valores al reducer de registro
  const dispatch = useDispatch();
  const setValues = (values) =>{
    dispatch(setIdentidad(values));
  }
  //géneros
  const opcionesGenero = ['Género','Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo']
  //hoy
  const hoy = new Date();
  //validaciones de formulario
  const validationSchema = yup.object().shape({
    nombre: yup.string()
      .label('Nombre')
      .required('Debe ingresar su nombre')
      .min(2, 'Debe ingresar su nombre')
      .max(50, 'Ingrese solo su primer nombre')
      .lowercase()
      .ensure(),
    apellido: yup.string()
      .label('Apellido')
      .required('Debe ingresar su apellido')
      .min(2, 'Debe ingresar su apellido')
      .lowercase()
      .ensure(),
    fechaDeNacimiento: yup.string()
      .required('Debe ingresar una fecha'),
     genero: yup.string()
     .matches(/(Masculino|Femenino|Otro|Prefiero no decirlo)/,'Elija una opción' )
     .ensure()
     .required('Elija una opción')
  })
  

  return (
    <ScrollView style={styles.screen}>
      <BackTextBoton
        text="Crear Cuenta"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
      
      <Formik
        initialValues={{ nombre: nombre, apellido: apellido,
                        fechaDeNacimiento: fechaDeNacimiento, 
                        genero: genero}}
        onSubmit={(values) => {
                              setValues(values);
                              props.navigation.navigate('Signup2');
                            }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Text style={styles.text}>Identidad</Text>

            <TxtInput
                isPassword={false} error={false}
                placeholder={'Nombre'}
                value={values.nombre.trim()}
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                keyboardType={'default'}
            />
            <ErrorMessage errorValue={touched.nombre && errors.nombre} />

            <TxtInput
                isPassword={false} error={false}
                placeholder={'Apellido'}
                value={values.apellido.trim()}
                onChangeText={handleChange("apellido")}
                onBlur={handleBlur("apellido")}
                keyboardType={'default'}
            />
            <ErrorMessage errorValue={touched.apellido && errors.apellido} />

            <Field name="fechaDeNacimiento" placeholder='Fecha de Nacimiento' component={DatePicker} isPassword={false}/>
            
            <Field name='genero' placeholder='Género' component={SelectInput} options={opcionesGenero}/>
            <ErrorMessage errorValue={touched.genero && errors.genero} />

            <View style={styles.boton}>
            <NextBoton onPress={handleSubmit} />
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

export default Signup1;
