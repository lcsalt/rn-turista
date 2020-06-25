import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  ScrollView,  Dimensions,ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import {Field, Form, Formik, FormikProps} from 'formik';
import * as yup from 'yup';

import { colors } from "../../constants";
import BackTextBoton from "../../components/BackTextBoton.js";
import LoadingBoton from '../../components/LoadingBoton.js';
import DatePicker from "../../components/DatePicker.js";
import TxtInput from "../../components/TxtInput.js";
import Boton from '../../components/Boton.js';
import SelectInput from "../../components/SelectInput.js";
import ErrorMessage from "../../components/ErrorMessage.js";

const EditarPerfil = (props) => {
  //trae valores del reducer de registro
 // const [values, setvalues] = useState([]);
    const userToken = useSelector(state => state.auth.token);
  const [sending, setSending] = useState(false);
  let nombre ="";
  let apellido="";
  let fechaDeNacimiento="";

  function confirmarCambios(values){
    setSending(true);
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      });
    //console.log(values);
    let success = fetch('https://sheltered-bastion-34059.herokuapp.com/api/user', {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(values),
    })
    .then((response) => {
        setSending(false);
      console.log(response.status);
      if (response.status != 200){
        Alert.alert('Error', 'El registro no pudo realizarse.');
        props.navigation.dispatch(CommonActions.reset({index: 1,routes: [{ name: "PerfilNavigation" }]}))
        return false;
    }else{
        props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "PerfilNavigation" }]}))
        return true;
    }
    })
    };
    

 
  //return (
    //<View>
     // {props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Login" }]}))}
   // </View>
 // );
//};

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

  })
  
  if (sending) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="small" color={colors.PRIMARY} />
        <Text style={styles.text}>Confirmando registro...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.screen}>
      <BackTextBoton
        text="Editar Perfil"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
      
      <Formik
        initialValues={{ nombre: nombre, apellido: apellido,
                        fechaDeNacimiento: fechaDeNacimiento, 
                        }}
        onSubmit={(values) => {
                         confirmarCambios(values)
                            .then(success =>{
                                console.log(values)
                                console.log(success)
                              if (success){
                                props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Mapa" }]}))
                              }
                            })
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
            

            <View style={styles.boton}>
          {sending ? (
            <LoadingBoton />
          ) : (
            <Boton text={"Modificar"} onPress={handleSubmit} />
          )}
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

export default EditarPerfil;
