import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  ScrollView,Alert,  Dimensions,ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import {Field, Form, Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import { CommonActions } from "@react-navigation/native";
import { colors } from "../../constants";
import BackTextBoton from "../../components/BackTextBoton.js";
import LoadingBoton from '../../components/LoadingBoton.js';
import DatePicker from "../../components/DatePicker.js";
import TxtInput from "../../components/TxtInput.js";
import Boton from '../../components/Boton.js';
import SelectInput from "../../components/SelectInput.js";
import ErrorMessage from "../../components/ErrorMessage.js";

const EditarPerfil = ({ route, navigation },props) => {

  const userToken = useSelector(state => state.auth.token);
  const [sending, setSending] = useState(false);
  let nombre = route.params.nombre;
  let apellido= route.params.apellido;
  let fechaDeNacimiento= route.params.fechaDeNacimiento;
  let celular = route.params.celular;
  let genero = route.params.genero;
  let email = route.params.email;
  const opcionesGenero = ['Género','Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo']

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
        Alert.alert('Error', 'Hubo un error, intenta nuevamente. Si el error persiste, posiblemente el E-mail este ocupado por otro usuario');
        navigation.navigate('Perfil')
        return false;
    }else{

      navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "HomeNavigation" }]}))
        return true;
    }
    })
    };
    
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
      email: yup.string()
      .label('E-mail')
      .required('Debe ingresar su E-mail')
      .lowercase()
      .email('Ingrese una dirección válida')
      .ensure('Debe ingresar su E-mail'),
    fechaDeNacimiento: yup.string()
      .required('Debe ingresar una fecha'),
    celular: yup.string()
      .label('celular')
      .required('Ingrese su número')
      .trim('Remueva los espacios')
      .matches(/^\d+$/, 'Ingrese sólo números')
      .min(7, 'Ingrese un número válido')
      .max(15, 'Ingrese un número válido')
      .ensure('Ingrese su número'),
      genero: yup.string()
      .matches(/(Masculino|Femenino|Otro|Prefiero no decirlo)/,'Elija una opción' )
      .ensure()
      .required('Elija una opción')
  })
  
  if (sending) {
    return (
      <View style={styles.loading}>
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
        onPress={() => navigation.goBack()}
      />
      
      <Formik
        initialValues={{ nombre: nombre, apellido: apellido, email:email, celular:celular, genero:genero,
                        fechaDeNacimiento: fechaDeNacimiento, 
                        }}
        onSubmit={(values) => {
                         confirmarCambios(values)
                            .then(success =>{
                                console.log(values)
                                console.log(success)
                              if (success){
                                props.navigation.navigate('Perfil')
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
                placeholder={apellido}
                value={values.apellido.trim()}
                onChangeText={handleChange("apellido")}
                onBlur={handleBlur("apellido")}
                keyboardType={'default'}
            />
            <TxtInput
                isPassword={false} error={false}
                placeholder={email}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")} 
                keyboardType={'email-address'}
                autoCapitalize={'none'} 
            />
             <ErrorMessage errorValue={touched.email && errors.email} />
            <TxtInput
                isPassword={false} error={false}
                placeholder={celular}
                value={values.celular.trim()}
                onChangeText={handleChange("celular")}
                onBlur={handleBlur("celular")}
                keyboardType={'numeric'}
            />
            <ErrorMessage errorValue={touched.apellido && errors.apellido} />

            <Field name='genero' placeholder={genero} component={SelectInput} options={opcionesGenero}/>
            <ErrorMessage errorValue={touched.genero && errors.genero} />

            <Field name="fechaDeNacimiento" placeholder={`Fecha De Nacimiento: ${String(fechaDeNacimiento)}`} component={DatePicker} isPassword={false}/>
            

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
  loading: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
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
