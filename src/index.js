require('dotenv').config(); 
const PORT = process.env.PORT || 3000
const express = require('express')
const routes = require('./routes')
const db = require('./models')
const app = express()

app.use(express.json())

app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.use(routes.componentesRoute)

app.listen(PORT, async() => {
    console.log(`Aplicación iniciada en el puerto ${PORT}`)
    //db.sequelize.sync({force:true})
})
