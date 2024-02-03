import ClearIcon from '@mui/icons-material/Clear';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetSchoolAttendanceOverviewBody } from 'src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview';
import TableUsingArray from 'src/libraries/ResuableComponents/TableUsingArray';
import PageHeader from 'src/libraries/heading/PageHeader';
import Iconhelp from 'src/libraries/icon/Iconhelp';
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
    <Container maxWidth={'xl'}>
      <PageHeader heading={'Attendance Overview'} subheading={''} />
      <Box sx={{ float: 'right' }}>
        <Iconhelp Note={Note} />
      </Box>
      <Box sx={{ float: 'right' }}>
        <Typography sx={{ color: 'red' }}> * Mandatory fields </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          marginLeft: '300px'
        }}
      >
        <Typography sx={{ mr: '10px' }}>Select Date</Typography>
        <TextField
          value={SelectDate}
          type="date"
          onChange={(e) => {
            onSelectDate(e.target.value);
          }}
          label={''}
          size="small"
        />
        <Typography sx={{ color: 'red' }}> * </Typography>
      </Box>

      {ISWeekendStatusList !== '' ? (
        <Typography variant="h6" sx={{ color: 'red' }}>
          {ISWeekendStatusList}
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
            <Typography>Legend :</Typography>
            <ClearIcon sx={{ color: 'red' }} />{' '}
            <Typography>Attendance Not Marked</Typography>
          </Box>

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
    </Container>
  );
};

export default SchoolAttendanceOverview;
