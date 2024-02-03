import {
  Card,
  FormControl,
  Grid,
  IconButton,
  NativeSelect,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InboxMessageApi from 'src/api/MessageCenter/InboxMessage';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import SentMessageApi from 'src/api/Student/SentMessage';
import { Styles } from 'src/assets/style/student-style';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { IGetAllMonthlist } from 'src/interfaces/MessageCenter/Search';
import { getNextPageTrashList } from 'src/requests/MessageCenter/MessaageCenter';
import { getNextPageInboxList } from 'src/requests/Student/InboxMessage';
import { getNextPageSentList } from 'src/requests/Student/Sentmessage';
// import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

Form2.propTypes = {
  YearsList: PropTypes?.array,
  allMonthList: PropTypes.array
};

function Form2({ YearsList, allMonthList, searchFunction, YearChangeCapture }) {
  const dispatch = useDispatch();
  const classes = Styles();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  // Search Object
  const [Year_Month_Input, setYear_Month_Input] = useState({
    Apply: false,
    Year: '',
    Month: '',
    Input: ''
  });

  const [Year, setYear] = useState(AcademicYearId);
  const [Month, setMonth] = useState('');
  const [Input, setInput] = useState('');

  const YearChangeHandler = (e) => {
    setYear(e.target.value);
    YearChangeCapture(e.target.value);
  };

  const MonthChangeHandler = (e) => {
    setMonth(e.target.value);
  };

  const InputFieldChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const ApplyClickHandler = () => {
    setYear_Month_Input({
      Apply: true,
      Year: Year,
      Month: Month,
      Input: Input
    });
  };

  //  Page name for api call
  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );

  const getList: IgetList = {
    asUserId: UserId,
    asAcademicYearId: Year,
    asUserRoleId: RoleId,
    asSchoolId: asSchoolId,
    abIsSMSCenter: null,
    asFilter: Input,
    asPageIndex: 1,
    asMonthId: Month,
    asOperator: '',
    asDate: ''
  };

  const FormSubmitted = (event) => {
    event.preventDefault();
    searchFunction(Year_Month_Input); // set search object
    //  Page conditions
    if (
      pageName === 'Inbox' ||
      pageName === '/extended-sidebar/MessageCenter/msgCenter'
    ) {
      InboxMessageApi.GetInboxList(getList)
        .then((data) => {
          dispatch(getNextPageInboxList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
    if (pageName === 'Sent') {
      SentMessageApi.GetSentMessageList(getList)
        .then((data) => {
          dispatch(getNextPageSentList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
    if (pageName === 'Trash') {
      MessageCenterApi.GetTrashList(getList)
        .then((data) => {
          dispatch(getNextPageTrashList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
  };

  return (
    <Card
      className={classes.ListStyle1}
      sx={{
        mb: '10px',
        height: '120px'
      }}
    >
      <form onSubmit={FormSubmitted}>
        <Grid container sx={{ mt: '35px' }}>
          <Grid item xs={11} sx={{ mt: '-30px', mb: '10px' }}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body :"
              variant="standard"
              fullWidth
              onChange={InputFieldChangeHandler}
              sx={{ mx: '10px' }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: '35px' }}>
          <Grid xs={5}>
            <FormControl
              sx={{ minWidth: '110px', mx: '20px', mt: '-14px' }}
              variant="outlined"
            >
              {
                <NativeSelect
                  id="demo-simple-select-label"
                  onChange={YearChangeHandler}
                >
                  {YearsList.map((item, i) => {
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
          </Grid>

          <Grid xs={5} sx={{ ml: '-20px' }}>
            <FormControl
              sx={{ minWidth: '160px', mx: '20px', mt: '-14px' }}
              variant="outlined"
            >
              {
                <NativeSelect
                  id="demo-simple-select-label"
                  onChange={MonthChangeHandler}
                >
                  <option key={'0'} id="demo-simple-select" value={'0'}>
                    {'All'}
                  </option>
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
          <Grid xs={2}>
            <IconButton
              onClick={ApplyClickHandler}
              type="submit"
              sx={{ mr: '-15px', mt: '-12px', float: 'right' }}
            >
              {/* <ArrowCircleRightRoundedIcon sx={{color:'#90caf9',fontSize:"35px",position:'relative',bottom:'6px',right:'-10px'}}/> */}
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form2;
