const {Productos} = require ('../models')
const productoMiddleware = require('../middlewares/productos.middleware')
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

    try{
        const producto = await Productos.findByPk(id);

        await productoMiddleware.verificarAsociaciones(producto)
        
        await Productos.destroy({where: {id}})
        res.status(200).json({message: `Producto ${producto} eliminado exitosamente`})
    }catch (error){
        
        return res.status(500).json({ error: error.message });
        
    }
    
}

controller.deleteById = deleteById



module.exports = controller