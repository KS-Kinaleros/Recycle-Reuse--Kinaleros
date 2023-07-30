'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', userController.test)
api.post('/saveUser', userController.saveUser)
api.post('/login', userController.login)
api.put('/updateUser/:id', ensureAuth, userController.updateUser)
api.delete('/deleteUser/:id', ensureAuth, userController.deleteUser)
api.get('/getUsers', ensureAuth, userController.getUsers)
api.get('/getUser/:id', ensureAuth, userController.getUserId)

module.exports = api
