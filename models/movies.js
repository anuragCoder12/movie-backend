const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number
    },
    slug:{
        type: String,
        required: true
    },
    movieReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieReviews'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Movies', movieSchema)