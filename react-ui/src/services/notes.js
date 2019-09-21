import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';


const getAll = () => {
    return axios.get(baseUrl);
}
      
const create = (noteObject) => {
    return axios.post (baseUrl, noteObject);
}
const update = (id, noteObject) => {
    return axios.put(`${baseUrl}/${id}`, noteObject);
}

export default {getAll, create, update};