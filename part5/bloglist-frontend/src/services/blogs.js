import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, get, create, remove };
