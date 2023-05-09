import React from 'react';
import Button from '@mui/material/Button';

import stationsService from '../../services/stationsservice';

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const onClick = async (id) => {
    console.log(await stationsService.getSingleStation(id))

  }

  return (
    <div>
      <Button variant="outlined" size="small" onClick={()=>onClick(cellValue)}>
        Show info
      </Button>
    </div>
  );
};