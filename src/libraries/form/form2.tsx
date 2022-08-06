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
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import InboxMessageApi from 'src/api/MessageCenter/InboxMessage';
import { getInboxList } from 'src/requests/Student/InboxMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';

Form2.propTypes = {
  YearsList: PropTypes.array,
  allMonthList: PropTypes.array
};

function Form2({ YearsList, allMonthList, searchFunction }) {
  const dispatch = useDispatch();

  const [Year_Month_Input, setYear_Month_Input] = useState({
    Apply: false,
    Month: '',
    Input: ''
  });
  const [Month, setMonth] = useState('');
  const [Input, setInput] = useState('');

  const MonthChangeHandler = (e) => {
    setMonth(e.target.value);
  };

  const InputFieldChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const ApplyClickHandler = () => {
    setYear_Month_Input({
      Apply: true,
      Month: Month,
      Input: Input
    });
  };

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );
  const pageName2 = pathname.replace('/extended-sidebar/MessageCenter/', '');

  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  const GetInboxMessageList = useSelector(
    (state: RootState) => state.InboxMessage.InboxList
  );

  const getList: IgetList = {
    asUserId: UserId,
    asAcademicYearId: AcademicYearId,
    asUserRoleId: RoleId,
    asSchoolId: asSchoolId,
    abIsSMSCenter: null,
    asFilter: Input,
    asPageIndex: 1,
    asMonthId: null
  };

  const FormSubmitted = (event) => {
    event.preventDefault();
    searchFunction(Year_Month_Input);

    InboxMessageApi.GetInboxList(getList)
      .then((data) => {
        dispatch(getInboxList(getList));
      })
      .catch((err) => {
        alert('error network');
      });
  };

  return (
    <form onSubmit={FormSubmitted}>
        <Grid container sx={{marginTop:"10px"}}>
          <Grid item xs={12} sx={{  mx: 2 }}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body :"
              variant="standard"
              fullWidth
              onChange={InputFieldChangeHandler}
            />
          </Grid>
          <Grid xs={6}>
            <Box sx={{ m: 2,mt:'15px' }}>
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

          <Grid xs={6} sx={{padding:'5px',ml:'-8px'}}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={ApplyClickHandler}
              sx={{mt:'20px'}}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
    </form>
  );
}

export default Form2;
