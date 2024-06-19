// API Key e099eae9
const searchBtn = document.getElementById("search-btn")
const movieFormInput = document.querySelector("#movie-search")
const renderedMoviesHtml = document.querySelector('.rendering-movies-container')

let moviesArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.watchlist){
        addToWatchlist(e.target.dataset.watchlist)
    }
})

async function handleUserInput(movies){
    moviesArray = []
    for (let movie of movies) {
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
                    <i class="fa-solid fa-circle-plus" data-watchlist="${movie.imdbID}"></i>
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

// function addToWatchlist(myWatchlist){

//     let stringWatchlist = JSON.stringify(myWatchlist)
//     console.log(stringWatchlist)


//     // localStorage.setItem("My Watchlist", JSON.stringify(myWatchlist))
// }


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

// function renderMoviesHtml(){
//     let movieHtml = ``
    
// }