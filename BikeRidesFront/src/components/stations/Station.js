import React, {useEffect, useState, useMemo} from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Typography from '@mui/material/Typography';

import stationsService from '../../services/stationsservice';

const Station = ({id}) => {

  const [station, setStation] = useState()
  const [center, setCenter] = useState()

  useEffect(() => {
    const fetchStation = async () => {
      const stationInfo = await stationsService.getSingleStation(id);
      setStation(stationInfo)
      setCenter({lat: stationInfo.station_lat, lng: stationInfo.station_lng})
    };
    fetchStation();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const mapStyle = {
    height: 300,
    width: 300
  }
  const dialogStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <span style={dialogStyle}>
      <Typography variant="body1">
        {station?
        (
        <span>
          Address: {station.Osoite} {station.Kaupunki? station.Kaupunki: null}<br/>
          Journeys originated from the station: {station.rides_originated}<br/>
          Journeys ended at the station: {station.rides_ended}<br/>
        </span>
        ): <span>Loading...</span>
        }
        
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
    </span>
  )
}

export default Station