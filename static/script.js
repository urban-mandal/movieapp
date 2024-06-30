const gridContainer = document.getElementById("gridcont");
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const form = document.getElementById("form");
const query = document.getElementById("query");
const buttonPage = document.getElementById("gotonextpage");
const buttonSearch = document.getElementById("subimtform");

document.addEventListener("DOMContentLoaded", function () {
  function getmovielist() {
    fetch("/getmovielist", { method: "GET" })
      .then((response) => response.json())
      .then(function (data) {
        loadMovies(data.movies.results);
      })
      .catch((error) => {
        console.error("Error:" + error);
      });
  }
  getmovielist();
});

buttonPage.onclick = newPage;
buttonSearch.onclick = function (event) {
  event.preventDefault();
  search();
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
  fetch("/new_page", { method: "GET" })
    .then((response) => response.json())
    .then(function (data) {
      loadMovies(data.movies.results);
    });
}

function clearMovies() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function search() {
  clearMovies();
  let formdata = new FormData(form);
  fetch("/search", { method: "POST", body: formdata })
    .then((response) => response.json())
    .then(function (data) {
      loadMovies(data.movies.results);
    });
  buttonPage.onclick = newPageSearch;
}

function newPageSearch() {
  clearMovies();
  fetch("/new_page_search", { method: "GET" })
    .then((response) => response.json())
    .then(function (data) {
      loadMovies(data.movies.results);
    });
}
