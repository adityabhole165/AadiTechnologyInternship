import Box from '@mui/material/Box';
import {
  FormControl,
  Grid,
  TextField,
  Card,
  Button,
  NativeSelect,
  InputLabel
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
import SentMessageApi from 'src/api/Student/SentMessage';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';


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
    asMonthId: Month
  };

  const FormSubmitted = (event) => {
    event.preventDefault();
    searchFunction(Year_Month_Input);
    if(pageName === "Inbox" ||  pageName === "/extended-sidebar/MessageCenter/msgCenter"){
      InboxMessageApi.GetInboxList(getList)
      .then((data) => {
        dispatch(getInboxList(getList));
      })
      .catch((err) => {
        alert('error network');
      });
    }
    else if(pageName === "Sent"){
      SentMessageApi.GetSentMessageList(getList)
      .then((data) => {
        dispatch(getInboxList(getList));
      })
      .catch((err) => {
        alert('error network');
      });
    }
    else{
      MessageCenterApi.GetTrashList(getList)
      .then((data) => {
        dispatch(getInboxList(getList));
      })
      .catch((err) => {
        alert('error network');
      });
    }
    
  };

  return (
    <Card
      sx={{
        mb: '10px',
        height: '61px',
        boxShadow: '6px 4px 5px grey !important'
      }}
    >
      <form onSubmit={FormSubmitted}>
        <Grid container sx={{}}>
          <Grid item xs={5} sx={{ mt: '10px', mb: '10px' }}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body :"
              variant="standard"
              fullWidth
              onChange={InputFieldChangeHandler}
              sx={{ mx: '10px' }}
            />
          </Grid>

          <Grid xs={3}>
            <FormControl
              sx={{ minWidth: '110px', mx: '20px', mt: '26px' }}
              variant="outlined"
            >
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
          </Grid>
          <Grid xs={4}>
            <Button
              variant="contained"
              sx={{ mr: '5px', mt: '26px', float: 'right' }}
              size="small"
              onClick={ApplyClickHandler}
              type='submit'
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form2;
