// API Key e099eae9
const searchBtn = document.getElementById("search-btn")
const movieFormInput = document.querySelector("#movie-search")
const renderedMoviesHtml = document.getElementById('rendered-movies-container')


movieFormInput.addEventListener("submit", handleMovieSelection)

function handleUserInput(movies){

    let moviesHtml = ``

    for (let movie of movies){
        // console.log(movie)

        fetch(`http://www.omdbapi.com/?apikey=e099eae9&i=${movie}`)
            .then(res => res.json())
            .then(movieDetails => {

                renderedMoviesHtml.innerHTML +=`
                <div class="rendered-movies-container">
                    <img src = "${movieDetails.Poster}">
                    <div class="movie-container">
                        <div class="title-container">
                            <h2>${movieDetails.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="movie-rating">${movieDetails.imdbRating}</p>
                        </div>
                        <div class = "time-genre-add-container">
                            <p class ="movie-runtime">${movieDetails.Runtime}</p>
                            <p class ="movie-genre">${movieDetails.Genre}</p>
                            <i class="fa-solid fa-circle-plus"></i>
                            <p class="watchlist">Watchlist</p>
                        </div>
                        <div class ="movie-plot-container">
                            <p class="movie-plot">${movieDetails.Plot}</p>
                        </div>
                    </div>
                </div>
                <hr/>
                `
            
            })
    }

}


function handleMovieSelection(e){
    e.preventDefault(e)
    const movieInput = document.getElementById('movieName')
    
    fetch(`http://www.omdbapi.com/?apikey=e099eae9&s=${movieInput.value}`)
        .then(res => res.json())
        .then(data => {
        
            const grabMovieId = data.Search.map((movies)=> {
                return movies.imdbID
            })

            handleUserInput(grabMovieId)

        })

}

// function renderMoviesHtml(movies){
//     let movieHtml = ``
//     console.log(movies)

//     movieHtml += 
// }