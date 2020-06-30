import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";


import { activarRecorrido } from '../../store/actions/recorridoActivo';
import Boton from "../../components/Boton.js";
import LoadingBoton from "../../components/LoadingBoton.js";
import ModalTimePicker from "../../components/ModalTimePicker.js";
import SelectInputBare from "../../components/SelectInputBare.js";
import BackTextBoton from "../../components/BackTextBoton.js";
import { colors } from "../../constants";

const IniciarRecorrido = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listaRecorridos, setListaRecorridos] = useState([null]);
  const [nombresRecorridos, setNombresRecorridos] = useState(['']);
  const [recorridoElegido, setRecorridoElegido] = useState(null);
  const [horarioComienzo, setHorarioComienzo] = useState('');

  useEffect(() => {
    if (isLoading){
      loadValues();
    }
    return () => {setIsLoading(true) };
    }, []);

  const userToken = useSelector((state) => state.auth.token);
  const loadValues = async() => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    });
    let success = await fetch("https://sheltered-bastion-34059.herokuapp.com/api/recorrido", {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((response) => {
          setListaRecorridos([...response.recorridos]);
          let listaNombres = response.recorridos.map((recorrido) => {
            return recorrido.nombre;
          });
          setNombresRecorridos([...nombresRecorridos, ...listaNombres]);
          setIsLoading(false);
          return true;
        })
      } else if (res.status === 500) {
        Alert.alert("Error", "Hubo un error, intenta nuevamente");
        setIsLoading(false);
        return false;
      } else {
        console.log(res.status);
        setIsLoading(false);
        return false;
      }
    })


  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    setIsSubmitting(true);
    let recorridoSelected = listaRecorridos.filter((recorrido) => {
      return recorrido.nombre == recorridoElegido;
    });
    let horarioComienzoParsed = new Date();
    horarioComienzoParsed.setHours(horarioComienzo.hora);
    horarioComienzoParsed.setMinutes(horarioComienzo.minutos);
    console.log(recorridoSelected, horarioComienzoParsed);
    if(horarioComienzoParsed < new Date()){
      Alert.alert('Error', 'Debe ingresar un horario válido.');
      setIsSubmitting(false);
    }
    if(recorridoSelected == ''){
      Alert.alert('Error', 'Debe elegir un recorrido.')
      setIsSubmitting(false);
    }
    const recorridoActivoValues = {
      recorrido: recorridoSelected[0],
      horarioComienzo: horarioComienzoParsed,
    };
    let success;
    success = dispatch(activarRecorrido(recorridoActivoValues, userToken));
    if (!success) {
      setIsSubmitting(false);
      Alert.alert('Error', 'Hubo un error al iniciar el recorrido.')
    }else{
      setTimeout(()=>{ props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "RecorridoActivo" }]}))}, 2000);
      
    }

  };

  return (
    <View style={styles.screen}>
      <BackTextBoton
        text="Volver a Mapa"
        color={colors.PRIMARY}
        onPress={() => props.navigation.goBack()}
      />
      {isLoading ? (
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}} >
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.text}>Elija un recorrido</Text>

          <SelectInputBare
            placeholder="Recorrido"
            options={nombresRecorridos}
            setFieldValue={(value) => setRecorridoElegido(value)}
          />

          <Text style={{...styles.text, marginTop: 30}}>Elija un horario de comienzo</Text> 
          <ModalTimePicker
            placeholder="Horario de comienzo"
            setFieldValue={(value) => setHorarioComienzo(value)}
          />
          <View style={styles.box} />
          <View style={styles.boton}>
            {isSubmitting ? (
              <LoadingBoton />
            ) : (
              <Boton text={"¡Iniciar!"} onPress={handleSubmit} customStyle={{ borderRadius: 20,maxWidth: '50%',}}/>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  form: {
    marginVertical: Dimensions.get('window').height * 15 / 100,
    alignItems: "center",
    
  },
  text: {
    fontFamily: "openSansSemibold",
    fontSize: 14,
    color: colors.TEXT,
    textAlign: "center",
  },
  box: {
    marginVertical: Dimensions.get('window').height * 4 / 100,
  }
});

export default IniciarRecorrido;
