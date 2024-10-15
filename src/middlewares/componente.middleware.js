const { Componentes } = require('../models')
const middlewareComponentes = {}

const validateIdComponentes = async (req, res, next)=>{
    const id = req.params.id
    const componente = await Componentes.findByPk(id)
    if (!componente)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middlewareComponentes.validateIdComponentes = validateIdComponentes



module.exports = middlewareComponentes