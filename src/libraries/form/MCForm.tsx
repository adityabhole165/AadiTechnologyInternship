import { TextField, Grid, Avatar } from '@mui/material';
import Dropdown from '../dropdown/Dropdown';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useState } from 'react';
import { ListStyle } from '../styled/CardStyle';
import CloseIcon from '@mui/icons-material/Close';

const MCForm = ({
  AcademicYearList,
  MonthYearList,
  clickSearch,
  academicYear,
  monthYear,
  clickAcademicYear,
  clickMonthYear,
  isSearchClicked
}) => {
  const [searchText, setSearchText] = useState('');
  const textOnChange = (e) => {
    setSearchText(e.target.value);
  };
  const clickAY = (value) => {
    academicYear = value;
    clickAcademicYear(value);
  };
  const clickMY = (value) => {
    monthYear = value;
    clickMonthYear(value);
  };
  const onClick = () => {
    clickSearch(searchText, academicYear, monthYear, !isSearchClicked);
  };
  return (
    <ListStyle>
      <Avatar
        sx={{
          position: 'absolute',
          top: '-10px',
          zIndex: '4',
          right: '-5px',
          p: '2px',
          width: 25,
          height: 25,
          backgroundColor: 'white',
          boxShadow:
            ' 0px 8px 15px rgba(0, 0, 0, 0.1)'
        }}
       
      >
        <CloseIcon fontSize="small" color="error" onClick={onClick}/>
      </Avatar>
  
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Name / Subject / Message Body :"
            variant="standard"
            fullWidth
            onChange={textOnChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Dropdown Array={AcademicYearList} handleChange={clickAY} />
        </Grid>
        <Grid item xs={5}>
          <Dropdown Array={MonthYearList} handleChange={clickMY} />
        </Grid>
        <Grid item xs={2}>
          <ArrowCircleRightRoundedIcon
            onClick={onClick} fontSize="large" color='success'
          ></ArrowCircleRightRoundedIcon>
        </Grid>
      </Grid>
    </ListStyle>
  );
};

export default MCForm;
