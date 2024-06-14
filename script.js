// API Key e099eae9
const searchBtn = document.getElementById("search-btn")
const movieFormInput = document.querySelector("#movie-search")
const renderedMoviesHtml = document.getElementById('rendered-movies-container')


movieFormInput.addEventListener("submit", handleUserInput)

function handleUserInput(e){
    e.preventDefault()
    const movieInput = document.getElementById('movieName')
    let movieHtml = ``
    
    fetch(`http://www.omdbapi.com/?apikey=e099eae9&s=${movieInput.value}`)
        .then(res => res.json())
        .then(data => {
        
            for (let movies of data.Search ){
                movieHtml += `
                
                    

                `
            }

        })
}
