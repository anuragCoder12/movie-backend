const Movies = require('../models/movies')
const slugify = require('slugify')
// creating an movie
const createMovie = async(req, res) => {
    try {
        const { title } = req.body
        const slug = slugify(title, { lower: true, strict: true })
        // adding slug to req.body
        req.body.slug = slug
        const movie = await Movies.create(req.body)
        res.status(200).json({
            success: true,
            message: "Movie created successfully",
            data: movie
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// get all movies
const getAllMovies = async(req, res) => {
    try {
      const { title, page = 1, limit = 1 } = req.query
      let query = {}
      if(title){
        query.title = { $regex: title, $options: "i" }
      }
      // const page = parseInt(req.query.page) || 1
      // const limit = parseInt(req.query.limit) || 2
      const skip = (page - 1) * limit
      const totalMovies = await Movies.countDocuments(query)
      const movies = await Movies.find(query)
      .populate('movieReview') 
      .limit(limit)
      .skip(skip)
      res.status(200).json({
        success: true,
        message: "Movies got Sucessfully",
        data: movies,
        pages:{
          totalMovies,
          currentPage: page,
          totalPages: Math.ceil(totalMovies / limit),
          limit: limit
        }
      })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
}

// get single movie
const getMovie = async(req, res) => {
    try {
        const movie = await Movies.findOne({slug: req.params.movieSlug})
        .populate('movieReview')
        if(movie){
            res.status(200).json({
                success: true,
                message: 'got the movie',
                data: movie
            })
        } 
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
  
}
// updating an movie
const updateMovie = async(req, res) => {
  try {
    const { id } = req.params
    const { title, ...rest } = req.body
    let updatedMovie = { ...rest }
    if(title) {
      const slug = slugify(title, { lower: true, strict: true })
      updatedMovie = { ...rest, title, slug }
    }
    const movie = await Movies.findByIdAndUpdate(id, updatedMovie, { new: true })
    if(movie) {
      res.status(200).json({
        success: true,
        message: "updated Product",
        dats: movie
      })
    }else {
      res.status(404).json({message: "No such movies found"})
    }
  } catch (error) {
    res.status(400).json({ message: message.error })
  }
 
}
// delete an movie
const deleteMovie = async(req, res) => {
  try {
    const { id } = req.params
  const movie = await Movies.findOneAndDelete(id, req.body)
  if(movie) {
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: movie
    })
  }else {
    res.status(404).json({ message: "Movie not found" })
  }
  } catch (error) {
   res.status(400).json({ message: message.error }) 
  }
}
module.exports = {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
}
