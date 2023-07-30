'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', userController.test)

module.exports = api
