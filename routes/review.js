const express = require('express')
const {
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/review')
const router = express.Router()

router.post('/:productSlug/review', createReview)
router.put('/:productSlug/review/:reviewId', updateReview)
router.delete('/:productSlug/review/:reviewId', deleteReview)
module.exports = router