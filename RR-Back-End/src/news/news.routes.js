'use strict'

const express = require('express')
const api = express.Router()
const newsController = require('./news.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', newsController.test)

module.exports = api