const { Router } = require('express')
const fabricanteSchema = require('../schemas/fabricantes.schema')
const schemaValidator = require('../schemas/schemaValidator')
const fabricantesMiddleware = require('../middlewares/fabricantes.middleware')
const fabricantesControllers = require('../controllers/fabricantes.controller')
const route = Router()

route.get('/fabricantes', fabricantesControllers.getAllFabricantes)

route.get('/fabricantes/:id', 
    fabricantesMiddleware.validateIdFabricante,
    fabricantesControllers.getFabricanteById
    )

route.post('/fabricantes', 
    schemaValidator(fabricanteSchema),
    fabricantesControllers.createFabricantes 
)

route.put('/fabricantes/:id', 
    fabricantesMiddleware.validateIdFabricante,
    fabricantesControllers.updateFabricantes
    ) 
    
route.delete('/fabricantes/:id',
    fabricantesMiddleware.validateIdFabricante,
    fabricantesControllers.deleteById
    ) 

route.get('/fabricantes/:id/productos', 
    fabricantesMiddleware.validateIdFabricante,
    fabricantesControllers.getProductosPorFabricante
)

module.exports = route
