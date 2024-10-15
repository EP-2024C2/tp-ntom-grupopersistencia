const {Productos} = require ('../models')

const controller = {}


const getAllProductos = async (req, res) => {
    const dataProductos = await Productos.findAll({})
    console.log(dataProductos)
    res.status(200).json(dataProductos)
}

controller.getAllProductos = getAllProductos


const getProductoById = async (req,res) => {
    const id = req.params.id
    const producto = await Productos.findOne({
        where: {id}
    })
    res.status(200).json(producto)
}

controller.getProductoById = getProductoById

module.exports = controller