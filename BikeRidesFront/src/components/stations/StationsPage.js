import React, { useState, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
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

  const columns = [
    {field: 'Name', sortable: true, filter: true, headerName: 'Name'},
    {field: 'Osoite', sortable: false, filter: true, headerName: 'Address'}
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
    backgroundColor:"#e8e8f2",
    padding: "15px"
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
          PaperProps={{
            style: {
              minWidth: 400,
              minHeight: 300
            }
          }} 
        >
          {
            selectedStation ?
              (
              <div>
                <DialogTitle>{selectedStation.Name}: station info</DialogTitle>
                <DialogContent>
                  <Station id={selectedStation.ID}/>
                </DialogContent>
              </div>)
              : null
          }

        </Dialog>
      </div>
    </div>
  )
}

export default StationsPage;