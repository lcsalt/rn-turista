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
    <View style={{...styles.screen, alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        <Text style={{...styles.text, marginTop: 20, color: colors.TEXT}}>Cargando mochila...</Text>
      </View>
)} else {
  if(recorridos === null || recorridos.length === 0){
console.log(status)
    return (
      <View style={styles.screen}>
        <Text style={{...styles.text, marginBottom: 20, fontSize: 20}}>Mochila</Text>
        <Text style={{...styles.text, color: colors.TEXT}}>Una mochila en donde se guardan tus ultimos recorridos, sitios cerca recomendados
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
    
    <Text style={styles.title}> Reviví tus recorridos </Text>
    <View style={styles.screen}>
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
      marginVertical: Dimensions.get('window').height * 3 / 100,
      height: Dimensions.get('window').height *65 / 100,
      width: Dimensions.get('window').width * 85 / 100,
      backgroundColor: colors.WHITE_DARK,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontFamily: "openSansSemibold",
      fontSize: 14,
      color: colors.PRIMARY,
      textAlign: 'center'
    },
    horizontalButton: {
      width: '100%',
      height: 30,
      backgroundColor: colors.WHITE,
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
    },
    item: {
      width: 200,
      backgroundColor: colors.PRIMARY_LIGHT,
      padding: 10,
      marginVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth:1,
      borderColor: colors.PRIMARY_LIGHT,
      borderRadius: 6,
    },
    title: {
      marginTop: 50,
      marginBottom: 10,
      fontFamily: "openSansSemibold",
      paddingVertical: 5,
      color: colors.WHITE,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold"
    }
});

export default Mochila;