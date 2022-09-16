import axios from "axios";
// const axios = require('axios').default;

const movieDB = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie',
        params: {
            api_key: 'e308eea0ec1922b5881f958f23ef12c7',
            language: 'es-Es'
        }

    })

export default movieDB;