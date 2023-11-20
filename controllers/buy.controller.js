import BuyMovieModel from "../models/buyMovie.model.js";

export const subBuy = async (req, res) => {
  const movieId = req.params.movie;
  const userId = req.user.id;

  const movie = await BuyMovieModel.findOne({ movieId, userId });
  if (movie) {
    await BuyMovieModel.findOneAndDelete({ movieId });
    return res.send({
      message: "movie removed from buy list",
      isAdded: false,
    });
  }

  await BuyMovieModel.create({
    movieId,
    userId: req.user.id,
  });

  res.send({ message: "add to buying", isAdded: true });
};

export const getBuyMovie = async (req, res) => {
  const userId = req.user.id;
  const buyMovies = await BuyMovieModel.find({ userId }).populate("movieId");
  res.send(buyMovies.map((item) => item.movieId));
};
