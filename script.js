let pageNum = 1;

const gridContainer = document.getElementById("gridcont");
let APILINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=5c92c118674bd96710d8d45d19f3b792&query=";
const form = document.getElementById("form");
const query = document.getElementById("query");
const buttonPage = document.getElementById("gotonextpage");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzkyYzExODY3NGJkOTY3MTBkOGQ0NWQxOWYzYjc5MiIsIm5iZiI6MTcxOTMwNzQ1MC4wNjU4Miwic3ViIjoiNjY3ODI1N2ZmN2RiZmJjYjk3NzAwZTllIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dEb-iw1GJQXRCJ9S64NDzdRzMvSmhUDVdL_MnEJF08A",
  },
};

buttonPage.onclick = newPage;

function loadMovies(url = "") {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      data.results.forEach((element) => {
        const newDiv = document.createElement("div");
        const newH3 = document.createElement("h3");
        const newImg = document.createElement("img");
        newDiv.className = "moviestuff";
        newH3.textContent = element.title;
        newImg.src = IMG_PATH + element.poster_path;
        gridContainer.appendChild(newDiv);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newH3);
      });
    });
}

loadMovies(APILINK);

function newPage() {
  clearMovies();
  pageNum++;
  const newAPILINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;
  loadMovies(newAPILINK);
}

function clearMovies() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}
