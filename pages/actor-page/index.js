import axios from "axios"
import { createHeader, createFooter, movieReload } from "../../modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY
let id = location.search.split('=').at(-1)

let header = document.querySelector('header')
let footer = document.querySelector('footer')
let actorImg = document.querySelector('.actor-img img')
let wayToActor = document.querySelector('.way-to-actor p span')
let nameRu = document.querySelector('.name-ru')
let nameEn = document.querySelector('.name-en')
let info = document.querySelector('.info')
let career = document.querySelector('.career')
let height = document.querySelector('.height')
let birthday = document.querySelector('.birthday')
let birthplace = document.querySelector('.birthplace')
let genres = document.querySelector('.genres')
let movies = document.querySelector('.movies')
let favorites = document.querySelector('.favorites p span')
let knownMoviesContainer = document.querySelector('.known-movies-container')
let image_1 = document.querySelector('.image_1 img')
let image_2 = document.querySelector('.image_2 img')
let image_3 = document.querySelector('.image_3 img')
let image_4 = document.querySelector('.image_4 img')
let image_5 = document.querySelector('.image_5 img')
let image_6 = document.querySelector('.image_6 img')

createHeader(header)
createFooter(footer)

axios.get(`https://api.themoviedb.org/3/person/${id}?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        actorImg.src = `https://image.tmdb.org/t/p/original${res.data.profile_path}`
        wayToActor.innerHTML = res.data.name
        nameRu.innerHTML = res.data.name
        nameEn.innerHTML = res.data.also_known_as[0]
        birthday.innerHTML = res.data.birthday
        birthplace.innerHTML = res.data.place_of_birth.split(',').at(-2) + ', ' + res.data.place_of_birth.split(',').at(-1)
    })

axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        movies.innerHTML = res.data.cast.length + res.data.crew.length
    })

axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        movieReload(res.data.cast.splice(0, 4), knownMoviesContainer)
    })

axios.get(`https://api.themoviedb.org/3/person/${id}/images?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        console.log(res.data)
        image_1.src = `https://image.tmdb.org/t/p/original${res.data.profiles[1].file_path}`
        image_2.src = `https://image.tmdb.org/t/p/original${res.data.profiles[2].file_path}`
        image_3.src = `https://image.tmdb.org/t/p/original${res.data.profiles[3].file_path}`
        image_4.src = `https://image.tmdb.org/t/p/original${res.data.profiles[4].file_path}`
        image_5.src = `https://image.tmdb.org/t/p/original${res.data.profiles[5].file_path}`
        image_6.src = `https://image.tmdb.org/t/p/original${res.data.profiles[6].file_path}`
    })