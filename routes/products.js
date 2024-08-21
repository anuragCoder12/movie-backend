const express = require('express')
const router = express.Router()
const { 
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct

 } = require('../controllers/products')

router.post('/', createProduct)
router.get('/', getAllProducts)
router.get('/:productSlug', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
module.exports = router