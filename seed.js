import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import MovieModel from "./models/movie.model.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  seedData();
});

const count = 20;

async function seedData() {
  const genres = ["drama", "action", "western", "romantic"];

  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function generateActors(count) {
    const actors = [];
    for (let index = 0; index < count; index++) {
      actors.push(faker.person.fullName());
    }

    return actors;
  }

  // const movies = [];
  for (let index = 0; index < count; index++) {
    const movie = {
      name: faker.lorem.words(random(3, 6)),
      price: faker.finance.amount(5, 20),
      director: faker.person.fullName(),
      author: faker.person.fullName(),
      actors: generateActors(random(1, 6)),
      builtYear: random(1950, 2023),
      cover: faker.image.url(),
      video: "",
      genre: genres[random(0, genres.length)],
      IMDB: random(0, 10),
    };
    await MovieModel.create(movie);
    //   movies.push(movie);
  }

  console.log(count + " movies added");
}
