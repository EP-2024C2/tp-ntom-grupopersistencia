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

const verificarAsociaciones = async (componente) => {
    const productos = await componente.getProductos();
  
    if (productos.length > 0) {
      throw new Error('No se puede eliminar el componente porque está asociado a productos.');
    }
};

middlewareComponentes.verificarAsociaciones = verificarAsociaciones

module.exports = middlewareComponentes