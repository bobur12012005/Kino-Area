import axios from "axios"
import "./ui-css/header.css"

const apiKey = import.meta.env.VITE_API_KEY

let mainTrailerTitle = document.querySelector('.trailer-title')

export async function getGenres(genreIds) {
    let response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`);
    let allGenres = response.data.genres

    return genreIds.map(id => {
        let genre = allGenres.find(g => g.id === id)
        return genre ? genre.name : 'Unknown'
    })
}

export async function getMovieTrailers(movieId) {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ru-RU`
    );

    const trailers = response.data.results.filter(
        video => video.site === 'YouTube' && video.type === 'Trailer'
    )

    if (trailers.length > 0) {
        const iframe = document.querySelector('.trailer-place iframe')
        iframe.src = `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    } else {
        console.log('Трейлеры не найдены')
    }
}

export function createHeader(place) {
    let left = document.createElement('div')
    let center = document.createElement('nav')
    let right = document.createElement('div')
    let logo = document.createElement('img')
    let socialSites = document.createElement('nav')
    let vk = document.createElement('img')
    let instagram = document.createElement('img')
    let facebook = document.createElement('img')
    let twitter = document.createElement('img')
    let afisha = document.createElement('a')
    let media = document.createElement('a')
    let films = document.createElement('a')
    let actors = document.createElement('a')
    let news = document.createElement('a')
    let selected = document.createElement('a')
    let categories = document.createElement('a')
    let search_btn = document.createElement('button')
    let login_btn = document.createElement('button')
    let search_icon = document.createElement('img')

    left.classList.add('left')
    center.classList.add('center')
    right.classList.add('right')
    logo.classList.add('logo')
    socialSites.classList.add('social-sites')
    search_btn.classList.add('search_btn')
    login_btn.classList.add('login_btn')

    afisha.innerHTML = 'Афиша'
    media.innerHTML = 'Медиа'
    films.innerHTML = 'Фильмы'
    actors.innerHTML = 'Актёры'
    news.innerHTML = 'Новости'
    selected.innerHTML = 'Подборки'
    categories.innerHTML = 'Категории'
    login_btn.innerHTML = 'Войти'

    afisha.href = '#'
    media.href = '#'
    films.href = '#'
    actors.href = '#'
    news.href = '#'
    selected.href = '#'
    categories.href = '#'

    logo.src = '/logotype/logotype.svg'
    vk.src = '/icons/vk.svg'
    instagram.src = '/icons/instagram.svg'
    facebook.src = '/icons/facebook.svg'
    twitter.src = '/icons/twitter.svg'
    search_icon.src = '/icons/search.svg'

    place.append(left, center, right)
    left.append(logo, socialSites)
    center.append(afisha, media, films, actors, news, selected, categories)
    right.append(search_btn, login_btn)
    socialSites.append(vk, instagram, facebook, twitter)
    search_btn.append(search_icon)
}

export async function movieReload(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let genres = await getGenres(item.genre_ids)

        let movie = document.createElement('a')
        let img_place = document.createElement('div')
        let rating = document.createElement('span')
        let details = document.createElement('div')
        let title = document.createElement('span')
        let genre = document.createElement('span')

        movie.classList.add('movie')
        img_place.classList.add('img_place')
        rating.classList.add('rating')
        details.classList.add('details')
        title.classList.add('title')
        genre.classList.add('genre')

        rating.innerHTML = item.vote_average
        title.innerHTML = item.title
        genre.innerHTML = genres[0] || 'Unknown'

        movie.href = `/pages/movie-page/index.html?id=${item.id}`

        img_place.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`

        place.append(movie)
        movie.append(img_place, details)
        img_place.append(rating)
        details.append(title, genre)
    }
}

export function reloadTrailers(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let trailer = document.createElement('div')
        let img_place = document.createElement('div')
        let img = document.createElement('img')
        let title = document.createElement('span')
        let play_icon = document.createElement('img')

        trailer.classList.add('trailer')
        img_place.classList.add('img-place')
        img.classList.add('img')
        title.classList.add('title')
        play_icon.classList.add('play-icon')

        title.innerHTML = item.title

        img.src = `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        play_icon.src = '/icons/play.svg'

        place.append(trailer)
        trailer.append(img_place, title)
        img_place.append(img, play_icon)

        play_icon.onclick = () => {
            const movieId = item.id
            mainTrailerTitle.innerHTML = item.title
            getMovieTrailers(movieId)
        }
    }
}

export function reloadPopularities(arr, place) {
    place.innerHTML = ''
    let number = 3

    for (let item of arr) {
        let dataPlace = document.createElement('a')
        let data = document.createElement('div')
        let name = document.createElement('span')
        let age = document.createElement('span')
        let personPlace = document.createElement('span')

        dataPlace.classList.add('dataPlace')
        personPlace.classList.add('personPlace')
        data.classList.add('data')
        name.classList.add('name')
        age.classList.add('age')

        personPlace.innerHTML = number++ + '-место'
        name.innerHTML = item.name
        age.innerHTML = '00 лет'

        dataPlace.href = `/pages/actor-page/index.html?id=${item.id}`

        place.append(dataPlace)
        dataPlace.append(data, personPlace)
        data.append(name, age)
    }
}