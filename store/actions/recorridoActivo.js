import { Alert } from 'react-native'; // Para mostrar alertas en la aplicacion




export const SET_RECORRIDO = 'SET_RECORRIDO';
export const SET_FINALIZAR = 'SET_FINALIZAR';
export const SET_INICIAR = 'SET_INICIAR';

export const setFinalizar = () => {
    return {
        type: SET_FINALIZAR
    };
};

export const setIniciar = () => {
    return {
        type: SET_INICIAR,
        estado: 'En curso',
    };
};

export const setRecorrido = (recorridoValues) => {
    console.log('PASADOS AL ESTADO:', recorridoValues);
    return { type: SET_RECORRIDO, 
             estado: recorridoValues.estado,
             recorrido: recorridoValues.recorrido,
             recorridoId: recorridoValues.recorridoId,
             horarioComienzo: recorridoValues.horarioComienzo,
            };
};


// INICIAR RECORRIDO POR EMEPEZAR
export const iniciarRecorrido = (userToken, recorridoId) => {
    

    //if date now > recorrido.horarioComienzo , return 
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      });
    const id = recorridoId.toString();
      return (dispatch) => {  // importante el dispatch acá
        return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/iniciar/'+id, {
          method: 'PUT',
          headers: myHeaders,
        })
          .then((res) =>{
            if (res.status === 200) {
                dispatch(setIniciar());
                return true;
          } else if(res.status === 500){
            Alert.alert('Error', 'Hubo un error al iniciar el recorrido, intente nuevamente.');
            return false;
          } else {
            console.log(res.status);
            return false;
          }})
          //.then((json) => {
          //})
          .catch((err) => {
            Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
            console.log(err);
          });
      };
}

//ACTIVAR RECORRIDO, INSCRIPCIONES ABIERTAS
export const activarRecorrido = (recorridoActivoValues, userToken) => {
 
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + userToken,
  });

  return (dispatch) => {  // importante el dispatch acá
    return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(recorridoActivoValues),
    })
      .then((res) =>{
        if (res.status === 200) {
          res.json().then((response) =>{
            const estado = response.recorrido.estado;
            const recorrido = response.recorrido.recorrido;
            const recorridoId = response.recorrido._id;
            const horarioComienzo = new Date(response.recorrido.horarioComienzo);
            dispatch(setRecorrido({ estado, recorrido, recorridoId, horarioComienzo }));
            return true;
          })
      } else if(res.status === 500){
        res.json().then((response) =>{
        console.log(response.message, response.recorrido);
        Alert.alert('Error', 'Hubo un error al iniciar el recorrido, intente nuevamente.');
        return false;
        })
      } else {
        console.log(res.status);
        return false;
      }})
      //.then((json) => {
      //})
      .catch((err) => {
        Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
        console.log(err);
      });
  };
};

export const finalizarRecorrido = (userToken, recorridoId) => {
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      });
    const id = recorridoId.toString();
      return (dispatch) => {  // importante el dispatch acá
        return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/terminar/'+id, {
          method: 'PUT',
          headers: myHeaders,
        })
          .then((res) =>{
            if (res.status === 200) {
              dispatch(setFinalizar());
                return true;
          } else if(res.status === 500){
            Alert.alert('Error', 'Hubo un error al finalizar el recorrido, intente nuevamente.');
            return false;
          } else {
            console.log(res.status);
            return false;
          }})
          //.then((json) => {
          //})
          .catch((err) => {
            Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
            console.log(err);
          });
      };
}

export const cancelarRecorrido = (userToken, recorridoId) => {
  const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    });
  const id = recorridoId.toString();
    return (dispatch) => {  // importante el dispatch acá
      return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/cancelar/'+id, {
        method: 'DELETE',
        headers: myHeaders,
      })
        .then((res) =>{
          if (res.status === 200) {
              dispatch(setFinalizar());
              return true;
        } else if(res.status === 500){
          Alert.alert('Error', 'Hubo un error al cancelar el recorrido, intente nuevamente.');
          return false;
        } else {
          console.log(res.status);
          return false;
        }})
        //.then((json) => {
        //})
        .catch((err) => {
          Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
          console.log(err);
        });
    };
}

export const unirseRecorrido = (userToken, recorridoId) => {
  
  const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    });
  const id = recorridoId.toString();
  console.log(userToken, id)
    return (dispatch) => {  // importante el dispatch acá
      return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/unirse/'+id, {
        method: 'PUT',
        headers: myHeaders,
      })
        .then((res) =>{
          if (res.status === 200) {
            res.json().then((response) =>{
              const estado = response.recorrido.estado;
              const recorrido = response.recorrido.recorrido;
              const recorridoId = response.recorrido._id;
              const horarioComienzo = new Date(response.recorrido.horarioComienzo);
              dispatch(setRecorrido({ estado, recorrido, recorridoId, horarioComienzo }));
              return true;
            })
        } else if(res.status === 500){
          Alert.alert('Error', 'Hubo un error al unirse el recorrido, intente nuevamente.');
          return false;
        } else {
          console.log(res.status);
          return false;
        }})
        //.then((json) => {
        //})
        .catch((err) => {
          Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
          console.log(err);
        });
    };
}

export const abandonarRecorrido = (userToken, recorridoId) => {
  const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    });
  const id = recorridoId.toString();
    return (dispatch) => {  // importante el dispatch acá
      return fetch('https://sheltered-bastion-34059.herokuapp.com/api/recorridoInstancia/abandonar/'+id, {
        method: 'PUT',
        headers: myHeaders,
      })
        .then((res) =>{
          if (res.status === 200) {
            dispatch(setFinalizar());
              return true;
        } else if(res.status === 500){
          Alert.alert('Error', 'Hubo un error al abandonar el recorrido, intente nuevamente.');
          return false;
        } else {
          console.log(res.status);
          return false;
        }})
        //.then((json) => {
        //})
        .catch((err) => {
          Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
          console.log(err);
        });
    };
}