import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MovieApi } from "../../api/movieApi";
import style from "./editMovie.module.scss";

const EditMovie = () => {
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
// MoviApi() ist for axios da 
//um Zustand des Komponenten zu speichern =>'price'
  useEffect(() => {
    MovieApi.getById(id)
      .then((res) => {
        setMovie(res.data);
        setPrice(res.data.price);
      })
      .catch((err) => toast.error(err.message));
  }, []);
// [] damit den efect nur einmal zu machen 
// um die ändrung zu speichren
  function handleSaveClick() {
    MovieApi.editMoviePrice(id, price)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className={style.container}>
      <Typography component="h1">Edit Movie Price</Typography>
      <Typography component="h3">Movie : {movie.name}</Typography>
      <TextField
        label="Movie Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <Button variant="outlined" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export default EditMovie;

