import { SET_IDENTIDAD, SET_CUENTA, SET_ROLE, RESET_VALUES } from '../actions/register.js';

const initialState = {
    nombre: '',
    apellido: '',
    fechaDeNacimiento: '',
    genero: '',
    email: '',
    celular: '',
    password: '',
    role: '',
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
        case SET_ROLE:
            return {...state,
                role: action.role}
        case RESET_VALUES:
            return{...state, 
                nombre: action.nombre,
                apellido: action.apellido,
                fechaDeNacimiento: action.fechaDeNacimiento,
                genero: action.genero,
                email: action.email,
                celular: action.celular,
                password: action.password,
                rol: action.role,
            }
        default:
            return state;
    }
}

export default registerReducer;