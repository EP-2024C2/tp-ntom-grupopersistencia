const Joi = require('joi')


const fabricanteSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages({
            "any.required":"Nombre es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "Nombre no puede ser vacio"
        }),
        direccion: Joi.string().required().min(3).max(255).messages({
            "any.required":"Direccion es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "Direccion no puede ser vacio"
        }),
        numeroContacto: Joi.number().required().min(1).messages({
            "any.required":"numeroContacto es requerido",
            "number.min": "Debe tener como minimo {#limit} caracteres",
        }),
        pathImgPerfil: Joi.string().required().min(3).max(255).messages({
            "any.required":"pathImgPerfil es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "pathImgPerfil no puede ser vacio"
        })
    }
)

module.exports = fabricanteSchema