'use strict'

const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ]

}, { versionKey: false })

module.exports = mongoose.model('Forum', forumSchema)