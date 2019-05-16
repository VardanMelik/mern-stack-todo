const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 4000

// Using Cors package
app.use(cors())

// Using Body Parser package
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('Server was started on port: ' + PORT)
})