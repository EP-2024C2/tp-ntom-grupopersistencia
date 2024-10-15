const { Fabricantes } = require('../models')
const middlewareFabricante = {}

const validateIdFabricante = async (req, res, next)=>{
    const id = req.params.id
    const fabricante = await Fabricantes.findByPk(id)
    if (!fabricante)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middlewareFabricante.validateIdFabricante = validateIdFabricante



module.exports = middlewareFabricante