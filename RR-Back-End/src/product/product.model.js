'use strict'

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = mongoose.model('Product', productSchema)