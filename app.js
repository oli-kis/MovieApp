let submit = document.getElementById("submit")
let message = document.getElementById("message")
let container = document.getElementById("movie__container")

function getMovie() {
    let movieName = document.getElementById("search__field").value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`
console.log(movieName)
    if (movieName.length <= 0) {
        message.innerHTML = `<h3>Filmname igeh!</h3>`
    }
    else{
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                container.innerHTML = `<div class="search">
                <input type="text" id="search__field" placeholder="Filmname" class="search__field">
                <input type="submit" value="Suchen" class="submit" id="submit" onclick="getMovie()">
            </div>
            <div class="movie__infoBox">
                <div class="movie__img"><img src="${data.Poster}" alt=""></div>
                <div class="movie__info">
                    <span class="movie__title">${data.Title}</span>
                    <span class="movie__rating"><img src="star-icon.svg">${data.imdbRating} / 10</span>
                    <span class="movie__details">${data.Rated} | ${data.Year} | ${data.Runtime}</span>
                    <div class="genre"><div>${data.Genre.split(",").join("</div><div>")}</div></div>
                </div>
            </div>
            <div class="movie__plot"><h2>Plot:</h2>${data.Plot}</div>
            <div class="movie__cast"><h2>Cast:</h2>${data.Actors}</div>
            <div class="message" id="message"></div>
            `
            }
            else{
                container.innerHTML = ` <div class="search">
                <input type="text" id="search__field" placeholder="Filmname" class="search__field">
                <input type="submit" value="Suchen" class="submit" id="submit" onclick="getMovie()">
            </div>
            <div class="message" id="message"><h3>${data.Error}</h3></div>`
            }
        })
    }
}
window.addEventListener("load", getMovie);