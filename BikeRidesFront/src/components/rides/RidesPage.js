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
      field: 'Distance', sortable: true, filter: false, headerName: 'Distance, km.',
    },
    {
      field: 'Duration', sortable: true, filter: false, headerName: 'Duration, min.',
    },
  ]

  return (
    <div>
      <Grid rows = {rides} columns = {columns} clickableRows = {false}/>
    </div>
  )
}

export default RidesPage
