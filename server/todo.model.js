const mongoose = require('mongoose')

const Schema = mongoose.Schema

let Todo = new Schema({
    todo_description: {
        type: String
    },

    todo_responsible: {
        type: String
    },

    todo_priority: {
        type: String
    },

    todo_complated: {
        type: String
    },

    todo_complated: {
        type: Boolean
    }
})

module.exports = mongoose.model('Todo', Todo)