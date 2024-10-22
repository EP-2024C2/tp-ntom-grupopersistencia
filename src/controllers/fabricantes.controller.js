const {Fabricantes, Productos} = require ('../models')
const controllerFabricantes = {}
const fabricantesMiddleware = require('../middlewares/fabricantes.middleware')


const getAllFabricantes = async (req, res) => {
    const dataFabricante = await Fabricantes.findAll({})
    console.log(dataFabricante)
    res.status(200).json(dataFabricante)
}
controllerFabricantes.getAllFabricantes = getAllFabricantes


const getFabricanteById = async (req,res) => {
    const id = req.params.id
    const fabricante = await Fabricantes.findOne({
        where: {id},
        include: {
            model: Productos,
            as: 'Productos'
        }
    })
    res.status(200).json(fabricante)
}
controllerFabricantes.getFabricanteById = getFabricanteById


const createFabricantes = async (req,res) => {
    const fabricanteBody = req.body
    const fabricante = await Fabricantes.create({
        ...fabricanteBody
    })

    res.status(201).json(fabricante)
}
controllerFabricantes.createFabricantes = createFabricantes

const updateFabricantes = async (req,res) => {
    const {nombre, direccion, numeroContacto} = req.body
    const id = req.params.id
    const fabricante = await Fabricantes.findByPk(id)
    fabricante.nombre = nombre
    fabricante.direccion = direccion
    fabricante.numeroContacto = numeroContacto
    await fabricante.save()
    res.status(200).json(fabricante)
}
controllerFabricantes.updateFabricantes = updateFabricantes

const deleteById = async (req,res) => {
    const id = req.params.id
    try{
        const fabricante = await Fabricantes.findByPk(id)
        await fabricantesMiddleware.verificarAsociaciones(fabricante)
        const fabricantes = await Fabricantes.destroy({where: {id}})
        res.status(200).json({message: `Fabricante ${fabricantes} eliminado exitosamente`})
    } catch (error){
        res.status(500).json({error: error.message})
    }
}
controllerFabricantes.deleteById = deleteById

const getFabricantesByProducto = async (req,res)=> {
    const id = req.params.id
    const producto = await Productos.findByPk(id,{
        include: [{
            model: Fabricantes,
            through: { attributes: [] }
        }]
    })

    res.status(200).json(producto)
}

controllerFabricantes.getFabricantesByProducto = getFabricantesByProducto

const createFabricante = async(req,res) => {
    const {id, nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const idProducto = req.params.id
    const producto = await Productos.findByPk(idProducto) 
 
    const [fabricante, _ ] = await Fabricantes.findOrCreate(
        {
            where: {id: id || 0} , 
            defaults: {
                id: null,
                nombre, 
                direccion, 
                numeroContacto,
                pathImgPerfil
            }
        })
        producto.addFabricantes([fabricante])
    res.status(201).json({message: 'Fabricante agregado al Producto'})
}

controllerFabricantes.createFabricante = createFabricante


const getProductosPorFabricante = async(req,res) =>{
    const fabricanteId = req.params.id
    const fabricante = await Fabricantes.findByPk(fabricanteId,{
        include: [{
            model: Productos,
            through: { attributes: [] }
        }]
    })
    res.status(200).json(fabricante)
}
controllerFabricantes.getProductosPorFabricante = getProductosPorFabricante

module.exports = controllerFabricantes