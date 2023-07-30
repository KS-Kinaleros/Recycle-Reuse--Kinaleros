'use strict'

const express = require('express')
const api = express.Router()
const companyController = require('./company.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', companyController.test)
api.post('/saveCompany', ensureAuth, companyController.saveCompany)
api.put('/updateCompany/:id', ensureAuth, companyController.updateCompany)
api.delete('/deleteCompany/:id', ensureAuth, companyController.deleteCompany)
api.post('/searchCompany', companyController.searchCompany)
api.get('/getCompanies', companyController.getCompanies)
api.get('/getCompany/:id', companyController.getCompanyId)
