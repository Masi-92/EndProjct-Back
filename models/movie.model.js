import { model, Schema } from "mongoose";

const schema = new Schema({
    name : String,
    price : String,
    director : String,
    author : String,
    actors : [String],
    builtYear : Number,
    cover : String,
    genre : String,
    video : String,
    IMDB : Number
})

export default model("movie",schema)