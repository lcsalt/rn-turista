import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Alert, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

import { CommonActions } from "@react-navigation/native";

import Boton from "../../components/Boton.js";
import GuideMarker from "../../components/GuideMarker.js";
import RecorridoActivoGuia from "../../components/RecorridoActivoGuia.js"
import { colors, images } from "../../constants";

const io = require('socket.io-client');

const socket = io('https://sheltered-bastion-34059.herokuapp.com/');

        
const HomeGuiaRecorridoActivo = (props) => {
    const [isLocationPermissionGranted, setIsLocationPermissionGranted,] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [fueEnviadoRecorrido, setFueEnviadoRecorrido] = useState(false);
    const [recorridoActivoCoords, setRecorridoActivoCoords] = useState([{ latitude: 0, longitude: 0 }]);
    const [puntoDeInicio, setPuntoDeInicio] = useState({ latitude: 0, longitude: 0 });
    const [recorridoActivo, setRecorridoActivo] = useState([{index: '', coordinates: { latitude: 0, longitude: 0 }}]);
    const [usuariosInscriptos, setUsuariosInscriptos] = useState(0);

    const userToken = useSelector((state) => state.auth.token);
    const estadoRecorrido = useSelector((state) => state.recorridoActivo.estado);
    const recorrido = useSelector((state) => state.recorridoActivo.recorrido);
    const recorridoActivoId = useSelector((state) => state.recorridoActivo.recorridoId);
    const horarioComienzoRecorrido = useSelector((state) => state.recorridoActivo.horarioComienzo);

    const returnToMainMap = () => {
        props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "Mapa" }]}));
        
    }
    const switchToEnCursoMap = ()=>{
        props.navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: "RecorridoEnCurso" }]}));
    }

    const cancelarRecorrido = () =>{
        const data = {
            key: recorridoActivoId.toString(),
        }
        
        socket.emit('cancelarRecorrido', data);
    }

    const comenzarRecorrido = () =>{
        const data = {
            key: recorridoActivoId.toString(),
        }
        socket.emit('iniciarRecorrido', data);
    }

    /////PERMISOS Y CURRENT POSITION 
    useEffect(() => {
        let unmounted = false;

        console.log(estadoRecorrido);
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
                    /////
                    if (!fueEnviadoRecorrido) { //1ra vez enviar todo y guardarlo en node en un array, crear la sala, y unirse
                        socket.emit('shareRecorridoActivo', ({
                            usuariosInscriptos: usuariosInscriptos,
                            recorrido: recorrido,
                            coordinates: { latitude: location.coords.latitude, longitude: location.coords.longitude },
                            key: recorridoActivoId.toString(),
                        })
                        );
                        setFueEnviadoRecorrido(true);
                    } else { //después solo envía la unicacion linkeada a una key para asociarla al recorrido y el room creado
                        
                        socket.emit('shareGuideLocation', ({ coordinates: { latitude: location.coords.latitude, longitude: location.coords.longitude }, key: recorridoActivoId.toString() }));
                    }
                }
            }
        })();
        if (!unmounted) {
            socket.on("inscripciónUsuario", (cantUsuariosInscriptos) => {
                setUsuariosInscriptos(cantUsuariosInscriptos);
                socket.emit('shareRecorridoDataToRoom', recorridoActivoId); 
            });
            socket.on("abandonoUsuario", (cantUsuariosInscriptos) => {
                setUsuariosInscriptos(cantUsuariosInscriptos);
                socket.emit('shareRecorridoDataToRoom', recorridoActivoId); 
            });
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

                        <GuideMarker
                            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                            title={'Guía'}
                            onPress={() => { }} />

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
                            strokeWidth={2}
                            lineCap={'round'}
                        />




                    </MapView>
                    <RecorridoActivoGuia nombreRecorrido={recorrido.nombre}
                                         usuariosInscriptos={usuariosInscriptos}
                                         maxParticipantes={recorrido.maxParticipantes}
                                         horarioComienzo={horarioComienzoRecorrido} 
                                         cancelarRecorrido={()=>{returnToMainMap(); cancelarRecorrido();}}
                                         comenzarRecorrido={()=>{switchToEnCursoMap(); comenzarRecorrido();}}
                    />
                </View>
            ) : (
                    //Pantalla de carga
                    <View>
                        <ActivityIndicator size="large" color={colors.PRIMARY} />
                        <Text style={{...styles.text, marginTop: 20}}>{text}</Text>
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

export default HomeGuiaRecorridoActivo;