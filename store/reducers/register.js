import { SET_IDENTIDAD, SET_CUENTA, SET_ROL } from '../actions/register.js';

const initialState = {
    nombre: '',
    apellido: '',
    fechaDeNacimiento: '',
    genero: '',
    email: '',
    celular: '',
    password: '',
    rol: '',
}

const registerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IDENTIDAD:
            return {...state, 
                    nombre: action.nombre,
                    apellido: action.apellido,
                    fechaDeNacimiento: action.fechaDeNacimiento,
                    genero: action.genero}
        case SET_CUENTA:
            return  {...state, 
                email: action.email,
                celular: action.celular,
                password: action.password}  
        case SET_ROL:
            return {...state,
                rol: action.rol}
        default:
            return state;
    }
}

export default registerReducer;