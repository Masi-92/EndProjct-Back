import buyMovieModel from "../models/buyMovie.model.js";
import favMovieModel from "../models/favMovie.model.js";
import MovieModel from "../models/movie.model.js";

// find() ? um alle movise zu bekoomen

export const getAllMovie = async (req, res) => {
  // const { page, pageSize } = req.query;
  const movies = await MovieModel.find()
    // .limit(pageSize)
    // .skip((page - 1) * pageSize);
  res.send(movies);
};

export const deleteMovieFromMovies = async (req, res) => {
  const movieId = req.params.movie;

  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
    await favMovieModel.deleteMany({ movieId });
    await buyMovieModel.deleteMany({ movieId });

    if (!deletedMovie) {
      return res.status(404).send({ message: "Film nicht gefunden." });
    }

    res.status(200).send({ message: "Film aus den Filmen entfernt" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Etwas ist schief gelaufen" });
  }
};

export async function editMovie(req, res) {
  console.log(req.body);

  const { movie: movieId } = req.params;
  // const movie = await MovieModel.findByIdAndUpdate(
  //   movieId,
  //   {
  //     $set : {
  //       price : req.body.price,
  //       name : "edited"
  //     },
  //   },
  //   { new : true }
  // );
  // if (!movie) return res.status(400).send({ message: "movie not found" });

  let movie = await MovieModel.findById(movieId);
  if (!movie) return res.status(400).send({ message: "movie not found" });

  movie.price = req.body.price;
  movie = await movie.save();

  res.send(movie);
}

export async function getById(req, res) {
  const movie = await MovieModel.findById(req.params.movie);
  if (!movie) return res.status(400).send({ message: "movie not found" });
  res.send(movie);
}
//test
