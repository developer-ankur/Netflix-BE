const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: Date,
  genres: [String],
  imageUrl: String,
  rating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
