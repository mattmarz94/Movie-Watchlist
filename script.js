// API Key e099eae9
const searchBtn = document.getElementById("search-btn")
const movieFormInput = document.querySelector("#movie-search")
const renderedMoviesHtml = document.querySelector('.rendering-movies-container')
const watchlistContainer = document.querySelector("#watchlist-rendered-movies-container")

let moviesArray = []
let myWatchlist = []



async function handleUserInput(movies){
    moviesArray = []
    try {for (let movie of movies) {
        if (!moviesArray.some((m) =>
            m.Title === movie.Title
            )) {
                await fetch(`http://www.omdbapi.com/?apikey=e099eae9&t=${movie.Title}`)
                    .then(res => res.json())
                    .then(data => {
                        moviesArray.push(data)
                    })
            }
    }
    renderMovies()
    }
    catch(err){
        renderedMoviesHtml.innerHTML = 
            `<div class="err-message">
                Unable to find what you're looking for... Please try again.
            </div> `
    }
}



function renderMovies(){
    let moviesHtml = ""

    for (let movie of moviesArray){
            moviesHtml +=`
        <div class="rendered-movies-container">
            <img src = "${movie.Poster}">
            <div class="movie-container">
                <div class="title-container">
                    <h2>${movie.Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p class="movie-rating">${movie.imdbRating}</p>
                </div>
                <div class = "time-genre-add-container">
                    <p class ="movie-runtime">${movie.Runtime}</p>
                    <p class ="movie-genre">${movie.Genre}</p>
                    <i class="fa-solid fa-circle-plus" data-watchlist=${movie.imdbID}></i>
                    <p class="watchlist">Watchlist</p>
                </div>
                <div class ="movie-plot-container">
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>
        </div>
        <hr/>
        `
    }
    renderedMoviesHtml.innerHTML = moviesHtml

}

function renderWatchlist(){
    let moviesHtml = ""

    myWatchlist.forEach(movie => {
            moviesHtml +=`
        <div class="rendered-movies-container">
            <img src = "${movie.Poster}">
            <div class="movie-container">
                <div class="title-container">
                    <h2>${movie.Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p class="movie-rating">${movie.imdbRating}</p>
                </div>
                <div class = "time-genre-add-container">
                    <p class ="movie-runtime">${movie.Runtime}</p>
                    <p class ="movie-genre">${movie.Genre}</p>
                    <i class="fa-solid fa-circle-plus" data-remove="${movie.imdbID}"></i>
                    <p class="watchlist">Watchlist</p>
                </div>
                <div class ="movie-plot-container">
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>
        </div>
        <hr/>
        `
    })
    
    if(watchlistContainer){
    watchlistContainer.innerHTML = moviesHtml
    }
}

renderedMoviesHtml.addEventListener('click', (e) => {
    if(e.target.dataset.watchlist){
        addToWatchlist(e.target.dataset.watchlist)
    }
})

function addToWatchlist(watchlistId){
    for (let movie of moviesArray){
        if(movie.imdbID === watchlistId){
            if(!myWatchlist.some(m => m.Title === movie.Title)){
                myWatchlist.push(movie)
                alert("Added to watchlist!")
                updateWatchlistStorage()
            }
            else{
                alert("This movie is already added to your watchlist!")
            }
        }
    }

}

function removeFromWatchlist(watchlistId){
    const indexToRemove = myWatchlist.findIndex(movie => movie.imdbID === watchlistId)
    if (indexToRemove !== -1){
        myWatchlist.splice(indexToRemove, 1)
        updateWatchlistStorage()
        renderWatchlist()
    }
}

if(watchlistContainer){
    watchlistContainer.addEventListener("click", (e) => {
        if(e.target.dataset.remove){
            removeFromWatchlist(e.target.dataset.remove)
        }
    })
}

function updateWatchlistStorage(){
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist))
}



if (movieFormInput){
    movieFormInput.addEventListener('submit', async (e) => {
        e.preventDefault(e)
        const movieInput = document.getElementById('movieName')
        
        await fetch(`http://www.omdbapi.com/?apikey=e099eae9&s=${movieInput.value}`)
            .then(res => res.json())
            .then(data => {
                handleUserInput(data.Search)
            })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const watchlistMovies = localStorage.getItem("watchlist")
    if(watchlistMovies){
        myWatchlist = JSON.parse(watchlistMovies)
        renderWatchlist()
    }
})