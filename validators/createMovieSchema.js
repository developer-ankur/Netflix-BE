const joi = require('joi');

const createMovieSchema=joi.object({
    title: joi.string().min(2).required(),
    description: joi.string().min(10).required(),
    genre: joi.string().min(3).required(),
    releaseDate: joi.date().required(),
    rating: joi.number().min(0).max(10),
})

module.exports={
    createMovieSchema
}