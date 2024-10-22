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

const verificarAsociaciones = async (fabricante) => {
    const productos = await fabricante.getProductos();
  
    if (productos.length > 0) {
      throw new Error('No se puede eliminar el fabricante porque está asociado a productos.');
    }
};

middlewareFabricante.verificarAsociaciones = verificarAsociaciones

module.exports = middlewareFabricante