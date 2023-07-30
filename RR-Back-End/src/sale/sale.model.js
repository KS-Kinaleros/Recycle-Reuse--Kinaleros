'use strict'

const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    date: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    }
}, { versionKey: false })

module.exports = mongoose.model('Sale', saleSchema)