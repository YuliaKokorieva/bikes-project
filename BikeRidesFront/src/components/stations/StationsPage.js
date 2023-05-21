import React, { useState, useEffect } from 'react'

import stationsService from '../../services/stationsservice'
import Grid from '../Grid'

function StationsPage() {
  const [stations, setStations] = useState([])

  useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await stationsService.getAllStations()
      setStations(fetchedStations)
    }
    fetchStations()
  }, [])

  const columns = [
    {
      field: 'Name', sortable: true, filter: true, headerName: 'Name',
    },
    {
      field: 'Osoite', sortable: false, filter: true, headerName: 'Address',
    },
  ]

  return (
    <div>
      <Grid rows = {stations} columns = {columns} clickableRows = {true}/>
    </div>
  )
}

export default StationsPage
