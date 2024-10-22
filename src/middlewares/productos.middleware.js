const { Productos } = require('../models')
const middleware = {}

const validateIdProducto = async (req, res, next)=>{
    const id = req.params.id
    const producto = await Productos.findByPk(id)
    if (!producto)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middleware.validateIdProducto = validateIdProducto

const verificarAsociaciones = async (producto) => {
    const componentes = await producto.getComponentes();
    const fabricantes = await producto.getFabricantes();
  
    if (componentes.length > 0 || fabricantes.length > 0) {
      throw new Error('No se puede eliminar el producto porque está asociado a componentes o fabricantes.');
    }
};

middleware.verificarAsociaciones = verificarAsociaciones

module.exports = middleware