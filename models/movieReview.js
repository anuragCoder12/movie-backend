const mongoose = require('mongoose')

const movieReviewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
   movieId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies'
   } 

}, { timestamps: true })
module.exports = mongoose.model('MovieReviews', movieReviewSchema)