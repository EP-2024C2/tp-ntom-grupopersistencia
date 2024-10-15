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


const createProducto = async (req,res) => {
    const productoBody = req.body
    const producto = await Productos.create({
        ...productoBody
    })

    res.status(201).json(producto)
}

controller.createProducto = createProducto

const updateProducto = async (req,res) => {
    const {nombre, descripcion, precio} = req.body
    const id = req.params.id
    const producto = await Productos.findByPk(id)
    producto.nombre = nombre
    producto.descripcion = descripcion
    producto.precio = precio
    await producto.save()
    res.status(200).json(producto)
}

controller.updateProducto = updateProducto

const deleteById = async (req,res) => {
    const id = req.params.id
    const producto = await Productos.destroy({where: {id}})
    res.status(204).json({message: `Producto ${id} eliminado exitosamente`})
}

controller.deleteById = deleteById

module.exports = controller