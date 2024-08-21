const Products = require('../models/products')
const slugify = require('slugify')

// create an new product

 const createProduct = async (req, res) => {
    try {
        const { name, price, image, category, reviewId } = req.body
        const slug = slugify(name, { lower: true, strict: true})
    const product = await Products.create({
        name, slug, price, image, category, reviewId
    })
    res.status(200).json({
        sucess: true,
        message: "product created successfully",
        data: product
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//geting all products 
const getAllProducts = async(req, res) => {
    try {
        const { name, page = 1, limit = 1 } = req.query
        let query = {}
       if(name){
        query.name = { $regex: name, $options: "i" }
       }
        // const page = parseInt(req.query.page) || 1
        // const limit = parseInt(req.query.limit) || 1
        const skip = (page - 1) * limit
        const totalProducts = await Products.countDocuments(query)
        const products = await Products.find(query)
        .populate('reviewId')
        .limit(limit)
        .skip(skip)
        res.status(200).json({
            sucess: true,
            message: "products found successfully",
            data: products,
            pages: {
                totalProducts,
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                limit: limit
            }
        })  
    } catch (error) {
        res.status(400).json({message: error.message})  
    }
}

// geting a single product
const getProduct = async(req, res) => {
    try {
        // const { productId } = req.params.productId
        const product = await Products.findOne({slug: req.params.productSlug})
        .populate('reviewId')
        if(product){
            res.status(200).json({
                sucess: true,
                message: "product found",
                data: product
            })
        }
        else{
            res.status(400).json({ message: "No such product found" })
        }
    } catch (error) {
        res.status(400).json({ message:error.message })
    }
}

// updating an product 
const updateProduct = async(req, res) => {
    try {
        const { id } = req.params
        const { name, ...rest } = req.body
        let updatedProduct = { ...rest }
        if(name) {
            const slug = slugify(name, { lower: true, strict: true })
            updatedProduct = { ...rest, name, slug }
        }
         const product = await Products.findByIdAndUpdate(id, updatedProduct, { new: true })
        if(product){
            res.status(200).json({
                sucess: true,
                message: "product updated sucessfully",
                data: product
            }) 
        }else{
            res.status(400).json({ message: "product not found" })
        }
         
    } catch (error) {
        res.status(400).json({ message:error.message })
    }
}
// deleting an product 
const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
    const poduct = await Products.findByIdAndDelete(id, req.body)
    res.status(200).json({
        sucess: true,
        message: "product updated sucessfully",
        data: poduct
    })
    } catch (error) {
      res.status(400).json({ message: message.error })  
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

//  count document
{/* ----------------- */}
//  is a method in Mongoose (and MongoDB) that is used to count the number of documents
//   in a collection that match a specific query or condition. 
//   It's commonly used when you want to determine how many documents exist
//    in a collection or how many documents meet certain criteria.
