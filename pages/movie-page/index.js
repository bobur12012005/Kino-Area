import axios from "axios"
import { createHeader } from "../../modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY

let id = location.search.split('=').at(-1)

let body = document.body
let header = document.querySelector('header')

createHeader(header)

axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`)
    .then(res => {
        console.log(res.data)
        body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.backdrop_path})`
    })