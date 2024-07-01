import React, { useState } from 'react';
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
  const [selectedButton, setSelectedButton] = useState('1'); 
  const buttons = Array.from({ length: numberOfButtons }, (_, i) => (i + 1).toString());

  const ButtonClick = (button) => {
    setSelectedButton(button.toString()); 
    handlePageChange(button);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 'auto' }}>
        <InputLabel>Rows per page</InputLabel>
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

      <Typography>Pages</Typography> &nbsp; &nbsp;
      <ButtonGroup color="primary" aria-label="outlined primary button group" size="small">
        {buttons.map((button) => (
          <Button
            key={button}
            onClick={() => ButtonClick(button)}
            variant={selectedButton === button ? 'contained' : 'outlined'}
          >
            {button}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ButtonGroupComponent;
