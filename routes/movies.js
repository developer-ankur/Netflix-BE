const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.json(movies)
    }catch (err){
        res.status(500).json({error:'Failed To Fetch Movies'})
    }
})

router.post('/',async(req,res)=>{
    const newMovie = new Movie(req.body)
    try {
       const savedMovie = await newMovie.save()
       res.json(savedMovie) 
    } catch (error) {
        res.status(500).json({ error: 'Failed to create movie' });
    }
})

module.exports = router;