import ApiTwoToneIcon from '@mui/icons-material/ApiTwoTone';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IGetSchoolAttendanceOverviewBody } from 'src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview';
import TableUsingArray from 'src/libraries/ResuableComponents/TableUsingArray';
import { GetStudentAttendance } from 'src/requests/SchoolAttendanceOverview/RequestSchoolAttendanceOverview';
import { RootState } from 'src/store';

const SchoolAttendanceOverview = () => {
  const dispatch = useDispatch();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [SelectDate, SetSelectDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [HeaderArray, setHeaderArray] = useState(['Standard / Division.']);
  const ISAttendanceOverviewGridData = useSelector(
    (state: RootState) => state.SchoolAttendance.AttendanceOverviewGridData
  );
  const ISAttendanceOverviewDivArray = useSelector(
    (state: RootState) => state.SchoolAttendance.AttendanceOverviewDivArray
  );
  const ISWeekendStatusList = useSelector(
    (state: RootState) => state.SchoolAttendance.WeekendStatusList
  );

  const Note: string =
    'Displays the attendance status for all divisions and standards for  chosen date..';

  useEffect(() => {
    setHeaderArray(['Standard | Division']);
    if (ISAttendanceOverviewDivArray.length > 0) {
      ISAttendanceOverviewDivArray.map((obj) => {
        setHeaderArray((item) => [...item, obj]);
      });

      setHeaderArray((item) => [
        ...item,
        'Marked for',
        'Present/Total',
        'Present%'
      ]);
    }
  }, [ISAttendanceOverviewDivArray]);

  useEffect(() => {}, [ISWeekendStatusList]);

  const GetSchoolAttendanceOverview: IGetSchoolAttendanceOverviewBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asSelectedDate: SelectDate
  };

  const onSelectDate = (value) => {
    SetSelectDate(value);
  };

  const navigate = useNavigate();
  const click = () => {
    navigate('/extended-sidebar/Teacher/TAttendance');
  };

  useEffect(() => {
    dispatch(GetStudentAttendance(GetSchoolAttendanceOverview));
  }, [SelectDate]);

  return (
    <Container maxWidth={'xl'} sx={{ mt: 4.5 }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ mb: 2 }}
      >
        <Box>
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
                <ApiTwoToneIcon color="primary" />
              </IconButton>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/TAttendance'}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                sx={{ color: grey[600] }}
              >
                Attendance
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Attendance Overview
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <TextField
              value={SelectDate}
              variant={'outlined'}
              type="date"
              onChange={(e) => {
                onSelectDate(e.target.value);
              }}
              label={'Select Date'}
              size="small"
              sx={{
                backgroundColor: 'white',
                '& .MuiInputBase-input': {
                  fontWeight: 'bold'
                }
              }}
            />
          </Box>
          <Box>
            <Tooltip title={Note}>
              <IconButton
                sx={{
                  backgroundColor: grey[600],
                  color: 'white',
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      {ISWeekendStatusList !== '' ? (
        <Typography variant="h6" sx={{ color: 'red' }}>
          {ISWeekendStatusList}
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableUsingArray
                ItemList={ISAttendanceOverviewGridData}
                HeaderArray={HeaderArray}
              />
            </Grid>
            <div className=""></div>
          </Grid>
          <br></br>
        </>
      )}
      <Box sx={{ display: 'flex' }}>
        <Typography>Legend :</Typography>
        <ClearIcon sx={{ color: 'red' }} />{' '}
        <Typography>Attendance Not Marked</Typography>
      </Box>
    </Container>
  );
};

export default SchoolAttendanceOverview;
