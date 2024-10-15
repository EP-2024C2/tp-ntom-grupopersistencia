const Joi = require('joi')


const componenteSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages({
            "any.required":"Nombre es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "Nombre no puede ser vacio"
        }),
        descripcion: Joi.string().required().min(3).max(255).messages({
            "any.required":"Descripcion es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "Descripcion no puede ser vacio"
        })
    }
)

module.exports = componenteSchema