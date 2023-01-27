const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models/index')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to India.' })
})

require('./routes/index')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8082
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
