
import { Alert } from 'react-native'; // Para mostrar alertas en la aplicacion

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_LOGOUT = 'SET_LOGOUT';

export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const setCredentials = (authValues) => {
    return { type: SET_CREDENTIALS, 
             token: authValues.token,
             role: authValues.role,
            };
};


export const login = (loginInput) => {
  const { email, password } = loginInput;
  return (dispatch) => {  // importante el dispatch acá
    return fetch('https://sheltered-bastion-34059.herokuapp.com/auth/signin', {
      method: 'POST',
      headers: {  
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    })
      .then((res) =>{
        if (res.status === 200) { 
           const json = res.json()
           dispatch(setCredentials({ ...json }));
      } else if(res.status === 404){
        Alert.alert('Error al ingresar', 'Usuario no encontrado');
      } else if(res.status === 500){
        Alert.alert('Error al ingresar', 'Hubo un error, intenta nuevamente');
      } else if(res.status === 403){
        Alert.alert('Error al ingresar', 'Contraseña incorrecta');
      } else {
        console.log(res.status);
      }})
      //.then((json) => {
      //})
      .catch((err) => {
        Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
        console.log(err);
      });
  };
};