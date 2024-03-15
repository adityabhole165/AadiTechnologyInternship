import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import Help from '@mui/icons-material/QuestionMark';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance';
import { RootState } from 'src/store';

const MonthwiseAttandance = () => {
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const StudentId = Number(sessionStorage.getItem('StudentId'));
  const Note: string =
    "Displays students'  attendance for each month. Attendance is presented in the following format: number of days present/total attendance days.";
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
    asStanardDivisionId: StandardDivisionId,
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
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightTwoTone />}
            >
              <Link
                to={'/extended-sidebar/landing/landing'}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                <IconButton
                  sx={{
                    background: (theme) => theme.palette.common.white,
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                  }}
                >
                  <HomeTwoTone color="primary" />
                </IconButton>
              </Link>
              <Link
                to={'/extended-sidebar/Teacher/TAttendance'}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant={'h3'}
                  fontSize={'23px'}
                  color={'text.primary'}
                  fontWeight={'normal'}
                  sx={{
                    '&:hover': {
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Attendance
                </Typography>
              </Link>
              <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
                Month Wise Attendance
              </Typography>
            </Breadcrumbs>
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
                  backgroundColor: grey[500],
                  ':hover': { backgroundColor: grey[600] }
                }}
              >
                <Help />
              </IconButton>
            </Tooltip>
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
