import FavMovieModel from "../models/favMovie.model.js";

export const addMovieToFavorite = async (req, res) => {
  const movieId = req.params.movie;

  const movie = await FavMovieModel.findOne({ movieId });
  if (movie) {
    await FavMovieModel.findOneAndDelete({ movieId });
    return res.send({
      message: "movie removed from favorites",
      isAdded: false,
    });
  }

  const result = await FavMovieModel.create({
    movieId,
    userId: req.user.id,
  });

  res.send({ message: "add to favorite", isAdded: true });
};

export const getFavMovies = async (req, res) => {
  const userId = req.user.id;
  const favMovies = await FavMovieModel.find({ userId }).populate("movieId");
  res.send(favMovies.map((item) => item.movieId));
};

export const deleteMovieFromFavorite = async (req, res) => {
  const movieId = req.params.movie;

  const favMovie = await FavMovieModel.findOneAndDelete({ movieId });

  if (!favMovie) return res.status(404).send({ message: "movie not found" });

  res.send({ message: "movie removed from favorites" });
};
