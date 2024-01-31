import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import style from "./buyMovies.module.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//import StarIcon from "@mui/icons-material/Star";
import { Download } from "@mui/icons-material";
import { toast } from "react-toastify";
import { BuyApi } from "../../api/buyApi";
import { FavApi } from "../../api/favApi";

const BuyMovie = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    BuyApi.getAll()
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err.message));

    FavApi.getAll()
      .then((res) => {
        setFavMovies(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  //um die zu removed to buylist und durch useState relauden

  //BuyApi() ist for axios da
  function removeFromBuyList(id) {
    BuyApi.addOrRemoveMovie(id)
      .then(() => {
        toast.info("movie removed to buylist");
        const movieIndex = movies.findIndex((item) => item._id === id);
        movies.splice(movieIndex, 1);
        setMovies([...movies]);
      })
      .catch((err) => toast.error(err.message));
  }

  function handleLike(id) {
    FavApi.addOrRemoveFromFavorite(id)
      .then((res) => {
        if (res.data.isAdded) {
          toast.success("movie add to favorites");
          const movie = movies.find((item) => item._id === id);
          favMovies.push(movie);
          setFavMovies([...favMovies]);
        } else {
          toast.info("movie removed to favorites");
          setFavMovies(favMovies.filter((item) => item._id !== id));
        }
      })
      .catch(function (err) {
        console.log(err.response);
        return toast.error(err.message);
      });
  }

  function isLiked(movie) {
    if (movie && movie._id) {
      const favMovie = favMovies.find((item) => item._id === movie._id);
      if (favMovie) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className={style.movies}>
      <h1></h1>
      <div className={style.list}>
        {movies.map((item) => (
          <div key={item._id} className={style.item}>
            <IconButton
              className={style.like}
              onClick={() => handleLike(item._id)}
            >
              {isLiked(item) ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <img src={item.cover} />
            <div className={style.itemContent}>
              <h3>{item.name}</h3>
              <span style={{ color: "yellow" }}> IMDB {item.IMDB} </span>
              <span>
                {item.genre} ( {item.builtYear})
              </span>
              <span></span>
              <span>
                {item.price} $ {item.createdAt}
              </span>
              <span>
                <Download className={style.downlodIcon} />
              </span>
              <span
                className={style.deletIcon}
                onClick={() => removeFromBuyList(item._id)}
              >
                <DeleteSharpIcon className={style.deletIcon} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyMovie;
