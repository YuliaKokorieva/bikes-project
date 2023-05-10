import axios from 'axios'

const baseUrl = 'https://bikes-project-backend.azurewebsites.net'
const localBaseUrl = 'http://localhost:7071'


const getAllStations = async () => {
  try {
    const res = await axios.get(`${localBaseUrl}/api/GetStations`)
    return(res.data)
  } catch (error) {
    console.log(error.message)
  }
}

const getSingleStation = async (id) => {
  try {
    const res = await axios.get(`${localBaseUrl}/api/GetSingleStation?id=${id}`)
    return(res.data)
  } catch (error) {
    console.log(error.message)
  }
}

const stationsService = {
  getAllStations,
  getSingleStation
}

export default stationsService