import axios from 'axios'

const baseUrl = 'https://bikes-project-backend.azurewebsites.net'
// const localBaseUrl = 'http://localhost:7071'

const getAllRides = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/GetRides`)
    return (res.data)
  } catch (error) {
    console.log(error.message)
    return (null)
  }
}

const ridesService = {
  getAllRides,
}

export default ridesService
