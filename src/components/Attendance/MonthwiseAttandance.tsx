import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import Help from '@mui/icons-material/QuestionMark';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const MonthwiseAttandance = () => {
  let {
    selectClasstecahernew,
    AssignedDate
  } = useParams();

  // Decode in-place
  selectClasstecahernew = decodeURL(selectClasstecahernew);
  AssignedDate = decodeURL(AssignedDate);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  // const StandardDivisionId = Number(
  //   sessionStorage.getItem('StandardDivisionId')
  // );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const StudentId = Number(sessionStorage.getItem('StudentId'));
  const Note = (
    <span>
      Displays list of students along with their month wise attendance.
      Attendance is given in following format.
      <br />
      Number of days present / Total attendance days.
    </span>
  );

  const MonthWiseAttendance = useSelector(
    (state: RootState) => state.MonthwiseAttendance.GetMonthwiseAttendance
  );
  const HeaderArray = useSelector(
    (state: RootState) => state.MonthwiseAttendance.HeaderArray
  );
  const [search, setSearch] = useState(true);
  const [SearchText, setSearchText] = useState('');
  const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([
    MonthWiseAttendance
  ]);
  const GetMonthwiseAttendanceBody: IGetMonthwiseAttendanceBody = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asStanardDivisionId: Number(selectClasstecahernew)
    // TopRanker: 1000,
    // Student_Id: StudentId,
    // SortExp: ' ORDER BY [Roll_No] ASC',
    // prm_StartIndex: 0,
    // PageSize: 100
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

  const onKeyDown = (e) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();

      changeSearchText();
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
    navigate('/RITeSchool/Teacher/TAttendance/' + selectClasstecahernew);
  };
  return (
    <>
      <Box
        sx={{
          px: 2
        }}
      >
        <CommonPageHeader
          navLinks={[
            {
              title: 'Attendance',
              path:
                '/RITeSchool/Teacher/TAttendance/' +
                selectClasstecahernew +
                '/' +
                AssignedDate
            },
            {
              title: 'Month Wise Attendance',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                sx={{
                  width: '100%',
                  flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    mb: { xs: 1, sm: 'auto' }
                  }}>
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
                          sx={{ ml: 1, flex: 1, width: { xs: '56vw', sm: '20vw' } }}
                          placeholder="Search Text"
                          inputProps={{ 'aria-label': 'search Text' }}
                          value={SearchText}
                          onKeyDown={onKeyDown}
                          onChange={(e) => SearchNameChange(e.target.value)}
                        />

                        <IconButton type="button" aria-label="search">
                          <CloseTwoTone onClick={clickReset} />
                        </IconButton>
                      </>
                    ) : (
                      ''
                    )}{' '}
                  </Paper>
                </Box>
                {/* <Divider sx={{ height: 28,  }} orientation="vertical" /> */}
                <Tooltip title="search">
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: blue[500],
                      ':hover': { backgroundColor: blue[600] }
                    }}
                    onClick={() => {
                      setSearch(!search);
                      changeSearchText();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Tab') {
                        changeSearchText();
                      }
                    }}
                    color="primary"
                    aria-label="directions"
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={Note}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      ':hover': { backgroundColor: grey[600] }
                    }}
                  >
                    <Help />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          }
        />
        <TableAttendace
          ItemList={MonthWiseAttendanceList}
          HeaderArray={HeaderArray}
        />
      </Box>
    </>
  );
};
export default MonthwiseAttandance;
