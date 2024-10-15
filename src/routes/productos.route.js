const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const productoMiddleware = require('../middlewares/productos.middleware')
const productoSchema = require('../schemas/productos.schema')
const schemaValidator = require('../schemas/schemaValidator')
const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.getProductoById)

route.post('/productos', 
    schemaValidator(productoSchema), 
productosController.createProducto)

route.put('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.updateProducto) 
    
route.delete('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.deleteById) 
    

module.exports = route