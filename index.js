import axios from "axios"
import { createHeader, movieReload, reloadTrailers, reloadTwoPopularities, reloadOtherPopularities, getMovieTrailers } from "./modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY

let header = document.querySelector('header')
let currentMoviesContainer = document.querySelector('.now-playing .movie-container')
let seeMore_btn = document.querySelector('.see_more')
let newTrailersContainer = document.querySelector('.other-trailers')
let mainTrailerTitle = document.querySelector('.trailer-title')
let popularMovieContainer = document.querySelector('.popular-movies .movie-container')
let popularitiesContainer = document.querySelector('.other-populars')
let actorDataPlace_1 = document.querySelector('.actorDataPlace_1')
let actorDataPlace_2 = document.querySelector('.actorDataPlace_2')
let actorDataPlace_1_name = document.querySelector('.actorDataPlace_1 .name')
let actorDataPlace_2_name = document.querySelector('.actorDataPlace_2 .name')

createHeader(header)

axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        movieReload(res.data.results.splice(0, 8), currentMoviesContainer)
    })

seeMore_btn.onclick = () => {
    seeMore_btn.classList.toggle('active')

    if (seeMore_btn.classList.contains('active')) {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then(res => {
                movieReload(res.data.results, currentMoviesContainer)
            })
        seeMore_btn.innerHTML = 'Первые 8'
    } else {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then(res => {
                movieReload(res.data.results.splice(0, 8), currentMoviesContainer)
            })
        seeMore_btn.innerHTML = 'Все новинки'
    }
}

axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        const movieId = res.data.results[0].id
        mainTrailerTitle.innerHTML = res.data.results[0].original_title
        getMovieTrailers(movieId)
        reloadTrailers(res.data.results, newTrailersContainer)
    })

axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        movieReload(res.data.results.splice(0, 4), popularMovieContainer)
    })

axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        let firstActor = res.data.results[0]
        let secondActor = res.data.results[1]

        actorDataPlace_1.href = `/pages/actor-page/index.html?id=${firstActor.id}`
        actorDataPlace_2.href = `/pages/actor-page/index.html?id=${secondActor.id}`
        actorDataPlace_1.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${firstActor.profile_path})`
        actorDataPlace_2.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${secondActor.profile_path})`
        actorDataPlace_1_name.innerHTML = firstActor.name
        actorDataPlace_2_name.innerHTML = secondActor.name

        reloadOtherPopularities(res.data.results.splice(3), popularitiesContainer)
    })