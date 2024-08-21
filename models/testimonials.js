const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    designation:{
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Testimonials', testimonialSchema)