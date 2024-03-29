const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.getElementById("main");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");

const getMovies = async (url) => {
  const response = await fetch(url);
  const resData = await response.json();

  console.log(resData);

  showMovies(resData.results);
};

const showMovies = (movies) => {
  mainEl.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img
                src=${IMGPATH + poster_path}
                alt=${title}
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview"><h4>Overview</h4>${overview}</div>
            `;

    mainEl.appendChild(movieEl);
  });
};

const getClassByRate = (vote) => {
  if (vote >= 8) return "green";
  if (vote >= 5) return "orange";
  else return "red";
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    searchTerm.value = "";
  }
});

getMovies(APIURL);
