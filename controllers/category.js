const Category = require('../models/category')

// create category 
const createCategory = async (req, res) => {
    try {
        const category =  await Category.create(req.body)
        res.status(200).json({
            success: true,
            message: 'category created',
            data: category
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// getAll category 
const getAllCategory = async (req, res) => {
    try {
        const category =  await Category.find({})
        res.status(200).json({
            success: true,
            message: 'All category found',
            data: category
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = {
    createCategory, 
    getAllCategory
}