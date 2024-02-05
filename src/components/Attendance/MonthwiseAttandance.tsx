import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import Help from '@mui/icons-material/QuestionMark';
import ReplyIcon from '@mui/icons-material/Reply';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import WebBackButton from 'src/libraries/button/WebBackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance';
import { RootState } from 'src/store';

const MonthwiseAttandance = () => {
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const HeaderArray = [
    { Id: 1, Header: 'Roll No.' },
    { Id: 2, Header: 'Student Name', align: 'left' },
    { Id: 3, Header: 'Mar' },
    { Id: 4, Header: 'Apr' },
    { Id: 5, Header: 'May' },
    { Id: 6, Header: 'Jun' },
    { Id: 7, Header: 'Jul' },
    { Id: 8, Header: 'Aug' },
    { Id: 9, Header: 'Sep' },
    { Id: 10, Header: 'Oct' },
    { Id: 10, Header: 'Nov' },
    { Id: 10, Header: 'Dec' },
    { Id: 11, Header: 'Jan' },
    { Id: 12, Header: 'Feb' },
    { Id: 13, scope: 'row', Header: 'Present Days' },
    { Id: 14, scope: 'row', Header: 'Total Days' },
    { Id: 15, Header: '%' }
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const StudentId = Number(sessionStorage.getItem('StudentId'));
  const Note: string =
    "Displays students'  attendance for each month. Attendance is presented in the following format: number of days present/total attendance days.";
  const MonthWiseAttendance = useSelector(
    (state: RootState) => state.MonthwiseAttendance.GetMonthwiseAttendance
  );
  const [search, setSearch] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([
    MonthWiseAttendance
  ]);
  const GetMonthwiseAttendanceBody: IGetMonthwiseAttendanceBody = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asStanardDivisionId: StandardDivisionId,
    TopRanker: 1000,
    Student_Id: StudentId,
    SortExp: ' ORDER BY [Roll_No] ASC',
    prm_StartIndex: 0,
    PageSize: 100
  };

  const changeSearchText = () => {
    if (SearchText === '') {
      setMonthWiseAttendanceList(MonthWiseAttendance);
    } else {
      setMonthWiseAttendanceList(
        MonthWiseAttendance.filter((item) => {
          return item.Text2.toLowerCase().includes(SearchText.toLowerCase());
        })
      );
    }
  };

  const SearchNameChange = (value) => {
    setSearchText(value);
  };

  const clickReset = () => {
    setMonthWiseAttendanceList(MonthWiseAttendance);
    setSearchText('');
  };

  useEffect(() => {
    dispatch(getattendance(GetMonthwiseAttendanceBody));
  }, []);

  useEffect(() => {
    setMonthWiseAttendanceList(MonthWiseAttendance);
  }, [MonthWiseAttendance]);

  const click = () => {
    navigate('/extended-sidebar/Teacher/TAttendance');
  };
  return (
    <>
      <Box
        sx={{
          marginTop: '20px',
          px: 3
        }}
      >
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box sx={{ pt: 2, pb: 1 }}>
            <PageHeader heading={'Month Wise Attendance'} subheading={''} />
          </Box>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexWrap: 'nowrap'
              }}
            >
              {search ? (
                <>
                  <InputBase
                    sx={{ ml: 1, flex: 1, width: '450px' }}
                    placeholder="Search Text"
                    inputProps={{ 'aria-label': 'search Text' }}
                    value={SearchText}
                    onChange={(e) => SearchNameChange(e.target.value)}
                  />

                  <IconButton type="button" aria-label="search">
                    <CloseTwoTone onClick={clickReset} />
                  </IconButton>
                </>
              ) : (
                ''
              )}
              <Divider sx={{ height: 28 }} orientation="vertical" />
              <Tooltip title="search">
                <IconButton
                  onClick={() => {
                    setSearch(!search);
                    changeSearchText();
                  }}
                  color="primary"
                  aria-label="directions"
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Paper>
            <Tooltip title={Note}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'gray',
                  ':hover': { backgroundColor: 'gray' }
                }}
              >
                <Help />
              </IconButton>
            </Tooltip>
            <WebBackButton
              icon={<ReplyIcon />}
              FromRoute={'/Teacher/TAttendance/'}
            />
          </Stack>
        </Stack>

        <TableAttendace
          ItemList={MonthWiseAttendanceList}
          HeaderArray={HeaderArray}
        />
      </Box>
    </>
  );
};
export default MonthwiseAttandance;
