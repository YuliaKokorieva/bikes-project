import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RidesPage from './rides/RidesPage';
import StationsGrid from './stations/StationsGrid';

function TabApp() {
  const [tabvalue, setTabvalue] = useState('rides');
  
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

      {tabvalue === 'Rides' && <RidesPage/>}
      {tabvalue === 'stations' && <StationsGrid/>}

    </div>
  );
}

export default TabApp;