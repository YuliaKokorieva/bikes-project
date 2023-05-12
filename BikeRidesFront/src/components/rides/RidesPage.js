import React, { useState, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react';
import {Dialog, DialogContent, DialogTitle, Stack} from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import ridesService from '../../services/ridesservice';

function RidesPage() {
  const [rides, setRides] =useState([])
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      const rides = await ridesService.getAllRides();
      setRides(rides);
    };
    fetchRides();
  }, []);

  const columns = [
    {field: 'ID', sortable: true, filter: false, headerName: 'Number'},
    {field: 'Departure_station', sortable: true, filter: true, headerName: 'Departure station'},
    {field: 'Return_station', sortable: true, filter: true, headerName: 'Return station'},
    {field: 'Covered_distance_m', sortable: true, filter: false, headerName: 'Distance, m.'},
    {field: 'Duration_sec', sortable: true, filter: false, headerName: 'Duration, sec.'},
  ]

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
          rowData={rides}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  )
}

export default RidesPage;