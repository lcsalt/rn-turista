import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Alert, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

import { CommonActions } from "@react-navigation/native";

import { setFinalizar } from '../../store/actions/recorridoActivo';
import Boton from "../../components/Boton.js";
import GuideMarker from "../../components/GuideMarker.js";
import RecorridoActivoTurista from "../../components/RecorridoActivoTurista.js"
import { colors, images } from "../../constants";

const io = require('socket.io-client');
const socket = io('https://sheltered-bastion-34059.herokuapp.com/');

        
const HomeTuristaRecorridoActivo = (props) => {
    const [estaUnidoAlSocket, setEstaUnidoAlSocket] = useState(false);
    const [isLocationPermissionGranted, setIsLocationPermissionGranted,] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [recorridoActivoCoords, setRecorridoActivoCoords] = useState([{ latitude: 0, longitude: 0 }]);
    const [puntoDeInicio, setPuntoDeInicio] = useState({ latitude: 0, longitude: 0 });
    const [recorridoActivo, setRecorridoActivo] = useState([{index: '', coordinates: { latitude: 0, longitude: 0 }}]);
    
    const [guiaLocation, setGuiaLocation] = useState(null);
    const [guiaKey, setGuiaKey] = useState('');
    const [usuariosInscriptos, setUsuariosInscriptos] = useState(0);

    const userToken = useSelector((state) => state.auth.token);
    const estadoRecorrido = useSelector((state) => state.recorridoActivo.estado);
    const recorrido = useSelector((state) => state.recorridoActivo.recorrido);
    const recorridoActivoId = useSelector((state) => state.recorridoActivo.recorridoId);
    const horarioComienzoRecorrido = useSelector((state) => state.recorridoActivo.horarioComienzo);

    const returnToMainMap = () => {
        props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Mapa" }]}));
    }

    const abandonarRecorrido = () =>{
        const recorridoId = recorridoActivoId.toString();
        socket.emit('leaveRecorrido',recorridoId);
    }
    const dispatch = useDispatch();
    /////PERMISOS Y CURRENT POSITION 
    useEffect(() => {
        let unmounted = false;
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                setIsLocationPermissionGranted(false);
            }
            setIsLocationPermissionGranted(true);
            if (!unmounted) {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                if (estadoRecorrido == 'Por empezar') {
                    //guardo en el estado el array de puntos del recorrido
                    const recorridoPoints = recorrido.recorrido;
                    const recorridoCoordinates = recorridoPoints.map((punto) => {
                        return punto.coordinates;
                    })
                    setRecorridoActivoCoords([recorrido.puntoInicio, ...recorridoCoordinates]);
                    setPuntoDeInicio(recorrido.puntoInicio);
                    setRecorridoActivo(recorrido.recorrido);
                }else{
                    returnToMainMap();
                }
            }
        })();
        if(!unmounted){
            if(!estaUnidoAlSocket){
                socket.emit('joinRecorrido', recorridoActivoId);
                setEstaUnidoAlSocket(true);
            }
            socket.on("recorridoData", (recorrido) => {
                console.log('7// llego la nueva data a turista: ', recorrido)
                
                  setGuiaLocation(recorrido.locationActual);
                  setGuiaKey(recorrido.id);
                  setUsuariosInscriptos(recorrido.usuariosInscriptos);
                
              });
            
            
            socket.on('cancelarRecorrido',()=>{
                let success = dispatch(setFinalizar())
                returnToMainMap();
            })
        }
        

        return () => { unmounted = true };
    }, []);


    let text = "Esperando permisos...";
    if (!isLocationPermissionGranted) {
        text = "No puede utilizarse esta función si no otorgas permisos.";
    }

    return (
        <View style={styles.screen}>
            {location && (estadoRecorrido == 'Por empezar') ? (
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapStyle}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >

                        

                        <Marker
                            key={'Punto Inicial'}
                            coordinate={puntoDeInicio}
                            title={'Punto de Inicio'}
                        />
                        { //Coloca todos los markers
                            recorridoActivo.map((marker) => {
                                return (<Marker
                                    key={marker.index}
                                    image={images.mapPoint}
                                    coordinate={marker.coordinates}
                                    title={(marker.index).toString(10)}
                                />
                                );
                            })
                        }

                        <Polyline
                            coordinates={recorridoActivoCoords}
                            strokeColor={colors.PRIMARY}
                            strokeWidth={3}
                        />

                        {guiaLocation ? (

                            <GuideMarker
                            coordinate={guiaLocation}
                            title={'Tu Guía'}
                            onPress={() => { }} />

                        ):(null)

                        }


                    </MapView>
                    <RecorridoActivoTurista nombreRecorrido={recorrido.nombre}
                                            usuariosInscriptos={usuariosInscriptos}
                                            maxParticipantes={recorrido.maxParticipantes}
                                            horarioComienzo={horarioComienzoRecorrido} 
                                            cancelarRecorrido={()=>{returnToMainMap(); abandonarRecorrido();}}
                    />
                </View>
            ) : (
                    //Pantalla de carga
                    <View>
                        <Text style={{ marginBottom: 20 }}>{text}</Text>
                        <ActivityIndicator size="large" color={colors.PRIMARY} />
                    </View>
                )}
        </View>
    );
};


//STYLES
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
    buttonText: {
        fontFamily: "openSansSemibold",
        fontSize: 12,
        color: colors.WHITE,
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: -1,
    },
    roundButton: {
        width: 70,
        height: 70,
        backgroundColor: colors.PRIMARY,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    horizontalButton: {
        width: 150,
        height: 50,
        backgroundColor: colors.PRIMARY,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
    recorridoPorEmpezar: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 2 / 100,
        height: Dimensions.get('window').height * 20 / 100,
        width: Dimensions.get('window').width * 85 / 100,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
    horarioComienzoBox: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 23 / 100,
        height: Dimensions.get('window').height * 8 / 100,
        width: Dimensions.get('window').width * 35 / 100,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left: ' 58%',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,

    },
    cancelarRecorridoBox: {
        alignSelf: 'center',
        position: "absolute",
        bottom: Dimensions.get("window").height * 23 / 100,
        height: Dimensions.get('window').height * 8 / 100,
        width: Dimensions.get('window').width * 55 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        right: Dimensions.get('window').width * 44 / 100,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,

    },
});

export default HomeTuristaRecorridoActivo;