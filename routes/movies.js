const express = require('express');
const Movie = require('../models/movie');
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const { createMovieSchema } = require('../validators/createMovieSchema');
const validateRequest = require('../middleware/validateRequest');

router.get('/',async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.json(movies)
    }catch (err){
      next(err);
    }
})

router.post('/',authenticateToken,validateRequest(createMovieSchema),async(req,res)=>{
    const newMovie = new Movie(req.body)
    try {
       const savedMovie = await newMovie.save()
       res.json(savedMovie) 
    } catch (error) {
      next(err);
    }
})

// GET: Retrieve a single movie by ID
router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      next(err);
    }
  });

  // PUT: Update a movie by ID
router.put('/:id', authenticateToken,validateRequest(createMovieSchema), async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
      res.json(updatedMovie);
    } catch (err) {
      next(err);
    }
  });
// DELETE: Remove a movie by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
      res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
      next(err);
    }
  });  

module.exports = router;