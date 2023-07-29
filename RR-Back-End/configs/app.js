'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
// rutas

const app = express()
const port = process.env.PORT || 3100

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
//para usar las rutas

exports.initServer = () =>{
    app.listen(port)
    console.log(`Server is running in port ${port}`)
}