const { Router } = require('express')
const componenteSchema = require('../schemas/componentes.schema')
const schemaValidator = require('../schemas/schemaValidator')
const componenteMiddleware = require('../middlewares/componente.middleware')
const componentesControllers = require('../controllers/componentes.controller')
const route = Router()

route.get('/componentes', componentesControllers.getAllFComponentes)

route.get('/componentes/:id', 
    componenteMiddleware.validateIdComponentes,
    componentesControllers.getComponenteById,
    )

route.post('/componentes', 
    schemaValidator(componenteSchema),
    componentesControllers.createComponentes 
)

route.put('/componentes/:id', 
    componenteMiddleware.validateIdComponentes,
    componentesControllers.updateComponentes,
    ) 
    
route.delete('/componentes/:id',
    componenteMiddleware.validateIdComponentes,
    componentesControllers.deleteById, 
    ) 


module.exports = route
