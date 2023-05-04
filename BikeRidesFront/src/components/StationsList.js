import React, { useState, useEffect, useRef } from 'react'
import {AgGridReact} from 'ag-grid-react';
import Stack from '@mui/material/Stack';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import stationsService from '../services/stationsservice'

export default function StationsList() {
  const [stations, setStations] = useState([])
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    stationsService
      .getAllStations()
      .then(stations =>setStations(stations)
    )  
  }, [])

  const columns = [
    {field: 'Name', sortable: true, filter: true, headerName: 'Name'},
    {field: 'Adress', sortable: false, filter: true, headerName: 'Address'},
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
      />
    </div>
  )
}