import React, {useEffect, useState, useMemo} from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Typography from '@mui/material/Typography';

import stationsService from '../../services/stationsservice';

const Station = ({station}) => {

  const [rides, setRides] = useState([])

  useEffect(() => {
    const fetchStations = async () => {
      const rides = await stationsService.getSingleStation(station.ID);
      setRides(rides)
    };
    fetchStations();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(()=> ({lat: station.y, lng: station.x}), [])


  const mapStyle = {
    height: 300,
    width: 300
  }
  const dialogStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <div style={dialogStyle}>
      <Typography variant="body1">
        <span>Address: {station.Osoite} {station.Kaupunki? station.Kaupunki: null}<br/>
        Rides starting from the station: {rides.length}</span>
        <span>
          {!isLoaded ? (
            <span>Loading...</span>
          ) : (
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={center}
              zoom={15}
            > 
               <Marker position={center} />
            </GoogleMap>

          )}

        </span>
      </Typography>
    </div>
  )
}

export default Station