import axios from 'axios'

const baseStationsUrl = 'https://bikes-project-backend.azurewebsites.net/api/GetStations'

const getAllStations = async () => {
  try {
    const request = await axios.get(baseStationsUrl)
    return(request.data)
  } catch (error) {
    console.log(error.message)
  }
}

const stationsService = {
  getAllStations
}

export default stationsService