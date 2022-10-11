import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Styles } from 'src/assets/style/student-style';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List14 from 'src/libraries/list/List14';
import { Container, Fab, FormControl, NativeSelect, useTheme } from '@mui/material';
import Buttons from 'src/libraries/buttons/button';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { styled, Grid } from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import AttendanceData, { IGetClassAttendanceResult } from 'src/interfaces/Teacher/TAttendanceList';
import ITAttendance, { GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';
import { getAttendanceDataList, getStandardList } from 'src/requests/TAttendance/TAttendance';
import ReplyIcon from '@mui/icons-material/Reply';
import { getDateFormatted } from '../Common/Util'
import DateSelector from 'src/libraries/buttons/DateSelector';


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
    (state: RootState) => state.StandardAttendance.stdlist
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
    setgetDate(getDateFormatted(newDate));
  };


  useEffect(() => {
    dispatch(getStandardList(body));
  }, []);

  useEffect(() => {
    if (getStandardId!="undefined") {
      dispatch(getAttendanceDataList(body1));
    }
  }, [getDate, getStandardId]);

  const handleChange = (e) => {
    setgetStandardId(e.target.value);
  };

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

  const CloseCalender = (e) => {
    const date = new Date(e);
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setgetDate(NewDateFormat)
  }


  return (
    <Container>
      <PageHeader heading={'View Attendance'} subheading={''} />

      <Grid container direction="row" >
        <span
          onClick={() => navigate(-1)}
        >
          
          <BackButton/>
        </span>
      </Grid>

      <Grid container direction="row">
        <Grid item xs={3}>
          <DotLegend
            className={classes.border}
            style={{ background: '#f33737', }}
          />
          <small>
            <b>Absent</b>
          </small>
          <br />
        </Grid>
        <Grid item xs={3}>
          <DotLegend
            className={classes.border}
        
            style={{ background: '#00b8d4', }}
          />
          <small>
            <b>Late Join</b>
          </small>
          <br />
        </Grid>
      </Grid>
      <>
        <>
          <FormControl
            fullWidth
            sx={{ mt: '0.2rem', mb: '-2' }}
          >
            <NativeSelect value={getStandardId} onChange={(e) => handleChange(e)}>
              <option>Select Class</option>
              {getTeacherAttendance.map(
                (items, i) => {
                  return (
                      <option value={items.Value} key={i}>
                        {items.Name}
                      </option>
                  );
                }
              )}
            </NativeSelect>
            <br></br>
          </FormControl>
        </>
        <br></br>
        <br></br>
        <DateSelector date={getDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>
      </>


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
            <div key={i}>
              {i === 0 && items.Status == 'O' ? (
                <>
                  <ErrorMessages
                    Error={
                      'Attendance date should be within current academic year'
                    }
                  />
                </>
              ) : i === 0 && items.Status == 'W' ? (
                <>
                  <ErrorMessages Error={'Selected date is weekend.'} />
                </>
              ) : i === 0 && items.Status == 'E' ? (
                <>
                  <ErrorMessages
                    Error={'There are no students in this class.'}
                  />
                </>
              ) : i === 0 && items.Status == 'H' ? (
                <>
                  <ErrorMessages Error={'Selected date is holidays.'} />
                </>
              ) : i === 0 && items.Status == 'N' ? (
                <>
                  <ErrorMessages Error={'Attendance not yet marked.'} />
                </>
              ) : new Date(getDate) > currentDate ? (
                <>
                  <ErrorMessages
                    Error={'Future date attendance cannot be viewed.'}
                  />
                </>
              ) : null}
            </div>
          );
        })
      )}
    </Container>
  );
};

export default TView;
