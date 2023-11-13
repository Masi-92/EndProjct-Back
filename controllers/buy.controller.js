import BuyMovieModel from "../models/buyMovie.model.js";

export const subBuy = async (req, res) => {
  const movieId = req.params.movie;

  const movie = await BuyMovieModel.findOne({ movieId });
  if (movie) {
    await BuyMovieModel.findOneAndDelete({ movieId });
    return res.send({
      message: "movie removed from buyiiiing",
      isAdded: false,
    });
  }

  const result = await BuyMovieModel.create({
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

export const deleteMovieFromBuying = async (req, res) => {
  const movieId = req.params.movie;

  const buymovie = await BuyMovieModel.findOneAndDelete({ movieId });

  if (!buymovie) return res.status(404).send({ message: "movie not found" });

  res.send({ message: "movie removed from Buying " });
};
