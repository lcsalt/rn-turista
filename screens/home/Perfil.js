import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useDispatch, useSelector} from 'react-redux';
import chalk from 'chalk'

import { setLogout } from '../../store/actions/auth';
import { colors } from "../../constants";
import Boton from "../../components/Boton";
import TextoRecuadrado from "../../components/TextoRecuadrado";


const Perfil = (props) =>{
  
  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch( setLogout() );
  }
  const userToken = useSelector(state => state.auth.token);

  function getValues(){
    console.log(chalk.blue(userToken))
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
            console.log(chalk.yellow(res.status))
            res.json().then(data => {
              console.log(data)
            });
           
        } else if(res.status === 500){
          Alert.alert('Error', 'Hubo un error, intenta nuevamente');
          console.log(chalk.green(res.status))
          
        } else {
          console.log(res.status);
          
        }})
      return success;
  }


  const role = useSelector((state) => state.auth.role);
  const nombre = useSelector((state) => state.register.nombre);
  const apellido = useSelector((state) => state.register.apellido);


return (
      <View style={styles.screen}>
        <TextoRecuadrado text={role}/>
        <Text style={styles.nombre}>{apellido} {nombre}, </Text>
        <Text style={styles.text}>{apellido} {nombre}, </Text>

        <Boton text={"Cerrar Sesión"} onPress={handleLogout} />
        <Text style={styles.text}>Perfil</Text>
        <Boton text={"buscar usuarios"} onPress={getValues} />

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
      fontSize: 14,
      color: colors.TEXT,
    },
    nombre:{
      fontFamily: "openSansSemibold",
      fontSize: 34,
      color: colors.TEXT_DARK,
    }

});

export default Perfil;