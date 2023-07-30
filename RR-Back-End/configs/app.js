'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
// rutas
const userRoutes = require('../src/user/user.routes')
const newsRoutes = require('../src/news/news.routes')
const forumRoutes = require('../src/forum/forum.routes')
const companyRoutes = require('../src/company/company.routes')
const productRoutes = require('../src/product/product.routes')
const saleRoutes = require('../src/sale/sale.routes')

const app = express()
const port = process.env.PORT || 3100

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
//para usar las rutas
app.use('/user', userRoutes)
app.use('/news', newsRoutes)
app.use('/forum', forumRoutes)
app.use('/company', companyRoutes)
app.use('/product', productRoutes)
app.use('/sale', saleRoutes)

exports.initServer = () =>{
    app.listen(port)
    console.log(`Server is running in port ${port}`)
}