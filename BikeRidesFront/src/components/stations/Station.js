import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

import stationsService from '../../services/stationsservice'
import { mapStyle } from '../../styles/styles'

function Station({ id }) {
  const [station, setStation] = useState()
  const [center, setCenter] = useState()

  useEffect(() => {
    const fetchStation = async () => {
      const stationInfo = await stationsService.getSingleStation(id)
      setStation(stationInfo)
      setCenter({ lat: stationInfo.station_lat, lng: stationInfo.station_lng })
    }
    fetchStation()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })


  return (
    <span>

      {station
        ? (
          <span>
            <Typography variant="button">Address:</Typography>
            {' '}
            <Typography variant="body1">
              {station.Osoite}
              {' '}
              {station.Kaupunki ? station.Kaupunki : null}
            </Typography>
            <br />
            <Typography variant="button">Journeys originated from the station</Typography>
            <br />
            <ul>
              <li>
                <Typography variant="body1">
                  Number:
                  {station.rides_originated ? station.rides_originated : '0'}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Average distance:
                  {station.avg_distance_originated ? station.avg_distance_originated.toFixed(1) : '0'}
                  {' '}
                  m
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Top return stations:
                  {station.top_return_stations ? station.top_return_stations : 'none'}
                  {' '}
                </Typography>
                <br />
              </li>
            </ul>

            <Typography variant="button">Journeys ended at the station</Typography>
            <br />
            <ul>
              <li>
                <Typography variant="body1">
                  Number:
                  {station.rides_ended ? station.rides_ended : '0'}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Average distance:
                  {station.avg_distance_ended ? station.avg_distance_ended.toFixed(1) : '0'}
                  {' '}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Top departure stations:
                  {station.top_departure_stations ? station.top_departure_stations : 'none'}
                  {' '}
                </Typography>
                <br />
              </li>
            </ul>
          </span>
        ) : <span>Loading...</span>}

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
    </span>
  )
}

Station.propTypes = {
  id: PropTypes.number.isRequired,
}

export default Station
