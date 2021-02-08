const mongoose = require("mongoose");
// const Celebrity = require("../models/celebrity");
// require("dotenv").config();

// const celebrities = [
//   {
//     name: "Beyonce",
//     occupation: "singer",
//     catchPhrase: "I am gorgeous",
//   },
//   {
//     name: "Jeff Bezos",
//     occupation: "ex Amazon CEO",
//     catchPhrase: "Add to cart",
//   },
//   {
//     name: "Boris Johnson",
//     occupation: "Prime Minister",
//     catchPhrase: "Supine protoplasmic invertebrate jellies",
//   },
// ];

const Movie = require("../models/movie");
require("dotenv").config();

const movies = [
  {
    title: "Soul",
    genre: "Animation",
    plot:
      "Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.",
  },
  {
    title: "Wild Tales",
    genre: "Comedy/Drama",
    plot:
      "Six short stories that explore the extremities of human behavior involving people in distress.",
  },
  {
    title: "Dirty Dancing",
    genre: "Drama",
    plot:
      "Spending the summer at a Catskills resort with her family, Frances Baby Houseman falls in love with the camp's dance instructor, Johnny Castle.",
  },
];

// MONGOOSE CONNECTION

mongoose
  .connect(`mongodb://localhost:27017/${process.env.PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Connected to the DB");
    const pr = x.connection.dropDatabase();
    return pr;
  })
  .then(() => {
    // const pr = Celebrity.create(celebrities);
    const pr = Movie.create(movies);
    return pr;
  })
  .then((createdMovies) => {
    console.log(`Created ${createdMovies.length} movies.`);
    mongoose.connection.close();
    //   .then((createdCelebrities) => {
    //     console.log(`Created ${createdCelebrities.length} celebrities.`);
    //     mongoose.connection.close();
  })
  .catch((err) => console.log("Error connection to the DB", err));
