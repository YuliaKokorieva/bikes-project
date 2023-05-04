import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RidesList from './RidesList';
import StationsList from './StationsList';

function TabApp() {
  const [tabvalue, setTabvalue] = useState();
  
  useEffect(() => {
    setTabvalue('rides')
  }, [])


  const handleChange=(event, tabvalue) => {
    setTabvalue(tabvalue);
  }
  const styles = {
    tab: {
        padding: '2px 34px',
        color: 'white',
        fontWeight: 'bold',
    }
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
        <Tabs value={tabvalue} onChange={handleChange} TabIndicatorProps={{style: {background:'white'}}}>
          <Tab value="rides" label="Rides" style={styles.tab}/>
          <Tab value="stations" label="Stations" style={styles.tab}/>
        </Tabs>
      </AppBar>

      {tabvalue === 'Rides' && <RidesList/>}
      {tabvalue === 'stations' && <StationsList/>}

    </div>
  );
}

export default TabApp;