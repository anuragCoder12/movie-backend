const express = require('express')
 const router = express.Router()
 const{ 
    createTestimonial,
    getAllTEstimonials
 } = require('../controllers/testimonials')

 router.post('/', createTestimonial)
 router.get('/', getAllTEstimonials)

 module.exports = router