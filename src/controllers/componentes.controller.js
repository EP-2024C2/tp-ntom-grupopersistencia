const {Componentes} = require ('../models')
const controllerComponentes = {}


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
    const componente = await Componentes.destroy({where: {id}})
    res.status(200).json({message: `Componente ${componente} eliminado exitosamente`})
}
controllerComponentes.deleteById = deleteById

module.exports = controllerComponentes