const MovieReviews = require('../models/movieReview')
const Movies = require('../models/movies')

// creating an review

const createReview = async(req, res) => {
    try {
      const review = new MovieReviews({...req.body, movieSlug: req.params.movieSlug })
      await review.save()
      const movie = await Movies.findOne({ slug: req.params.movieSlug })
      movie.movieReview.push(review._id)
      await movie.save()
      res.status(200).json({
        success: true,
        message: 'Review added',
        data: movie
      })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createReview
}