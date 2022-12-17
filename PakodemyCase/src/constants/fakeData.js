const categories = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Action" },
  { id: 5, name: "Thriller" },
  { id: 6, name: "Drama" },
  { id: 7, name: "Crime" },
  { id: 8, name: "Adventure" },
  { id: 9, name: "Fantasy" },
];

const userProfile = {
  name: "Zehra Tok",
  profile_image: require("../assets/images/profile.png"),
};

const movies = [
  {
    id: 1,
    Title: "Harry Potter and the Deathly Hallows: Part 2",
    Year: "2011",
    imdbID: "tt1201607",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  },
  {
    id: 2,
    Title: "Harry Potter and the Sorcerer's Stone",
    Year: "2001",
    imdbID: "tt0241527",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
  },

];
export default { categories, movies, userProfile };
