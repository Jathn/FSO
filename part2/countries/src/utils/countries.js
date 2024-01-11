import axios from 'axios'

const getAll = () => {
    const promise = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    console.log("promise: ", promise)
    return promise
}

export { getAll }