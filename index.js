require('dotenv').config();
require('./config')

const express = require('express')
const cors = require('cors')
const AuthRoute = require('./routes/auth');
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req,res) =>{
    res.json("Medaid Project")
  
})

app.use('/api', AuthRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`App listening on port ${PORT}`)});