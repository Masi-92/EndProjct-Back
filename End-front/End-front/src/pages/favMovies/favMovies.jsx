import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FavApi } from "../../api/favApi";
import style from "./favMovies.module.scss";

const FavMovies = () => {
  const [movies, setMovies] = useState([]);
//um die fav mit id zu speichren 
//FavApi =>  getAll() ist für axios da 
  useEffect(() => {
    FavApi.getAll()
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // movie addOrRemoveFromFavorite() ist für axios da 
  //um die movie removed to favorites

  function handleLike(id) {
    FavApi.addOrRemoveFromFavorite(id)
      .then((res) => {
        toast.info("movie removed to favorites");
        const movieIndex = movies.findIndex((item) => item._id === id);
        movies.splice(movieIndex, 1);
        setMovies([...movies]);
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className={style.movies}>
      <h1>Favorite List</h1>
      <div className={style.list}>
        {movies.map((item) => (
          <div key={item._id} className={style.item}>
            <IconButton
              className={style.like}
              onClick={() => handleLike(item._id)}
            >
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
            <img src={item.cover} />
            <div className={style.itemContent}>
              <h3>{item.name}</h3>
              <span>
                <StarIcon style={{ color: "yellow" }} /> {item.IMDB}
              </span>
              <span>
                {item.genre} {item.builtYear}
              </span>
              <span>
                {item.price} $ {item.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavMovies;
