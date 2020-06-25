import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions,TouchableOpacity} from "react-native";
import { useDispatch, useSelector} from 'react-redux';
import chalk from 'chalk'

import { setLogout } from '../../store/actions/auth';
import { colors } from "../../constants";
import Boton from "../../components/Boton";
import TextoRecuadrado from "../../components/TextoRecuadrado";

  

const Perfil = (props) =>{
  const userToken = useSelector(state => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const [apellido, setApellido] = useState(" ");
  const [nombre, setNombre] = useState(" ");
  const [edad, setEdad] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [telefono, setTelefono] = useState(" ");
  const [password, setPassword] = useState(" ");
  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch( setLogout() );
  }


function getValues(){
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      });
      let success = fetch('https://sheltered-bastion-34059.herokuapp.com/api/user', {
        method: 'GET',
        headers: myHeaders,
      })
        .then((res) =>{
          if (res.status === 200) {
            let data = res.json().then(data => {
              setApellido(data.user.apellido);
              setNombre(data.user.nombre)
              setEdad((data.user.fechaDeNacimiento).split("T", 1));
              setEmail(data.user.email)
              setTelefono(data.user.celular)
              setPassword(data.user.password) 
              return true;             
            });
           
        } else if(res.status === 500){
          Alert.alert('Error', 'Hubo un error, intenta nuevamente');
          console.log(chalk.green(res.status))
          return false;
        } else {
          console.log(res.status);
          return false;
        }})
      return success;
  }

  getValues();

return (
      <View style={styles.screen}>
        <TextoRecuadrado text={role}/>
        <Text style={styles.nombre}>{apellido} {nombre}</Text>
        <Text style={styles.row}>                                         </Text>
        <Text style={styles.text}>Correo Electrónico </Text>
        <Text style={styles.textInfo}>{email}</Text>
        <Text style={styles.text}>Número de Telefóno </Text>
        <Text style={styles.textInfo}>{telefono} </Text>
        <Text style={styles.text}>Fecha de Nacimiento </Text>
        <Text style={styles.textInfo}>{edad} </Text>
        <Text style={styles.text}> </Text>
        <Boton text={"Editar Perfil"} onPress={() => {props.navigation.navigate('EditarPerfil')}}  />
        <View  style={{position: "absolute", top: '94.5%', left: '48%', marginHorizontal: 50}}>
            <TouchableOpacity onPress={handleLogout}
                              style={styles.horizontalButton}><Text style={styles.buttonText}>Cerrar Sesión</Text></TouchableOpacity>
          </View>
      </View>
    );
};


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.WHITE,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "openSansSemibold",
      fontSize: 12,
      marginTop: 10,
      color: colors.TEXT_LIGHT,
    },
    textInfo: {
      fontFamily: "openSansSemibold",
      fontSize: 12,
      color: colors.TEXT_DARK,
    },
    nombre:{
      fontFamily: "openSansSemibold",
      fontSize: 34,
      color: colors.TEXT_DARK,
    },
    row: {
      borderBottomColor: colors.text,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    horizontalButton: {
      width: 125,
      height: 30,
      backgroundColor: colors.ERROR,
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      shadowColor: colors.ERROR, 
      shadowOffset: { height: 1, width: 1 }, 
      shadowOpacity: 1, 
      shadowRadius: 1, 
      elevation: 2, 
    },

});

export default Perfil;