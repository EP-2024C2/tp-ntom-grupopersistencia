const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const productoMiddleware = require('../middlewares/productos.middleware')
// const productoSchema = require('../schemas/productos.schema')
const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id', 
    productoMiddleware.validateIdProducto,
    productosController.getProductoById)

module.exports = route