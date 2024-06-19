import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IGetSchoolAttendanceOverviewBody } from 'src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview';
import TableUsingArray from 'src/libraries/ResuableComponents/TableUsingArray';
import { GetStudentAttendance } from 'src/requests/SchoolAttendanceOverview/RequestSchoolAttendanceOverview';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import Datepicker from 'src/libraries/DateSelector/Datepicker';


const SchoolAttendanceOverview = () => {
  const { AssignedDate } = useParams()
  const dispatch = useDispatch();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [SelectDate, SetSelectDate] = useState(AssignedDate == undefined ?
    new Date().toISOString().split('T')[0] : getCalendarDateFormatDateNew(AssignedDate)
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
    'Displays attendance status for all classes for selected date.';

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

  useEffect(() => { }, [ISWeekendStatusList]);

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
    navigate('/extended-sidebar/Teacher/TAttendance/' + SelectDate);
  };

  useEffect(() => {
    dispatch(GetStudentAttendance(GetSchoolAttendanceOverview));
  }, [SelectDate]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Attendance',
            path: '/extended-sidebar/Teacher/TAttendance/' + SelectDate
          },
          {
            title: 'Attendance Overview',
            path: ''
          }
        ]}
        rightActions={
          <>
            <Box sx={{ background: 'white' }}>
              {/* <TextField
                value={SelectDate}
                type='date'
                onChange={(e) => { onSelectDate(e.target.value) }}
                label={''}
                size="small"
                inputProps={{
                  max: new Date().toISOString().split('T')[0]
                }}
              /> */}
              {/* <DatePicker
                views={['year', 'month', 'day']}
                value={new Date(SelectDate)}
                onChange={(date) => {
                  onSelectDate(date);
                }}
                format='dd-MM-yyyy'
                slotProps={{
                  textField: {
                    variant: "outlined",
                    size: "small",
                  }
                }}

              /> */}
                <Datepicker
                  DateValue={SelectDate}
                  onDateChange={onSelectDate}
                  label={'Start Date'}
                  size={"small"}

                />
            </Box>
            <Box>
              <Tooltip title={Note}>
                <IconButton
                  sx={{
                    backgroundColor: grey[500],
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
          </>
        }
      />
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
    </Box>
  );
};

export default SchoolAttendanceOverview;
