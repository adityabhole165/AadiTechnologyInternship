import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { blue } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

const ButtonGroupComponent = ({
  PageChange,
  numberOfButtons,
  rowsPerPage,
  ChangeRowsPerPage,
  rowsPerPageOptions,
  buttonsPerPage
}) => {
  const [selectedButton, setSelectedButton] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);


  const totalPages = Math.ceil(numberOfButtons / buttonsPerPage);

  const buttons = Array.from({ length: numberOfButtons }, (_, i) => (i + 1).toString());

  const ButtonClick = (button) => {
    setSelectedButton(button.toString());
    PageChange(button);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedButtons = buttons.slice(
    currentPage * buttonsPerPage,
    currentPage * buttonsPerPage + buttonsPerPage
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <FormControl variant="outlined" style={{ minWidth: 100, marginRight: 'auto' }}>
        <InputLabel>Rows per page</InputLabel>
        <Select value={rowsPerPage} onChange={ChangeRowsPerPage} label="Rows per page">
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography>Pages</Typography> &nbsp; &nbsp;
      <ButtonGroup color="primary"  size="small"  aria-label="Small button group" variant="outlined">
        {currentPage > 0 && (
          <Tooltip title={'Previous Pages'}>
            <IconButton
              onClick={handlePrevious} disabled={currentPage === 0}
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }}
            >
              <ArrowLeftIcon sx={{ color: "secondary", fontSizec: "small" }} />
            </IconButton>
          </Tooltip>


        )}
        <Box mx={1}>
          {displayedButtons.map((button) => (
            <Button
              key={button}
              onClick={() => ButtonClick(button)}
              variant={selectedButton === button ? 'contained' : 'outlined'}
            >
              {button}
            </Button>
          ))}
        </Box>
        {currentPage < totalPages - 1 && (

          <Tooltip title={'Next Pages'}>
            <IconButton
              onClick={handleNext} disabled={currentPage === totalPages - 1}
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }}
            >
              <ArrowRightIcon sx={{ color: "secondary", fontSizec: "small" }} />
            </IconButton>
          </Tooltip>

        )}
      </ButtonGroup>
    </div>
  );
};

export default ButtonGroupComponent;