import axios from "axios"
import { createHeader, createFooter, movieReload, reloadTrailers, reloadPopularities, getMovieTrailers } from "./modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY

let header = document.querySelector('header')
let footer = document.querySelector('footer')
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
let genres = document.querySelectorAll('.now-playing .genres a')
let years = document.querySelectorAll('.popular-movies .years a')

console.log(years)

createHeader(header)
createFooter(footer)

axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1&api_key=${apiKey}`)
    .then(res => {
        movieReload(res.data.results.splice(0, 8), currentMoviesContainer)
    })

genres.forEach(genre_html => {
    genre_html.onclick = () => {
        genres.forEach(gnr => {
            gnr.classList.remove('active_link')
        })
        genre_html.classList.add('active_link')
        if (genre_html.id === 'all') {
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1&api_key=${apiKey}`)
                .then(res => {
                    movieReload(res.data.results.splice(0, 8), currentMoviesContainer)
                })
        } else {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre_html.id}&language=ru-RU&page=1`)
                .then(movieResponse => {
                    movieReload(movieResponse.data.results.splice(0, 8), currentMoviesContainer)
                })
        }
    }
})

axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        movieReload(res.data.results.splice(0, 4), popularMovieContainer)
    })

years.forEach(year => {
    year.onclick = () => {
        years.forEach(yr => {
            yr.classList.remove('active_link')
        })
        year.classList.add('active_link')
        if (year.id === 'all-time') {
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&api_key=${apiKey}`)
                .then(res => {
                    movieReload(res.data.results.splice(0, 4), popularMovieContainer)
                })
        } else {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&primary_release_year=${year.id}`)
                .then(res => {
                    movieReload(res.data.results.splice(0, 4), popularMovieContainer)
                })
        }
    }
})

axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        const movieId = res.data.results[0].id
        mainTrailerTitle.innerHTML = res.data.results[0].title
        getMovieTrailers(movieId)
        reloadTrailers(res.data.results, newTrailersContainer)
    })

axios.get(`https://api.themoviedb.org/3/person/popular?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        let firstActor = res.data.results[0]
        let secondActor = res.data.results[1]

        actorDataPlace_1.href = `/pages/actor-page/index.html?id=${firstActor.id}`
        actorDataPlace_2.href = `/pages/actor-page/index.html?id=${secondActor.id}`
        actorDataPlace_1.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${firstActor.profile_path})`
        actorDataPlace_2.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${secondActor.profile_path})`
        actorDataPlace_1_name.innerHTML = firstActor.name
        actorDataPlace_2_name.innerHTML = secondActor.name

        reloadPopularities(res.data.results.splice(3), popularitiesContainer)
    })

seeMore_btn.onclick = () => {
    seeMore_btn.classList.toggle('active')

    if (seeMore_btn.classList.contains('active')) {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&api_key=${apiKey}`)
            .then(res => {
                movieReload(res.data.results, currentMoviesContainer)
            })
        seeMore_btn.innerHTML = 'Первые 8'
    } else {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&api_key=${apiKey}`)
            .then(res => {
                movieReload(res.data.results.splice(0, 8), currentMoviesContainer)
            })
        seeMore_btn.innerHTML = 'Все новинки'
    }
}