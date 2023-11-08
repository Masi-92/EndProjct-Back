import MovieModel from "../models/movie.model.js";

export const getAllMovie = async (req, res) => {
  const movies = await MovieModel.find();
  res.send(movies);
};
