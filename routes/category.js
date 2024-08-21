const express = require('express')
const {
    createCategory,
    getAllCategory
} = require('../controllers/category')
const router = express.Router()

router.post('/', createCategory)
router.get('/', getAllCategory)

module.exports = router