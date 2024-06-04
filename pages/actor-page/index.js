import axios from "axios"
import { createHeader } from "../../modules/ui.js"

let apiKey = import.meta.env.VITE_API_KEY
let id = location.search.split('=').at(-1)

let header = document.querySelector('header')

createHeader(header)