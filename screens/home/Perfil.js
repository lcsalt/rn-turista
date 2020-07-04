import React, { useState } from "react";
import { StyleSheet, View, Text,Image, Dimensions, ImageBackground ,TouchableOpacity, ActivityIndicator} from "react-native";
import { useDispatch, useSelector} from 'react-redux';
import chalk from 'chalk'

import { setLogout } from '../../store/actions/auth';
import { colors, images} from "../../constants";
import Boton from "../../components/Boton";
import LinkBoton from "../../components/LinkBoton"
import TextoRecuadrado from "../../components/TextoRecuadrado";


  

const Perfil = ({ navigation },props) =>{
  const userToken = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const [apellido, setApellido] = useState(" ");
  const [nombre, setNombre] = useState(" ");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [celular, setCelular] = useState(" ");
  const [genero, setGenero] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [foto, setFoto] = useState(images.iconoTuristas);
  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch( setLogout() );
  }
  function handleEdit(){
    navigation.navigate('EditarPerfil', {
      apellido,nombre,fechaDeNacimiento,celular, genero, email
    });
    setLoading(true)
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
              setFechaDeNacimiento((data.user.fechaDeNacimiento).split("T", 1));
              setEmail(data.user.email)
              setCelular(data.user.celular)
              setGenero(data.user.genero) 
              console.log(data)
              if(data.user.role === "Guía"){
                if(data.user.genero === "Masculino"){
                  setFoto(images.iconGuiaHombre)
                } else if(data.user.genero === "Femenino"){
                  setFoto(images.iconGuiaMujer)
                }else{
                  setFoto(images.iconGuiaGenerico)
                }
              } else{
                setFoto(images.iconoTuristas)
              }
              setLoading(false);
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

    
if(loading){
  {getValues()}
  return(
  <View style={styles.screen}>
        <ActivityIndicator size="small" color={colors.PRIMARY} />
        <Text style={styles.text}>cargando registro...</Text>
      </View>
)}


return (
      <View style={styles.screen}>
        <ImageBackground source={images.backgroundImg}  style={{width: '100%', height: '100%'}}>
        <View style={styles.perfil}>
          {loading ? (null):(
            <Image
            source = {foto}
            style={styles.image}
            resizeMode="contain"
          ></Image>
          )}
        
        <TextoRecuadrado text={role}/>

        <Text style={styles.nombre}>{apellido} {nombre}</Text>
        <Text style={styles.row}>                                         </Text>
        <Text style={styles.text}>Correo Electrónico </Text>
        <Text style={styles.textInfo}>{email}</Text>
        <Text style={styles.text}>Número de Telefóno </Text>
        <Text style={styles.textInfo}>{celular} </Text>
        <Text style={styles.text}>Género </Text>
        <Text style={styles.textInfo}>{genero} </Text>
        <Text style={styles.text}>Fecha de Nacimiento </Text>
        <Text style={styles.textInfo}>{fechaDeNacimiento} </Text>
        <Text style={styles.row}>                                         </Text>
        <Text style={styles.text}> </Text>
        
        <Boton text={"Editar Perfil"} onPress={()=> handleEdit() }  />
        <LinkBoton text={"Cerrar sesión"} onPress={handleLogout} textStyle={{color: colors.TURIST, marginTop: 10}} />
        </View>
        </ImageBackground>
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
    containerTop: {
      marginTop: Dimensions.get('window').height * 10 / 100,
      paddingHorizontal: Dimensions.get('window').width * 9 / 100,
      alignItems: "center",
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
    image: {
      width: "47%",
      height: "21%",
    },
    horizontalButton: {
      width: 125,
      height: 30,
      backgroundColor: colors.ERROR,
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
      shadowColor: colors.ERROR, 
      shadowOffset: { height: 1, width: 1 }, 
      shadowOpacity: 1, 
      shadowRadius: 1, 
      elevation: 2, 
    },
    perfil: {
      alignSelf: 'center',
      marginVertical: Dimensions.get('window').height * 7 / 100,
      height: Dimensions.get('window').height * 85 / 100,
      width: Dimensions.get('window').width * 90 / 100,
      backgroundColor: colors.WHITE_DARK,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },

});

export default Perfil;