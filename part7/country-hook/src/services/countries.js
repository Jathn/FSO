import axios from 'axios';

export const getCountries = async () => {
  const { data } = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  const countryData = data.map((country) => {
    return {
      name: country.name.common,
      capital: country.capital[0],
      population: country.population,
      languages: country.languages.map(language => language.value),
      flagUrl: country.flags.png
    }
  })
  return countryData
}

export const getCountry = async (name) => {
    const { data } = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    const countryData = {
        name: data.name.common,
        capital: data.capital[0],
        population: data.population,
        flagUrl: data.flags.png
    }
    return countryData
}
