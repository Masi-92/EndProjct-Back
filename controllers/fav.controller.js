import FavMovieModel from "../models/favMovie.model.js";

export const toggleMovieLike = async (req, res) => {
  const movieId = req.params.movie;
  const userId = req.user.id;

  const movie = await FavMovieModel.findOne({ movieId,userId });
  if (movie) {
    await FavMovieModel.findOneAndDelete({ movieId });
    return res.send({
      message: "movie removed from favorites",
      isAdded: false,
    });
  }

  const result = await FavMovieModel.create({
    movieId,
    userId: userId,
  });

  res.send({ message: "added to favorites", isAdded: true });
};
//find() weil mehr als eine ist
export const getFavMovies = async (req, res) => {
  const userId = req.user.id;
  //populate um von id zu  ganze obj(movieId) zu  kommen
  //populate funkzonirt wie eine join()
  const favMovies = await FavMovieModel.find({ userId }).populate("movieId");
  console.log(favMovies);
  res.send(favMovies.map((item) => item.movieId));
};
