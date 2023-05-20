import axios from 'axios'

const baseUrl = 'https://bikes-project-backend.azurewebsites.net'
// const localBaseUrl = 'http://localhost:7071'

const getAllStations = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/GetStations`)
    return (res.data)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const getSingleStation = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/GetSingleStation?id=${id}`)
    return (res.data)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const stationsService = {
  getAllStations,
  getSingleStation,
}

export default stationsService
