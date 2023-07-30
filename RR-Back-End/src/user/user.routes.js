'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', userController.test)
api.post('/saveUser', userController.saveUser)
api.post('/login', userController.login)
api.put('/updateUser/:id', ensureAuth, userController.updateUser)
api.put('/updateAccount', ensureAuth, userController.updateAccount)
api.delete('/deleteUser/:id', ensureAuth, userController.deleteUser)
api.delete('/deleteAccount', ensureAuth, userController.deleteAccount)
api.get('/getUsers', ensureAuth, userController.getUsers)
api.get('/getUser', ensureAuth, userController.getUserId)

module.exports = api
