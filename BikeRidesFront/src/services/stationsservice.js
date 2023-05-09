import axios from 'axios'

const baseUrl = 'https://bikes-project-backend.azurewebsites.net'

const getAllStations = async () => {
  try {
    const request = await axios.get(`${baseUrl}/api/GetStations`)
    return(request.data)
  } catch (error) {
    console.log(error.message)
  }
}

const getSingleStation = async (id) => {
  try {
    const request = await axios.get(`${baseUrl}/api/GetSingleStation?id=${id}`)
    return(request.data)
  } catch (error) {
    console.log(error.message)
  }
}

const stationsService = {
  getAllStations,
  getSingleStation
}

export default stationsService