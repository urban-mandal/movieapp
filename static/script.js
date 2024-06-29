let pageNum = 1;
let user_input = "";
const gridContainer = document.getElementById("gridcont");
let APILINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=5c92c118674bd96710d8d45d19f3b792&query=";
const form = document.getElementById("form");
const query = document.getElementById("query");
const buttonPage = document.getElementById("gotonextpage");
const buttonSearch = document.getElementById("subimtform");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzkyYzExODY3NGJkOTY3MTBkOGQ0NWQxOWYzYjc5MiIsIm5iZiI6MTcxOTMwNzQ1MC4wNjU4Miwic3ViIjoiNjY3ODI1N2ZmN2RiZmJjYjk3NzAwZTllIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dEb-iw1GJQXRCJ9S64NDzdRzMvSmhUDVdL_MnEJF08A",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  fetch(APILINK, options)
    .then((response) => response.json())
    .then(function (data) {
      loadMovies(data.results);
    });
});

buttonPage.onclick = newPage;
buttonSearch.onclick = function (event) {
  event.preventDefault();
  datalol();
};

function loadMovies(data) {
  data.forEach((element) => {
    let newDiv = document.createElement("div");
    let newh3 = document.createElement("h3");
    let newImg = document.createElement("img");

    newDiv.className = "moviestuff";
    if (element.poster_path) {
      newImg.src = IMG_PATH + element.poster_path;
    }
    newh3.innerText = element.original_title;

    gridContainer.appendChild(newDiv);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newh3);
  });
}

function newPage() {
  clearMovies();
  pageNum++;
  const newAPILINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;
  fetch(newAPILINK, options)
    .then((response) => response.json())
    .then(function (data) {
      loadMovies(data.results);
    });
}

function clearMovies() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}
function datalol() {
  const searchF3em = new FormData(form);
  fetch("/submit", {
    method: "POST",
    body: searchF3em,
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data.user_data);
      user_input = data.user_data;
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${data.user_data}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then(function (data) {
          console.log(data.results);
          clearMovies();
          loadMovies(data.results);
          buttonPage.onclick = newPageSearch;
          pageNum = 1;
        });
    });
}

function newPageSearch() {
  pageNum++;
  let apiSearch = `https://api.themoviedb.org/3/search/movie?query=${user_input}&include_adult=false&language=en-US&page=${pageNum}`;
  console.log(user_input);
  fetch(apiSearch, options)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data.results);
      clearMovies();
      loadMovies(data.results);
    });
}
