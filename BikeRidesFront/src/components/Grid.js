import React, { useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Station from './stations/Station'

function Grid({ rows, columns, clickableRows }) {
  const [gridApi, setGridApi] = useState(null)
  const [selectedStation, setSelectedStation] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onGridReady = useCallback((params) => {
    setGridApi(params.api)
  }, [])

  const onRowClicked = (event) => {
    setSelectedStation(event.data)
    handleOpen()
  }

  const handleQuickFilter = (event) => {
    gridApi.setQuickFilter(event.target.value)
  }

  const stackStyle = {
    backgroundColor: '#e8e8f2',
    padding: '15px',
  }
  const searchStyle = { width: '500px', padding: '20px', height: '30px' }

  return (
    <div>
      <div className="ag-theme-material" style={{ marginTop: 20, height: 650, margin: 'auto' }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="left"
          style={stackStyle}
        >
          <div>
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
          rowData={rows}
          columnDefs={columns}
          pagination
          paginationPageSize={10}
          onRowClicked={clickableRows ? onRowClicked : null}
        />
        {
          clickableRows
            ? (
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    minWidth: 400,
                    minHeight: 300,
                  },
                }}
              >
                {
                  selectedStation
                    ? (
                      <div>
                        <DialogTitle>
                          {selectedStation.Name}
                      : station info
                        </DialogTitle>
                        <DialogContent>
                          <Station id={selectedStation.ID} />
                        </DialogContent>
                      </div>
                    )
                    : null
                }

              </Dialog>
            )
            : null
        }
      </div>
    </div>
  )
}

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  clickableRows: PropTypes.bool.isRequired,
}

export default Grid