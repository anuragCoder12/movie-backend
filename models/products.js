const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    image: {
        type: String
    },
    // category: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // }],
    reviewId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
   
},
{ timestamps: true }
)

module.exports = mongoose.model('Products', productSchema)