const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
let Todo = require('./todo.model')

// Access to Express Router
const todoRoutes = express.Router()


const app = express()
    // Default port
const PORT = 4000


// Using Cors package
app.use(cors())

// Using Body Parser package
//Node.js body parsing middleware
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todos)
        }
    })
})
todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id
    Todo.findById(id, (err, todo) => {
        res.json(todo)
    })
})

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body)
    todo.save().then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' })
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

todoRoutes.route('update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo)
            res.status(404).send('data is not found')
        else
            todo.todo_description = req.body.todo_description
        todo.todo_responsible = req.body.todo_responsible
        todo.todo_priority = req.body.todo_priority
        todo.todo_complated = req.body.todo_complated

        todo.save().then(todo => {
                res.json('Todo updated')
            })
            .catch(err => {
                res.status(400).send('Update not possible')
            })
    })
})


app.use('/todos', todoRoutes)


app.listen(PORT, () => {
    console.log('Server was started on port: ' + PORT)
})