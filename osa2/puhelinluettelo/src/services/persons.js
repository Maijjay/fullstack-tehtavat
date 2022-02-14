import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)}

const remove = (id) => {
  console.log("ASD", id)
  
  return axios.delete(`${baseUrl}/${id}`)

} 

export default { getAll, create, update, remove }
