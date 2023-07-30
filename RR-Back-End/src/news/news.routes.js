'use strict'

const express = require('express')
const api = express.Router()
const newsController = require('./news.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', newsController.test)
api.post('/saveNews', ensureAuth, newsController.saveNews)
api.put('/updateNews/:id', ensureAuth, newsController.updateNews)
api.delete('/deleteNews/:id', ensureAuth, newsController.deleteNews)
api.get('/getNews', newsController.getNews)
api.get('/getNewsId/:id', newsController.getNewsId)

module.exports = api