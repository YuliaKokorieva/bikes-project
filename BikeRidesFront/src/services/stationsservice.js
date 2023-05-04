import axios from 'axios'
const baseStationsUrl = 'https://bikes-project-backend.azurewebsites.net/api/GetStations'

const getAllStations = async () => {
  const request = axios.get(baseStationsUrl)
  const response = await request
  return response.data
}

const stationsService = {
  getAllStations
}

export default stationsService