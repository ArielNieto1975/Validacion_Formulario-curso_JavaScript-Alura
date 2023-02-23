// validacion para mayores de 18 años en fecha de nacimiento
// const inputNacimiento = document.querySelector("#birth");
// inputNacimiento.addEventListener("blur", (event)=>{
//     validarNacimiento(event.target)
// });

export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError", 
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo Correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo Contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres y maximo 12. Debe contener una letra minúscula, una mayúscula y un número. No puede Contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La Ciudad debe contener de 10 a 40 caracteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El Estado debe contener de 10 a 40 caracteres."
    },
    
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

function validarNacimiento (input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
        if (!mayorDeEdad(fechaCliente)){
                mensaje = "Debes tener al menos 18 años";
        }
            input.setCustomValidity(mensaje)
}
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const fechaMayoriaEdad = new Date(
        fecha.getUTCFullYear()+18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return fechaActual >= fechaMayoriaEdad;
}