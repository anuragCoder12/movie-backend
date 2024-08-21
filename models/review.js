const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    image:{
        type: Buffer
    }
},{ timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)