const Joi = require('joi')


const productoSchema = Joi.object().keys(
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
        }),
        precio: Joi.number().required().min(1).messages({
            "any.required":"Precio es requerido",
            "number.min": "Debe tener como minimo {#limit} caracteres",
        }),
        pathImg: Joi.string().required().min(3).max(255).messages({
            "any.required":"PathImg es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max": "Debe tener como maximo {#limit} caracteres",
            "string.empty": "PathImg no puede ser vacio"
        })
    }
)

module.exports = productoSchema