'use strict'

const express = require('express')
const api = express.Router()
const productController = require('./product.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', productController.test)
api.post('/saveProduct', ensureAuth, productController.saveProduct)
api.put('/updateProduct/:id', ensureAuth, productController.updateProduct)
api.delete('/deleteProduct/:id', ensureAuth, productController.deleteProduct)
api.get('/getProducts', productController.getProducts)
api.get('/getProductId/:id', productController.getProductById)

module.exports = api