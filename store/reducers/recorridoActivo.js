import { SET_RECORRIDO, SET_FINALIZAR, SET_INICIAR } from '../actions/recorridoActivo.js';

const initialState = {
    estado: '',
    recorrido: '',
    recorridoId: '',
    horarioComienzo: '',
}

const recorridoActivoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_RECORRIDO:
            return {...state, 
                    estado: action.estado,
                    recorrido: action.recorrido,
                    recorridoId: action.recorridoId,
                    horarioComienzo: action.horarioComienzo,
                }
        case SET_INICIAR:
            return {...state, 
                estado: action.estado,
            }
        case SET_FINALIZAR:
            return initialState;
        default:
            return state;
    }
}

export default recorridoActivoReducer;