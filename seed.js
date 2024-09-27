import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import MovieModel from "./models/movie.model.js";
import dotenv from "dotenv";

dotenv.config();

//connected seed.js  mit database
mongoose.connect(process.env.MONGO_URL).then(() => {
  seedData();
});

const count = 20;
// const images  wird durch scraping bgeschtirb
async function seedData() {
  const genres = ["drama", "action", "western", "romantic"];
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
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Flags-of-Our-Fathers-2006-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Dating-the-Delaneys-2022-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Golondaaj-2021-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/The-Volcano-Rescue-from-Whakaari-2022-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/She-Came-to-Me-2023-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Roadkill-2022-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Sewu-Dino-2023-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Monkey-Trouble-1994-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Land-of-Mine-2015-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Wingwomen-2023-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Dominion.Prequel.to_.the_.Exorcist.2005.Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/webp-express/webp-images/uploads/2023/11/Harkara-2023-Poster-250x370.jpg.webp",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Age-of-Innocence-1993-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Skanda-The-Attacker-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Chhapaak-2020-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Being-Flynn-2012-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Marvins-Room-1996-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Sly-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Comedy-Queen-2022-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Craving-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Dark-Harvest-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Medicine-Kings-Coffin-2022-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Fingernails-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Lucky-Luke-and-the-Daltons-2004-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Leo-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Killer-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Butchers-Crossing-2022-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Zulu-2013-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Three-Kingdoms-2008-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Missing-2003-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Bright-Women-2022-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Founder-2016-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Mercy-Road-2023-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Warlords-2007-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/The-Score-2001-Poster-250x370.jpg",
    "https://hexdownload.co/wp-content/uploads/2023/11/Control-Zeta-2023-250x370.jpg",
    "https://cdn.zoomg.ir/2023/2/the-old-way-movie-review-cover.jpg",
    "https://cdn.zoomg.ir/2023/2/jung-e-yun.jpg",
    "https://cdn.zoomg.ir/2023/2/ant-man-and-the-wasp-quantumania-wallpaper.jpg",
    "https://cdn.zoomg.ir/2023/2/creed-3-adonis-creed-squaring-off-against-damian.jpg",
    "https://cdn.zoomg.ir/2022/12/john-wick-4-character.jpg",
    "https://cdn.zoomg.ir/2022/12/dungeons-and-dragons-honor-among-thieves-wallpaper.jpg",
    "https://cdn.zoomg.ir/2023/2/the-covenant-movie-jake-gyllenhaal-and-dar-salim.jpg",
    "https://cdn.zoomg.ir/2022/12/guardians-of-the-galaxy-vol-3-main-team.jpg",
    "https://cdn.zoomg.ir/2023/1/fast-x-2023-most-anticipated-movies.jpg",
    "https://cdn.zoomg.ir/2022/7/spider-man-into-the-spider-verse-miles-morales.jpg",
    "https://cdn.zoomg.ir/2022/12/transformers-rise-of-the-beasts-gorilla-1.jpg",
    "https://cdn.zoomg.ir/2020/11/extraction-star-chris-hemsworth.jpg",
    "https://cdn.zoomg.ir/2022/2/the-flash-new-photo.jpg",
    "https://cdn.zoomg.ir/2023/2/indiana-jones-and-the-dial-of-destiny-movie-harrison-ford-hd-wallpaper.jpg",
    "https://cdn.zoomg.ir/2023/1/mission-impossible-dead-reckoning-part-one-2023-most-anticipated-movies.jpg",
    "https://cdn.zoomg.ir/2021/8/da20d46e82.jpg",
    "https://cdn.zoomg.ir/2021/11/dune-part-two-casts.jpg",
    "https://cdn.zoomg.ir/2021/8/the-marvels-logo.jpg",
    "https://cdn.zoomg.ir/2021/10/aquaman-and-the-lost-kingdom-superhero.jpg",
    "https://cdn.zoomg.ir/2023/2/havoc.jpg",
  ];

  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // für die actors um eine Array von actores zu erstellen 

  function generateActors(count) {
    const actors = [];
    for (let index = 0; index < count; index++) {
      actors.push(faker.person.fullName());
    }

    

    return actors;
  }
// entweder wird alls gepusht oder mit dem async  

   //const movies = [];
  for (let index = 0; index < count; index++) {
    const movie = {
      name: faker.lorem.words(random(1, 3)),
      price: faker.finance.amount(20, 70),
      director: faker.person.fullName(),
      author: faker.person.fullName(),
      actors: generateActors(random(1, 6)),
      builtYear: random(1990, 2023),
      cover: images[index % images.length],
      video: "",
      genre: genres[random(0, genres.length)],
      IMDB: random(0, 10),
    };
    await MovieModel.create(movie);
     //movies.push(movie);
  }

  console.log(count + " movies added");
}
