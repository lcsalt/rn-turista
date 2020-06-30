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
                estado: 'En curso',
            }
        case SET_FINALIZAR:
            return {...state,
                estado: '',
                recorrido: '',
                recorridoId: '',
                horarioComienzo: '',
            }
        default:
            return state;
    }
}

export default recorridoActivoReducer;