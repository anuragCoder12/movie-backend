const Testimonials = require('../models/testimonials')

// create a new testimonial 
const createTestimonial = async(req, res) => {
    try {
        const testimonial = await Testimonials.create(req.body)
    res.status(200).json({
        sucess: true,
        message: "Testimonial created sucessfully",
        data: testimonial
    })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
}
// get all testimonials
const getAllTEstimonials = async(req, res) => {
    try {
    const testimonials = await Testimonials.find({})
    res.status(200).json({
        success: true,
        message: "testimonials fetched sucessfully",
        data: testimonials
    }) 
    } catch (error) {
       res.status(400).json({ message: error.message }) 
    }
}
// get a single testimonial
const getTestimonial = async(req, res) => {
    try {
        const { id } = req.params
    const testmonial = await Testimonials.findById(id)
    res.status(200).json({
        success: true,
        message: "Testimonial found",
        data: testmonial
    }) 
    } catch (error) {
     res.status(400).json({ message: error.message })   
    }
} 
// update testimonial
const updateTestimonial = async(req, res) => {
    try {
        const { id } = req.params
        const testimonial = await Testimonials.findByIdAndUpdate(id, req.body)
        if(!testimonial){
            res.status(400).json({message: "Testimonial not found"})
        }
        const updatedTestimonial = await Testimonials.findById(id)
        res.status(200).json({
            success: true,
            message: "Testimonial updated sucessfully",
            data: updatedTestimonial
        })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
}
// delete testimonial
const deleteTestimonial = async(req, res) => {
    try {
       const { id } = req.body
       const testimonial = await Testimonials.findByIdAndDelete(id)
       res.status(200).json({
        success: true,
        message: "testimonial deleted successfully",
        data: testimonial
       })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
}
module.exports = {
    createTestimonial,
    getAllTEstimonials
}