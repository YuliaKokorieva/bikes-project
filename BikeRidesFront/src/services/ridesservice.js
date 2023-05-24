import axios from 'axios'

const baseUrl = process.env.REACT_APP_FUNC_SOURCE === 'local' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_BASE_URL

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
