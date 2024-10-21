require('dotenv').config(); 
const express = require('express')
const routes = require('./routes')
const db = require('./models')
const app = express()

app.use(express.json())

app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.use(routes.componentesRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, async() => {
    console.log(PORT)
    console.log(`Aplicación iniciada en el puerto ${PORT}`)
    //db.sequelize.sync({force:true})
})
