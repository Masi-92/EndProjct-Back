import { useEffect, useState } from "react";
//import {Navigate, useNavigate} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import style from "./movies.module.scss";
//import StarIcon from '@mui/icons-material/Star';
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BuyApi } from "../../api/buyApi";
import { FavApi } from "../../api/favApi";
import { MovieApi } from "../../api/movieApi";
import NeonTextEffect from "../../component/layout/TexMoviLand";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [buy, setBuy] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decodedUser = jwtDecode(token);
      console.log("decodedUser", decodedUser);
      if (decodedUser.role === "admin") setIsAdmin(true);
      else setIsAdmin(false);
    } catch (err) {
      console.log(err);
    }
  }, []);
// ist for axios da  MovieApi.getAll()
//um movie zu ... ? 
  useEffect(() => {
    MovieApi.getAll()
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      //in fav  to save 
    FavApi.getAll()
      .then((res) => {
        setFavMovies(res.data);
      })
      .catch((err) => console.log(err.message));
  // in buy to save
  // axios is in BuyApi
    BuyApi.getAll()
      .then((res) => {
        setBuy(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
// user can with   handleLike(id) delete or add to fav
// axios is in FavApi 
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
        return toast.error(err.response.data.message);
      });
  }
// user can buy
  function handleBuy(id) {
    BuyApi.addOrRemoveMovie(id)
      .then((res) => {
        if (res.data.isAdded) {
          toast.success("movie add to buyList");
          const movie = movies.find((item) => item._id === id);
          buy.push(movie);
          setBuy([...buy]);
        } else {
          toast.info("movie removed to buyList");
          setBuy(buy.filter((item) => item._id !== id));
        }
      })
      .catch(function (err) {
        return toast.error(err.message);
      });
  }
// suche nach fav moive nur wenn (movie && movie._id) 
  function isLiked(movie) {
    if (movie && movie._id) {
      const favMovie = favMovies.find((item) => item._id === movie._id);
      if (favMovie) {
        return true;
      }
    }
    return false;
  }

  // suche nach buy moive nur wenn (movie && movie._id) 

  function isBuy(movie) {
    if (movie && movie._id) {
      const buyMovie = buy.find((item) => item._id === movie._id);
      if (buyMovie) {
        return true;
      }
    }
    return false;
  }

  // ADMIIIIN DELETE CODE

  function handleDeleteMovie(id) {
    MovieApi.deleteMovie(id)
      .then((res) => {
        toast.info("movie removed to movies");
        const updatedMovies = movies.filter((item) => item._id !== id);
        setMovies([...updatedMovies]);
      })
      .catch((err) => toast.error(err.message));
    console.log("id", id);
  }

  const filteredMovies = movies.filter((item) =>
    item.name.includes(searchValue)
  );

  return (
    <div className={style.movies}>
      <NeonTextEffect />
      <input
        className={style.searchInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="search movie name ..."
      />
      <div className={style.list}>
        {filteredMovies.map((movie) => (
          <div key={movie._id} className={style.item}>
            <IconButton
              className={style.like}
              onClick={() => handleLike(movie._id)}
            >
              {isLiked(movie) ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <img src={movie.cover} />
            <div className={style.itemContent}>
              <h3>{movie.name}</h3>
              <span style={{ color: "yellow" }}> IMDB ({movie.IMDB}) </span>
              <span>
                {movie.genre} ({movie.builtYear}){" "}
              </span>
              {isAdmin ? (
                <div>
                  <IconButton
                    style={{ width: "max-content" }}
                    onClick={() => handleDeleteMovie(movie._id)}
                  >
                    <DeleteForeverSharpIcon style={{ color: "red" }} />
                  </IconButton>
                  <Link to={`/app/editMovie/${movie._id}`}>
                    <IconButton style={{ width: "max-content" }}>
                      <EditIcon style={{ color: "green" }} />
                      <span style={{ color: "withe" }}>{movie.price} $</span>
                    </IconButton>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(movie._id)}
                  className={style.bttPrice}
                >
                  <span>
                    {isBuy(movie) ? (
                      <span className={style.hoverText}>Ready to buy</span>
                    ) : (
                      <span className={style.defaultText}>{movie.price} $</span>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
