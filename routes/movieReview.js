const express = require('express')
const {
    createReview
} = require('../controllers/movieReviews')
const router = express.Router()

router.post('/:movieSlug/movie-review', createReview)

module.exports = router