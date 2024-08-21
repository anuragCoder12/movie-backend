const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movies");

router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:movieSlug", getMovie);
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)
module.exports = router;
