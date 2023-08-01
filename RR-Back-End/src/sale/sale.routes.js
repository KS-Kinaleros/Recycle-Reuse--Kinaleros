'use strict'

const express = require('express')
const api = express.Router()
const salesController = require('./sale.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', salesController.test)
api.post('/saveSale/:id', ensureAuth, salesController.saveSale)
api.put('/updateSale/:id', ensureAuth, salesController.updateSale)
api.delete('/cancelSale/:id', ensureAuth, salesController.cancelSale)
api.delete('/cancelSaleAdmin/:id', ensureAuth, salesController.cancelSaleAdmin)
api.get('/getSalles', salesController.getSales)
api.get('/getSaleUser', ensureAuth, salesController.getSaleByUser)


module.exports = api