import MovieModel from "../models/movie.model.js";

export const getAllMovie = async (req, res) => {
  const movies = await MovieModel.find();
  res.send(movies);
};

export const deleteMovieFromMovies = async (req, res) => {
  const movieId = req.params.movie;

  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).send({ message: "Film nicht gefunden." });
    }

    res.status(200).send({ message: "Film aus den Filmen entfernt" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Etwas ist schief gelaufen" });
  }
};
