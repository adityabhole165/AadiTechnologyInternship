import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import Datepicker from '../DateSelector/Datepicker';
import SearchableDropdown from '../ResuableComponents/SearchableDropdown';

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
    <>
      <Box sx={{ p: 2, backgroundColor: 'white', mb: 2 }}>
        {/* <ListStyle> */}
        {/* <Box display={{ xs: 'block', sm: 'none' }}>
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
      </Box> */}

        <Grid container spacing={2} >
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body "
              // variant="standard"
              fullWidth
              onChange={textOnChange}
              size={"medium"}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  onClick();
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Dropdown
            Array={AcademicYearList}
            handleChange={clickAY}
            label={'Year'}
            defaultValue={academicYear}
          /> */}

            <SearchableDropdown
              ItemList={AcademicYearList}
              onChange={clickAY}
              label={'Year'}
              defaultValue={academicYear}
              mandatory
              size={"medium"}
              sx={{ width: '100%' }}
            /></Grid>

          <Grid item xs={12} md={6} >
            {/* <Dropdown
            Array={MonthYearList}
            handleChange={clickMY}
            label={'Month'}
            defaultValue={monthYear}
          /> */}
            <SearchableDropdown
              ItemList={MonthYearList}
              onChange={clickAY}
              label={'Month'}
              defaultValue={monthYear}
              size={"medium"}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              {/* <Dropdown
              Array={operatorArray}
              handleChange={clickOperator}
              defaultValue={operator}
              size={"medium"}
            /> */}
              <SearchableDropdown
                ItemList={operatorArray}
                onChange={clickAY}
                label={'Operator'}
                defaultValue={operator}
                size={"medium"}
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={5.4}>
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
              size={"medium"}

            />
          </Grid>
          <Grid item xs={0}>
            <Tooltip
              title={'Search'}
            >
              <IconButton
                onClick={onClick}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  mt: 1,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <SearchTwoTone />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {/* </ListStyle> */}
      </Box>
    </>
  );
};

export default MCForm;
