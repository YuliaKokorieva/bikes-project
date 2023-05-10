import React, {useEffect, useState} from 'react';
import stationsService from '../../services/stationsservice';

const Station = ({station}) => {

  const [rides, setRides] = useState([])



  useEffect(() => {
    const fetchStations = async () => {
      const rides = await stationsService.getSingleStation(station.ID);
      setRides(rides)
      console.log(rides)
    };
    fetchStations();
  }, []);

  

  return (
    <div>Station: {station.Name}</div>
  )
}

export default Station