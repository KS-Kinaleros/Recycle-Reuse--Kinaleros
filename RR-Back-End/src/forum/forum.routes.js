'use strict'

const express = require('express')
const api = express.Router()
const forumController = require('./forum.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', forumController.test)
api.post('/saveForum', ensureAuth, forumController.saveForum)
api.put('/updateForum/:id', ensureAuth, forumController.updateForum)
api.put('/addAnswer/:id', ensureAuth, forumController.saveAnswer)
api.delete('/deleteForum/:id', ensureAuth, forumController.deleteForum)
api.get('/getForums', forumController.getForums)
api.get('/getForum/:id', forumController.getForumId)

module.exports = api