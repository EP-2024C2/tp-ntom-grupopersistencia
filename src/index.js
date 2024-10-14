const express = require('express')
//const routes = require('./routes')
//const {genericMiddleware} = require('./middlewares')
const db = require('./models')
const PORT = 3000
const app = express()

app.use(express.json())

app.listen(PORT, async() => {
    console.log(`Aplicación iniciada en el puerto ${PORT}`)
    //db.sequelize.sync({force:true})
})