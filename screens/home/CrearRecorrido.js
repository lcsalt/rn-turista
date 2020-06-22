import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions,ScrollView, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useSelector } from 'react-redux';

import {Field, Form, Formik, FormikProps} from 'formik';

import CoordinatePicker from '../../components/CoordinatePicker.js';
import MultiCoordinatePicker from '../../components/MultiCoordinatePicker.js';
import Boton from '../../components/Boton.js';
import LoadingBoton from '../../components/LoadingBoton.js';
import TxtInput from "../../components/TxtInput.js";
import SelectInput from "../../components/SelectInput.js";
import BackTextBotonRight from "../../components/BackTextBotonRight.js";
import { colors } from "../../constants";


const CrearRecorrido = (props) =>{
  
const [isSubmitting, setIsSubmitting] = useState(false);


const opcionesIdioma = ['Español','Inglés', 'Portugués', 'Chino', 'Francés']
const userToken = useSelector(state => state.auth.token);

setValues = (values) =>{
  console.log(values);
    setIsSubmitting(true);
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    });
    let success = fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorrido', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(values),
    })
      .then((res) =>{
        if (res.status === 200) {
        return true;
      } else if(res.status === 500){
        Alert.alert('Error', 'Hubo un error, intenta nuevamente');
        setIsSubmitting(false);
        return false;
      } else {
        console.log(res.status);
        setIsSubmitting(false);
        return false;
      }})
    return success;
}
return (
      <ScrollView style={styles.screen}>
      <BackTextBotonRight
        text="Volver a Mapa"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />


     <Formik
        initialValues={{ idioma: '', duracionMinutos: '', maxParticipantes: '', puntoInicio: {}, recorrido: [] }}
        onSubmit={(values) => {
                              setValues(values)
                              .then(success =>{
                                if (success){
                                  props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Mapa" }]}))
                                }
                              })
                            }}
      >
        {({ handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.form}>
            <Text style={styles.text}>Crea tu recorrido</Text>

           
           
           <Field name='puntoInicio' placeholder='Punto de Inicio' component={CoordinatePicker} />
           <Field name='recorrido' placeholder='Recorrido' component={MultiCoordinatePicker} />

            <TxtInput
                isPassword={false} error={false}
                placeholder={'Duración (minutos)'}
                value={values.duracionMinutos.trim()}
                onChangeText={handleChange("duracionMinutos")}
                onBlur={handleBlur("duracionMinutos")}
                keyboardType={'numeric'}
            />
            

            <TxtInput
                isPassword={false} error={false}
                placeholder={'Máx. participantes'}
                value={values.maxParticipantes.trim()}
                onChangeText={handleChange("maxParticipantes")}
                onBlur={handleBlur("maxParticipantes")}
                keyboardType={'numeric'}
            />

            
            <Field name='idioma' placeholder='Idioma' component={SelectInput} options={opcionesIdioma}/>
          
        
        
        
        
        <View style={styles.boton}>
          {isSubmitting ? (
            <LoadingBoton />
          ) : (
            <Boton text={"Crear"} onPress={handleSubmit} />
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
    marginTop: 20,
    marginBottom: Dimensions.get('window').height * 2 / 100,
    paddingHorizontal: Dimensions.get('window').width * 9 / 100,
  },
});

export default CrearRecorrido;