const express = require('express')
const { json } = require('body-parser')
const productRoutes = require('./routes/product.routes')

const app = express()

app.use(json())
app.use('/', productRoutes)

app.listen(3000, () => {
    console.log('server is running ... ')
})