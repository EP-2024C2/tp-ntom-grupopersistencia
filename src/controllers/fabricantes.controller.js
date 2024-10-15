const {Fabricantes} = require ('../models')
const controllerFabricantes = {}


const getAllFabricantes = async (req, res) => {
    const dataFabricante = await Fabricantes.findAll({})
    console.log(dataFabricante)
    res.status(200).json(dataFabricante)
}
controllerFabricantes.getAllFabricantes = getAllFabricantes


const getFabricanteById = async (req,res) => {
    const id = req.params.id
    const fabricante = await Fabricantes.findOne({
        where: {id}
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
    const fabricantes = await Fabricantes.destroy({where: {id}})
    res.status(200).json({message: `Fabricante ${fabricantes} eliminado exitosamente`})
}
controllerFabricantes.deleteById = deleteById

module.exports = controllerFabricantes