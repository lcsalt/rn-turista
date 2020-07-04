import React, { useState } from "react";
import { StyleSheet, View, Text,Dimensions, FlatList ,SafeAreaView , ImageBackground,ActivityIndicator} from "react-native";
import { useDispatch, useSelector} from 'react-redux';
import { images, colors } from "../../constants";
import LinkBoton from "../../components/LinkBoton"


const Mochila = ({ navigation },props) =>{
  const userToken = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const [recorridos, setRecorridos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  function handleDetails(rec){
    navigation.navigate('MochilaDetails', {rec
    });
    setLoading(true)
  }
  function getValues(){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    });
    let success = fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridosInstancia/', {
      method: 'GET',
      headers: myHeaders,
    })
      .then((res) =>{
        if (res.status === 200) {
          let data = res.json().then(data => {
            setLoading(false);
            setRecorridos(data.recorridos);

            console.log(data.recorridos[0])
            return true;
          });       

      } else if(res.status === 500){
        Alert.alert('Error', 'Hubo un error, intenta nuevamente');
        console.log(chalk.green(res.status))
        setLoading(false);
        setStatus(res.status)
        return false;
      } else {
        console.log(res.status);
        setLoading(false);
        setStatus(res.status)
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
)} else {
  if(recorridos === null || recorridos.length === 0){
console.log(status)
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Mochila</Text>
        <Text style={styles.text}>Una mochila en donde se guardan tus ultimos recorridos, sitios cerca recomendados
         y preguntas frecuentes.</Text>
      </View>
    );
};
//<LinkBoton onPress={handleDetails(title)} text={title} /> 
function Item({ title }) {
  return (
    <View style={styles.item}>
      <LinkBoton text={title.recorrido.nombre} onPress={() => handleDetails(title)}/>
    </View>
  );
}

  return (
<ImageBackground source={images.backgroundImg}  style={{width: '100%', height: '100%'}}>
  
    <SafeAreaView >
    <View style={styles.screen}>
  <Text style={styles.title}> Revivi tus recorridos: </Text>
      <FlatList
        data={recorridos}
        renderItem={({ item }) => <Item title={item}  />}
        keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaView>
    
    </ImageBackground>
  );

    
}

}




const styles = StyleSheet.create({
    screen: {
      alignSelf: 'center',
      marginVertical: Dimensions.get('window').height * 7 / 100,
      height: Dimensions.get('window').height * 85 / 100,
      width: Dimensions.get('window').width * 90 / 100,
      backgroundColor: colors.WHITE_DARK,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontFamily: "openSansSemibold",
      fontSize: 14,
      color: colors.PRIMARY_DARK,
      textAlign: 'center'
    },
    horizontalButton: {
      width: 125,
      height: 30,
      backgroundColor: colors.WHITE,
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
      shadowColor: colors.PRIMARY_VERYDARK, 
      shadowOffset: { height: 1, width: 1 }, 
      shadowOpacity: 1, 
      shadowRadius: 1, 
      elevation: 2, 
    },
    item: {
      backgroundColor: colors.PRIMARY_LIGHT,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
    },
    title: {
      marginTop: 0,
      textDecorationLine: 'underline',
      fontFamily: "openSansSemibold",
      paddingVertical: 5,
      color: "#20232a",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold"
    }
});

export default Mochila;