import axios from 'axios'


const base_url = 'http://localhost:3001/persons'

const getAll = () =>
    axios
    .get(base_url)
    .then(
        response => response.data
    )

const addNew = ({number, name}) =>{
    return(
        axios
    .post(base_url, {name: name, number: number})
    .then(response=>response.data)
    )
}

const deleteEntry = (id) => 
    axios
    .delete(base_url+`/${id}`)

const update = ({person}) =>{
    console.log("here inside update", person.id)
    const request = axios
    .put(`${base_url}/${person.id}`, person)
    return request.then(response=>response.data)
}

export default {getAll, addNew, deleteEntry, update}