'use strict'

const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('News', newsSchema)