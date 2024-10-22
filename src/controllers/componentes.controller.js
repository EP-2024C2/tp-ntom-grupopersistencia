const {Componentes, Productos} = require ('../models')
const controllerComponentes = {}
const componentesMiddleware = require('../middlewares/componente.middleware')

const getAllFComponentes = async (req, res) => {
    const dataComponentes = await Componentes.findAll({})
    console.log(dataComponentes)
    res.status(200).json(dataComponentes)
}
controllerComponentes.getAllFComponentes = getAllFComponentes


const getComponenteById = async (req,res) => {
    const id = req.params.id
    const componente = await Componentes.findOne({
        where: {id}
    })
    res.status(200).json(componente)
}
controllerComponentes.getComponenteById = getComponenteById


const createComponentes = async (req,res) => {
    const componenteBody = req.body
    const componente = await Componentes.create({
        ...componenteBody
    })

    res.status(201).json(componente)
}
controllerComponentes.createComponentes = createComponentes

const updateComponentes = async (req,res) => {
    const {nombre, direccion, numeroContacto} = req.body
    const id = req.params.id
    const componente = await Componentes.findByPk(id)
    componente.nombre = nombre
    componente.direccion = direccion
    componente.numeroContacto = numeroContacto
    await componente.save()
    res.status(200).json(componente)
}
controllerComponentes.updateComponentes = updateComponentes

const deleteById = async (req,res) => {
    const id = req.params.id

    try{
        const componente = await Componentes.findByPk(id)
        await componentesMiddleware.verificarAsociaciones(componente)
        const componentes = await Componentes.destroy({where: {id}})
        res.status(200).json({message: `Componente ${componentes} eliminado exitosamente`})
    } catch (error){
        res.status(500).json({error: error.message})
    }
    
}
controllerComponentes.deleteById = deleteById


const getComponentesByProducto = async(req,res) => {
    const productoId = req.params.id
    const componentes = await Productos.findByPk(productoId,{
        include: [{
            model: Componentes
        }]
    })
    res.status(200).json(componentes)
}
controllerComponentes.getComponentesByProducto = getComponentesByProducto

const createComponente = async(req,res) => {
    const {id, nombre, descripcion} = req.body
    const idProducto = req.params.id
    const producto = await Productos.findByPk(idProducto) 
 
    const [componente, _ ] = await Componentes.findOrCreate(
        {
            where: {id: id || 0} , 
            defaults: {
                id: null,
                nombre, 
                descripcion
            }
        })
        producto.addComponentes([componente])
    res.status(201).json({message: 'Componente agregado al Producto'})
}

controllerComponentes.createComponente = createComponente

module.exports = controllerComponentes