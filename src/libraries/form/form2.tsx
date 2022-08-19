import Box from '@mui/material/Box';
import {
  FormControl,
  Grid,
  TextField,
  Card,
  Button,
  NativeSelect,
  InputLabel,
  IconButton
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
import { getSentList } from 'src/requests/Student/Sentmessage';
import { getTrashList } from 'src/requests/MessageCenter/MessaageCenter';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Styles } from 'src/assets/style/student-style';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

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
    if (
      pageName === 'Inbox' ||
      pageName === '/extended-sidebar/MessageCenter/msgCenter'
    ) {
      InboxMessageApi.GetInboxList(getList)
        .then((data) => {
          dispatch(getInboxList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
    if (pageName === 'Sent') {
      SentMessageApi.GetSentMessageList(getList)
        .then((data) => {
          dispatch(getSentList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
    if (pageName === 'Trash') {
      MessageCenterApi.GetTrashList(getList)
        .then((data) => {
          dispatch(getTrashList(getList));
        })
        .catch((err) => {
          alert('error network');
        });
    }
  };
  const classes = Styles();
  console.log(classes);
  // alert(classes.ListStyle1)
  return (
    <Card
      className={classes.ListStyle1}
      sx={{
        mb: '10px',
        height: '61px'
      }}
    >
      <form onSubmit={FormSubmitted}>
        <IconButton sx={{ position: 'relative', float: 'right', top: -6 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Grid container sx={{}}>
          <Grid item xs={5} sx={{ mt: '-30px', mb: '10px' }}>
            <TextField
              id="standard-basic"
              label="Name / Subject / Message Body :"
              variant="standard"
              fullWidth
              onChange={InputFieldChangeHandler}
              sx={{ mx: '10px' }}
            />
          </Grid>

          <Grid xs={5}>
            <FormControl
              sx={{ minWidth: '120px', mx: '20px', mt: '-14px' }}
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
          <Grid xs={2}>
            <IconButton
              onClick={ApplyClickHandler}
              type="submit"
              sx={{ mr: '5px', mt: '-12px', float: 'right' }}
            >
              <ArrowCircleRightRoundedIcon sx={{fontSize:"35px",position:'relative',bottom:'6px',right:'-10px'}}/>
                  {/* <Button color='error' variant="contained" sx={{borderRadius:'5px',mt:-2}}>
           Apply
          </Button> */}
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form2;
