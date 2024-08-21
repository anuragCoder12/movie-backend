const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) // To suppourt json encoded bodies
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen( 5000, () => console.log("db connected and port running",process.env.PORT))
}).catch((err) => {
    console.log(err)
})

const product = require('./routes/products')
const testimonials = require('./routes/testimonials')
const category = require('./routes/category')
const login = require('./routes/users')
const review = require('./routes/review')
const movies = require('./routes/movies')
const movieReview = require('./routes/movieReview')

app.use('/api/products', product)
app.use('/api/testimonials', testimonials)
app.use('/api/category', category)
app.use('/api/auth', login)
app.use('/api/products', review)
app.use('/api/movies', movies)
app.use('/api/movies', movieReview)
