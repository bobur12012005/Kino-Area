import axios from "axios"
import { createHeader, nowPlayingReload, reloadTrailers, reloadPopularMovies, reloadTwoPopularities, reloadOtherPopularities, getMovieTrailers } from "./modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY

let header = document.querySelector('header')
let currentMoviesContainer = document.querySelector('.now-playing .movie-container')
let seeMore_btn = document.querySelector('.see_more')
let newTrailersContainer = document.querySelector('.other-trailers')
let mainTrailerTitle = document.querySelector('.trailer-title')
let popularMovieContainer = document.querySelector('.popular-movies .movie-container')
let twoPopularitiesContainer = document.querySelector('.most-populars')
let otherPopularitiesContainer = document.querySelector('.other-populars')

createHeader(header)

axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        nowPlayingReload(res.data.results.splice(0, 8), currentMoviesContainer)
        // console.log(res.data.results)
    })

seeMore_btn.onclick = () => {
    seeMore_btn.classList.toggle('active')

    if (seeMore_btn.classList.contains('active')) {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then(res => {
                nowPlayingReload(res.data.results, currentMoviesContainer)
            })
        seeMore_btn.innerHTML = 'Первые 8'
    } else {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then(res => {
                nowPlayingReload(res.data.results.splice(0, 8), currentMoviesContainer)
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

axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        reloadPopularMovies(res.data.results.splice(16), popularMovieContainer)
    })

axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        reloadTwoPopularities(res.data.results.splice(0, 2), twoPopularitiesContainer)
    })

axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${apiKey}`)
    .then(res => {
        reloadOtherPopularities(res.data.results.splice(3), otherPopularitiesContainer)
    })