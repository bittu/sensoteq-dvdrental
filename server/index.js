const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config();
// const db = require('./db');
const router = require('./routes');
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/v1', router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})