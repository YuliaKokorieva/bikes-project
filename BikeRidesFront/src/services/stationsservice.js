import axios from 'axios'

const baseUrl = process.env.REACT_APP_FUNC_SOURCE === 'local' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_BASE_URL

const getAllStations = async () => {
  console.log(process.env.REACT_APP_FUNC_SOURCE)
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
