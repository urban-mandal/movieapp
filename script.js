const gridContainer = document.getElementById("gridcont");
const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=&query=";
const form = document.getElementById("form");
const query = document.getElementById("query");

function makeNewSameDiv(url ='') {
  fetch(url)
    .then((res) => res.json)
    .then(function (data) {
      console.log(data.results);
      var newDiv = document.createElement("div");
      var newh3 = document.createElement("H3");
      var img = document.createElement("img");
    });
}

makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
makeNewSameDiv();
