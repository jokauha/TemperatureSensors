import axios from 'axios'
const baseUrl = 'http://localhost:4001/api/temps'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getRecent = async () => {
    const response = await axios.get(`${baseUrl}/recent`)
    return response.data
}

export default { getAll, getRecent }