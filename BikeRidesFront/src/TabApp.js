import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import RidesPage from './components/rides/RidesPage'
import StationsPage from './components/stations/StationsPage'
import { tabAppStyle } from './styles/styles'

function TabApp() {
  const [tabvalue, setTabvalue] = useState('stations')

  const handleChange = (event, newtabvalue) => {
    setTabvalue(newtabvalue)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Bikes Rides App
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="static">
        <Tabs value={tabvalue} onChange={handleChange} TabIndicatorProps={{ style: tabAppStyle.tabIndicator }}>
          <Tab value="rides" label="Rides" style={tabAppStyle.tab} />
          <Tab value="stations" label="Stations" style={tabAppStyle.tab} />
        </Tabs>
      </AppBar>

      {tabvalue === 'rides' && <RidesPage />}
      {tabvalue === 'stations' && <StationsPage />}

    </div>
  )
}

export default TabApp
