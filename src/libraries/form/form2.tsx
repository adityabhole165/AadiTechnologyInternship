import Box from '@mui/material/Box';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  NativeSelect
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  IgetYears,
  IGetAllMonthlist
} from 'src/interfaces/MessageCenter/Search';
import { useState } from 'react';

Form2.propTypes = {
  YearsList: PropTypes.array,
  allMonthList: PropTypes.array
};

function Form2({ YearsList, allMonthList, searchFunction }) {
  const [Year_Month_Input, setYear_Month_Input] = useState({
    Year: '',
    Month: '',
    Input: ''
  });
  const [Year, setYear] = useState('');
  const [Month, setMonth] = useState('');
  const [Input, setInput] = useState('');

  const YearChangeHandler = (e) => {
    setYear(e.target.value);
  };

  const MonthChangeHandler = (e) => {
    setMonth(e.target.value);
  };

  const InputFieldChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const ApplyClickHandler = () => {
    setYear_Month_Input({
      Year: Year,
      Month: Month,
      Input: Input
    });
  };

  const FormSubmitted = (event) => {
    event.preventDefault();
    searchFunction(Year_Month_Input);
  };

  return (
    <form onSubmit={FormSubmitted}>
      <div>
        <Grid container>
          <Grid xs={6}>
            <Box sx={{ m: 2 }}>
              <FormControl fullWidth variant="standard">
                Select Year
                {
                  <NativeSelect
                    id="demo-simple-select-label"
                    onChange={YearChangeHandler}
                  >
                    {YearsList.map((item: IgetYears, i) => {
                      return (
                        <>
                          <option
                            key={i}
                            id="demo-simple-select"
                            value={item.AcademicYearId}
                          >
                            {item.AcademicYearName}
                          </option>
                        </>
                      );
                    })}
                  </NativeSelect>
                }
              </FormControl>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={{ m: 2 }}>
              <FormControl fullWidth variant="standard">
                Select Month
                {
                  <NativeSelect
                    id="demo-simple-select-label"
                    onChange={MonthChangeHandler}
                  >
                    {allMonthList.map((item: IGetAllMonthlist, i) => {
                      return (
                        <>
                          <option
                            key={i}
                            id="demo-simple-select"
                            value={item.MonthId}
                          >
                            {item.Name}
                          </option>
                        </>
                      );
                    })}
                  </NativeSelect>
                }
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: -1, mx: 2 }}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body :"
              variant="standard"
              fullWidth
              onChange={InputFieldChangeHandler}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              fullWidth
              onClick={ApplyClickHandler}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default Form2;
