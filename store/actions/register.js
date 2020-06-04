export const SET_IDENTIDAD = 'SET_IDENTIDAD';
export const SET_CUENTA = 'SET_CUENTA';
export const SET_ROL = 'SET_ROL';

export const setIdentidad = (identidad) => {
    return { type: SET_IDENTIDAD, 
             nombre: identidad.nombre,
             apellido: identidad.apellido,
             fechaDeNacimiento: identidad.fechaDeNacimiento,
             genero: identidad.genero,
            };
}

export const setCuenta = (cuenta) => {
    return { type: SET_CUENTA, 
             email: cuenta.email,
             celular: cuenta.celular,
             password: cuenta.password,
            };
}

export const setRol = (rol) => {
    return { type: SET_ROL,
             rol: rol.rol,
    };
}