import axios from "axios"
import { createHeader, getGenres } from "../../modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY
let id = location.search.split('=').at(-1)

let header = document.querySelector('header')
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

createHeader(header)

axios.get(`https://api.themoviedb.org/3/person/${id}?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        actorImg.src = `https://image.tmdb.org/t/p/original${res.data.profile_path}`
        wayToActor.innerHTML = res.data.name
        nameRu.innerHTML = res.data.name
        nameEn.innerHTML = res.data.also_known_as[0]
        birthday.innerHTML = res.data.birthday
        birthplace.innerHTML = res.data.place_of_birth.split(',').at(-2) + ', ' + res.data.place_of_birth.split(',').at(-1)
    })

axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=ru-RU&api_key=${apiKey}`)
    .then(res => {
        movies.innerHTML = res.data.cast.length + res.data.crew.length
    })