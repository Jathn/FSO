import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `${newToken}`
}

const getAll = async () => {
  console.log(`token ${token}`)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

export default { getAll, get, create, remove, setToken, update }
