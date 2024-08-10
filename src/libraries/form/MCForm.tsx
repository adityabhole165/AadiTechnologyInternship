import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import { ListStyle } from '../styled/CardStyle';
import Datepicker from '../DateSelector/Datepicker';
import { blue, red } from '@mui/material/colors';


const MCForm = ({
  AcademicYearList,
  MonthYearList,
  clickSearch,
  academicYear,
  monthYear,
  clickAcademicYear,
  clickMonthYear,
  isSearchClicked,
  CloseSearchBar
}) => {
  const [searchText, setSearchText] = useState('');
  const [operator, setOperator] = useState('=');
  const [searchDate, setSearchDateDate] = useState<string>('');

  const clickDate = (e) => {
    setSearchDateDate(e.target.value);
  };
  const clickOperator = (value) => {
    setOperator(value);
  };
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
    clickSearch(
      searchText,
      academicYear,
      monthYear,
      operator,
      searchDate,
      !isSearchClicked
    );
  };
  const operatorArray = [
    { Name: '=', Value: '=' },
    { Name: '<', Value: '<' },
    { Name: '<=', Value: '<=' },
    { Name: '>', Value: '>' },
    { Name: '>=', Value: '>=' }
  ];

  console.log('AcademicYearList', AcademicYearList);
  console.log('operatorArray', operatorArray);

  return (
    <ListStyle>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Avatar
          onClick={CloseSearchBar}
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
              '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
          }}
        >
          <CloseIcon fontSize="small" color="error" />
        </Avatar>
      </Box>

      <Grid container spacing={2} sx={{pl:3}}>
        <Grid item xs={11}>
          <TextField
            id="standard-basic"
            label="Name / Subject / Message Body :"
            variant="standard"
            fullWidth
            onChange={textOnChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Dropdown
            Array={AcademicYearList}
            handleChange={clickAY}
            label={'Year'}
            defaultValue={academicYear}
          />
        </Grid>
        <Grid item xs={6}>
          <Dropdown
            Array={MonthYearList}
            handleChange={clickMY}
            label={'Month'}
            defaultValue={monthYear}
          />
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ width: '80px' }}>
            <Dropdown
              Array={operatorArray}
              handleChange={clickOperator}
              defaultValue={operator}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          {/* <TextField
            type="date"
            id="outlined-required"
            variant="standard"
            onChange={clickDate}
            fullWidth
          /> */}
           <Datepicker
                  DateValue={searchDate}
                  onDateChange={clickDate}
                  label={''}
                  size={"small"}

                />
        </Grid>
        <Grid item xs={0}>
          {/* <Button>
          <SearchIcon
            onClick={onClick}
            
            color="success"
          ></SearchIcon>
          </Button> */}
          <Button
               onClick={onClick}
               endIcon={<SearchIcon />}
               fullWidth
              sx={{
                color:'blue',
                  '&:hover': {
                color:'blue',
                borderRadius:'5px',
                 backgroundColor: blue[100]
                  }}}
            >
              Search
            </Button>
        </Grid>
      </Grid>
    </ListStyle>
  );
};

export default MCForm;
