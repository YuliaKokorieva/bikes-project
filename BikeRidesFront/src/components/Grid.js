import React, { useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Station from './stations/Station'
import { gridStyle } from '../styles/styles'

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

  return (
    <div>
      <div className="ag-theme-material" style={gridStyle.div}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="left"
          style={gridStyle.stack}
        >
          <div>
            <input
              style={gridStyle.search}
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
                  style: gridStyle.dialog,
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