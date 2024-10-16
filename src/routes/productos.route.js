const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const controllerFabricantes = require('../controllers/fabricantes.controller')
const controllerComponentes = require('../controllers/componentes.controller')
const productoMiddleware = require('../middlewares/productos.middleware')

const productoSchema = require('../schemas/productos.schema')
const fabricanteSchema = require('../schemas/fabricantes.schema')
const componenteSchema = require('../schemas/componentes.schema')
const schemaValidator = require('../schemas/schemaValidator')
const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.getProductoById)

route.get('/productos/:id/fabricantes', 
    productoMiddleware.validateIdProducto,
    controllerFabricantes.getFabricantesByProducto)

route.get('/productos/:id/componentes', 
    productoMiddleware.validateIdProducto,
    controllerComponentes.getComponentesByProducto)

route.post('/productos', 
    schemaValidator(productoSchema), 
productosController.createProducto)

route.post('/productos/:id/fabricantes', 
    productoMiddleware.validateIdProducto, 
    schemaValidator(fabricanteSchema),
    controllerFabricantes.createFabricante )

route.post('/productos/:id/componentes', 
    productoMiddleware.validateIdProducto, 
    schemaValidator(componenteSchema),
    controllerComponentes.createComponente )

route.put('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.updateProducto) 
    
route.delete('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.deleteById) 
    

module.exports = route