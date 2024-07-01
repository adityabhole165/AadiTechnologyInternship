import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';

const ButtonGroupComponent = ({
  handlePageChange,
  numberOfButtons,
  rowsPerPage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
 
}) => {
  const buttons = Array.from({ length: numberOfButtons }, (_, i) => (i + 1).toString());
 
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
     <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 'auto'  }}>
        <InputLabel>Rows per pages</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          label="Rows per page"
        >
          {rowsPerPageOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* <div style={{ flex: 1, textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
          <Box component="span" fontWeight="fontWeightBold">
            {startIndex}
          </Box>
          {' '} out of{' '}
          <Box component="span" fontWeight="fontWeightBold">
            {ItemList.length}
          </Box>{' '}
          {ItemList.length === 1 ? 'record' : 'records'}
        </Typography>
      </div> */}
    <Typography> Pages </Typography> &nbsp; &nbsp;
    <ButtonGroup color="primary" aria-label="outlined primary button group" size="small">
        {buttons.map((button) => (
          <Button key={button} onClick={() => handlePageChange(button)}>
            {button}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ButtonGroupComponent;
