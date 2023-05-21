import React, { useState, useEffect } from 'react'

import ridesService from '../../services/ridesservice'
import Grid from '../Grid'

function RidesPage() {
  const [rides, setRides] = useState([])

  useEffect(() => {
    const fetchRides = async () => {
      const fetchedRides = await ridesService.getAllRides()
      setRides(fetchedRides)
    }
    fetchRides()
  }, [])

  const columns = [
    {
      field: 'ID', sortable: true, filter: false, headerName: 'Number',
    },
    {
      field: 'Departure_station', sortable: true, filter: true, headerName: 'Departure station',
    },
    {
      field: 'Return_station', sortable: true, filter: true, headerName: 'Return station',
    },
    {
      field: 'Covered_distance_m', sortable: true, filter: false, headerName: 'Distance, m.',
    },
    {
      field: 'Duration_sec', sortable: true, filter: false, headerName: 'Duration, sec.',
    },
  ]

  return (
    <div>
      <Grid rows = {rides} columns = {columns} clickableRows = {false}/>
    </div>
  )
}

export default RidesPage
