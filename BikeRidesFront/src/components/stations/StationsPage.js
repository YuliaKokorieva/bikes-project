import React, { useState, useEffect, useRef } from 'react'
import {AgGridReact} from 'ag-grid-react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import stationsService from '../../services/stationsservice';
import Station from './Station';

function StationsPage() {
  const [stations, setStations] =useState([])
  const [selectedStation, setSelectedStation] = useState(null);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      const stations = await stationsService.getAllStations();
      setStations(stations);
    };
    fetchStations();
  }, []);


  const gridRef = useRef();

  const columns = [
    {field: 'Name', sortable: true, filter: true, headerName: 'Name'},
    {field: 'Adress', sortable: false, filter: true, headerName: 'Address'}
  ]
  const onRowClicked = (event) => {
    setSelectedStation(event.data);
    handleOpen();
  };

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

  const stackStyle={
  }
  const searchStyle = {width:"500px", padding: "20px", height: "30px"}

  return (
    <div>
      <div className="ag-theme-material" style={{marginTop: 20, height: 650,  margin: 'auto'}}>
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="left" 
          style={stackStyle}
        >
          <div >
            <input
              style={searchStyle}
              type="search"
              placeholder="Search"
              onChange={handleQuickFilter}
            />
          </div>
        </Stack>

        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={stations}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          onRowClicked={onRowClicked}
        />
        <Dialog
          open = {open}
          onClose={handleClose}
        >
          <Station station={selectedStation}/>
        </Dialog>
      </div>
    </div>
  )
}

export default StationsPage;