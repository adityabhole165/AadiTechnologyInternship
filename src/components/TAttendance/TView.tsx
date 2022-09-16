import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Styles } from 'src/assets/style/student-style';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List14 from 'src/libraries/list/List14';
import { Fab, FormControl, NativeSelect, useTheme } from '@mui/material';
import Buttons from 'src/libraries/buttons/button';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { styled, Grid } from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import AttendanceData, { IGetClassAttendanceResult } from 'src/interfaces/Teacher/TAttendanceList';
import ITAttendance,{ GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';
import { getAttendanceDataList } from 'src/requests/TAttendance/TAttendance';
import ReplyIcon from '@mui/icons-material/Reply';


const TView = () => {
  const { assignedDate } = useParams();
  const { StandardId } = useParams();
  const classes = Styles();
  const theme = useTheme();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [getDate, setgetDate] = useState(assignedDate);
  const [getStandardId, setgetStandardId] = useState(StandardId);
  const [date, setDate] = useState<any>({ selectedDate: assignedDate });
  const getTeacherAttendance: any = useSelector(
    (state: RootState) => state.StandardAttendance.StandardDivisionAttendance
  );
  const currentDate = new Date();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const getAttendanceData = useSelector(
    (state: RootState) => state.AttendanceList.AttendanceData
  );

  const body: ITAttendance = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asTeacherId: asTeacherId
  };

  const body1: AttendanceData = {
    asStdDivId: getStandardId,
    asDate: getDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const getCurrentDate = (newDate?: Date) => {
    setDate({
      selectedDate: getDate
    });
    setgetDate(getDate);
  };

  const getPreviousDate = () => {
    const currentDayInMilli = new Date(getDate).valueOf();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const prev = new Date(previousDayInMilli);
    const Day = new Date(prev).getDate();
    const Month = new Date(prev).toLocaleString('default', { month: 'short' });
    const Year = new Date(prev).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setgetDate(NewDateFormat);
  };

  const getNextDate = () => {
    const currentDayInMilli = new Date(getDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const next = new Date(nextDayInMilli);
    const Day = new Date(next).getDate();
    const Month = new Date(next).toLocaleString('default', { month: 'short' });
    const Year = new Date(next).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setgetDate(NewDateFormat);
  };

  useEffect(() => {
    dispatch(getStandardList(body));
    dispatch(getAttendanceDataList(body1));
  }, [assignedDate, getStandardId]);

  useEffect(() => {
    getCurrentDate();
  }, []);

  useEffect(() => {
    // dispatch(getTAttendanceListt(body))
    dispatch(getAttendanceDataList(body1));
  }, [getDate, getStandardId]);

  const handleChange = (e) => {
    setgetStandardId(e.target.value);
  };
  useEffect(() => {
    dispatch(getStandardList(body));
  }, [getStandardId]);

  const DotLegend = styled('span')(
    ({ theme }) => `
              border-radius: 22px;
              width: ${theme.spacing(1.5)};
              height: ${theme.spacing(1.5)};
              display: inline-block;
              margin-right: ${theme.spacing(1)};
              margin-top: -${theme.spacing(0.1)};
          `
  );
  const AssignDate = new Date(getDate);
  const PresentDate = new Date();

  return (
    <>
      <PageHeader heading={'View Attendance'} subheading={''} />

      <Grid container direction="row" sx={{ mt: '-40px', marginLeft: '27px' }}>
      <span
      onClick={() => navigate(-1)}
      >
        <Fab
          className={classes.backArrow}
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            position: 'absolute',
            top: '30px',
            left: '35px'
          }}
        >
          <ReplyIcon />
        </Fab>
      </span>
      </Grid>
      <br />
      <Grid container direction="row" sx={{ ml: 2.7, mt: 1.5 }}>
        <Grid xs={6}>
          <DotLegend
            className={classes.border}
            style={{ background: '#f33737', marginBottom: '-2px' }}
          />
          <small>
            <b>Absent</b>
          </small>
          <br />
        </Grid>
        <Grid xs={6}>
          <DotLegend
            className={classes.border}
            sx={{ ml: -12.7 }}
            style={{ background: '#00b8d4', marginBottom: '-2px' }}
          />
          <small>
            <b>Late Join</b>
          </small>
          <br />
        </Grid>
      </Grid>
      <>
        {' '}
        <>
          <FormControl
            fullWidth
            sx={{ mt: '0.2rem', mb: '-2', marginLeft: '24px' }}
          >
            <NativeSelect sx={{ mr: '48px' }} onChange={(e) => handleChange(e)}>
              <option>Select Class</option>
              {getTeacherAttendance.map(
                (items: GetStandardDivisionsResult, i) => {
                  return (
                    <>
                      <option value={items.Id} key={i}>
                        {items.Class}
                      </option>
                    </>
                  );
                }
              )}
            </NativeSelect>
            <br></br>
          </FormControl>
        </>
        <br></br>
        <Buttons
          date={getDate}
          PrevDate={getPreviousDate}
          NextDate={getNextDate}
          Close={undefined}
        />
      </>
      <br></br>

      {getAttendanceData.length > 1 ? (
        getAttendanceData.map((items: IGetClassAttendanceResult, i) => (
          <List14
            date={items.JoinDate}
            assigne={getDate}
            present={items.IsPresent}
            RollNumber={items.RollNumber}
            StudentName={items.StudentName}
            key={i}
            getAttendance={getAttendanceData}
          />
        ))
      ) : AssignDate > PresentDate ? (
        <>
          <ErrorMessages Error={'Future date attendance cannot be viewed.'} />
        </>
      ) : (
        getAttendanceData.map((items: IGetClassAttendanceResult, i) => {
          return (
            <>
              {i === 0 && items.Status == 'O' ? (
                <>
                  <ErrorMessages
                    Error={
                      'Attendance Date Should Be Within Current Academic Year'
                    }
                  />
                </>
              ) : i === 0 && items.Status == 'W' ? (
                <>
                  <ErrorMessages Error={'Selected Date Is Weekend.'} />
                </>
              ) : i === 0 && items.Status == 'E' ? (
                <>
                  <ErrorMessages
                    Error={'There Are No Students In This Class.'}
                  />
                </>
              ) : i === 0 && items.Status == 'H' ? (
                <>
                  <ErrorMessages Error={'Selected Date Is Holidays.'} />
                </>
              ) : i === 0 && items.Status == 'N' ? (
                <>
                  <ErrorMessages Error={'Attendance Not Yet Marked.'} />
                </>
              ) : new Date(getDate) > currentDate ? (
                <>
                  <ErrorMessages
                    Error={'Future Date Attendance Cannot Be Viewed.'}
                  />
                </>
              ) : null}
            </>
          );
        })
      )}
    </>
  );
};

export default TView;
