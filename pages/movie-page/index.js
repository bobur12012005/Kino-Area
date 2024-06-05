import axios from "axios"
import { createHeader, getMovieTrailers } from "../../modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY

let id = location.search.split('=').at(-1)

let body = document.body
let header = document.querySelector('header')
let movie_poster = document.querySelector('.movie-poster')
let movie_title = document.querySelector('.movie-title')
let description = document.querySelector('.description')
let kinoarea = document.querySelector('.kinoarea strong')
let popularity = document.querySelector('.imdb strong')
let trailerTitle = document.querySelector('.trailer-title')

createHeader(header)

axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        console.log(res.data)
        body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.backdrop_path})`
        movie_poster.src = `https://image.tmdb.org/t/p/original${res.data.poster_path}`
        movie_title.innerHTML = res.data.title
        kinoarea.innerHTML = res.data.vote_average
        popularity.innerHTML = res.data.popularity
        description.innerHTML = res.data.overview.slice(0, 400) + "..."
        trailerTitle.innerHTML = res.data.title
        getMovieTrailers(id)
    })