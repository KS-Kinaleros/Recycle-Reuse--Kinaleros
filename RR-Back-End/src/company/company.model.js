'use strict'

const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

module.exports = mongoose.model('Company', companySchema)