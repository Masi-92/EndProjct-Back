import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import MovieModel from "./models/movie.model.js";
import dotenv from "dotenv";
dotenv.config();
//import "./utils/mongodb.js"
// const PORT = process.env.PORT;
// const MONGO_URL= process.env.MONGO_URL
// hier soll gefragt werden 
mongoose.connect(process.env.MONGO_URL).then(() => {
  seedData();
});
//Anzall der data
const count = 20;



async function seedData() {
  const genres = ["drama", "action", "western", "romantic"];
//ein wort zwischen  ...
const images = [
  "https://m.media-amazon.com/images/M/MV5BOTUwM2NiOTctM2JkOC00YmY1LTg0ZmYtOTUyOGU4MWE3ODBjXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMDU1MTcyYTktMmRkNi00ZDJkLTk1MDgtMWIxOWEyNzYwMzEzXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BYmNmZDU1YzktYzdjMy00YzVkLWE2OWYtMDBhZDkwYjlhMGE1XkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMjA3ZjMyMjUtYzA4OC00MTBkLThjMWYtNGVjMzg0ZWVhZTEwXkEyXkFqcGdeQXVyMTY4MTcyMjM2._V1_QL75_UY207_CR3,0,140,207_.jpg",
  "https://m.media-amazon.com/images/M/MV5BYmIzOGJjOWEtN2RmYS00YWJjLTk3NjQtNmM2ZjUxMzdhMWUzXkEyXkFqcGdeQXVyMTIyMjkwODE0._V1_QL75_UY207_CR8,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZWIwNDhlOWYtYzFjMy00OWNkLTlkN2EtYjk0NGI5NjM0YmZkXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UX140_CR0,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZjc1MTYyNDEtOWNhYy00YTkzLWE1ZjUtMjc1MDFhMzRlODhlXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BM2U2YWU5NWMtOGI2Ni00MGMwLWFkNjItMjgyZWMxNjllNTMzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX140_CR0,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BYzdiMDIxYjgtNjBlZi00MDFjLWE1NjMtMzE5ZWU2NjEzZWQyXkEyXkFqcGdeQXVyMDAyMjM2OQ@@._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BNjJiYzU2ZmQtNDU0Ny00MzllLTlhMzQtNDMwNjhkMjExZjcxXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_QL75_UY207_CR4,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMjE4ZjAxOTAtMWIzNi00OGU3LWI2MjItODNkZDdiOWZmNTY3XkEyXkFqcGdeQXVyMTUzOTcyODA5._V1_QL75_UY207_CR0,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZmI2Y2YyMmMtYTBjYy00MjI3LWEwZDctMTJmMGYzNDRhN2ZmXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BNDFmYTUyNzgtYmRkYi00ZjgzLWE5OTQtYzc1OGEzMTVkZjUwXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZWIzNDAxMTktMDMzZS00ZjJmLTlhNjYtOGUxYmZlYzVmOGE4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX140_CR0,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BY2VkMTY1ZGUtNGIzMy00ZmI2LWExNjctZTUzZTU4YjczNGY5XkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BM2U2NTYwMDMtZDdmYy00MjdhLThiNTAtMmFmMmEyNzRmZTdjXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BODdiMzM2YjctZmU3ZS00MzUwLWJiYTMtMmI2NzIyMTQyOTQ1XkEyXkFqcGdeQXVyODY5NzkyMjA@._V1_QL75_UY207_CR13,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BNzU3NjlhMTMtYTZjYy00ZWE5LTlmZmMtMmIxYzU4MGI5ZGE1XkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BNGJjZWI1ZTAtNzcyMC00OWU0LWI1MzItNTliMWZjOWY5OGRiXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMGUyOTJiZDgtNDdkOC00YjllLWE1MDAtOTk0Yzg3Y2UzN2YwXkEyXkFqcGdeQXVyMTU0OTc4MjA2._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZDg1YzkzZmUtMjg3Ni00OTQxLTk0NGItMDQ2MWNhYWYzYzRlXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BNGE1ZmU1NWMtMDhiYS00M2VjLWFmZGMtMGZhYWVlNTBhMzQxXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UY207_CR7,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BYzk4NjFhNDQtMTk1Yy00NjY5LThkMTQtNTM1NjQ0NjE0MGVlXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BN2E2ZTk5Y2UtYWFjMi00NDgzLWEyN2QtYjhkOGYyN2QyOTZkXkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BZWZlN2QwZDAtZTliZC00MzE1LThjYTYtZWRjMGZjZjc3MmMwXkEyXkFqcGdeQXVyMTQ5Mzc5MDU@._V1_QL75_UY207_CR3,0,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMGY5N2MyNTYtZGNhZi00MThjLThmMWQtZmIyNDgxNWUzODNhXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BMjMyZDljMzUtMzU0Mi00ZjY4LTkwNWQtNGVmZjhkNTAyNDQxXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_QL75_UY207_CR3,0,140,207_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMzhkMzhiZDEtNDg2MC00OWM4LWE5YWMtMGIyYjkxY2YyMDc5XkEyXkFqcGdeQXVyODY0MDQ3NTI@._V1_QL75_UX140_CR0,1,140,207_.jpg",

  "https://m.media-amazon.com/images/M/MV5BYmMxNzRhYWYtZTE1NS00NDgwLTg3M2MtNmExZDY1M2VjZjc2XkEyXkFqcGdeQXVyNjkwOTQ4MDE@._V1_QL75_UY207_CR3,0,140,207_.jpg",
];


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
      //anzahl der worter but random 
      name: faker.lorem.words(random(3, 6)),
      price: faker.finance.amount(5, 20),
      director: faker.person.fullName(),
      author: faker.person.fullName(),
      actors: generateActors(random(1, 6)),
      builtYear: random(1950, 2023),
      cover: images[index % images.length],
      video: "",
      //zwischen und Array.length
      genre: genres[random(0, genres.length)],
      IMDB: random(0, 10),
    };
    await MovieModel.create(movie);
    //   movies.push(movie);
  }

  console.log(count + " movies added");
}
