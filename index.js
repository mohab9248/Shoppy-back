import express from "express"

const app = express()
app.listen(4000)



app.get('/', function (req, res) {
    res.send('Hello World')
  })