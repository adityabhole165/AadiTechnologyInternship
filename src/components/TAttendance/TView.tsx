import {
  Box,
  FormControl,
  Grid,
  NativeSelect,
  styled,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import ITAttendance from 'src/interfaces/Teacher/TAttendance';
import AttendanceData, {
  IGetClassAttendanceResult
} from 'src/interfaces/Teacher/TAttendanceList';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import DateSelector from 'src/libraries/buttons/DateSelector';
import PageHeader from 'src/libraries/heading/PageHeader';
import List14 from 'src/libraries/list/List14';
import { CardDetail7 } from 'src/libraries/styled/CardStyle';
import {
  DotLegend1,
  DotLegendStyled1
} from 'src/libraries/styled/DotLegendStyled';
import {
  getAttendanceDataList,
  getStandardList
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';
import { decodeURL, getDateFormatted } from '../Common/Util';

const TView = () => {
  let {
    assignedDate
  } = useParams();

  let {
    StandardId
  } = useParams();

  // Decode in-place
  assignedDate = decodeURL(assignedDate);
  StandardId = decodeURL(StandardId);

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
    if (getStandardId != 'undefined') {
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
    setgetDate(NewDateFormat);
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'View Attendance'} subheading={''} />

      <Grid container direction="row">
        <BackButton
          FromRoute={'/Teacher/TAttendance/' + assignedDate + '/' + StandardId}
        />
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: 'red' }}
            />

            <CardDetail7>Absent</CardDetail7>
          </DotLegend1>
        </Grid>

        <Grid item xs={6}>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              sx={{ background: '#64b5f6' }}
            />

            <CardDetail7>Late Join</CardDetail7>
          </DotLegend1>
        </Grid>
      </Grid>

      <>
        <>
          <FormControl fullWidth sx={{ mt: '0.2rem', mb: '-2' }}>
            <NativeSelect
              value={getStandardId}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Class</option>
              {getTeacherAttendance.map((items, i) => {
                return (
                  <option value={items.Value} key={i}>
                    {items.Name}
                  </option>
                );
              })}
            </NativeSelect>
            <br></br>
          </FormControl>
        </>
        <br></br>
        <DateSelector
          date={getDate}
          setCurrentDate={getCurrentDate}
          Close={getCurrentDate}
        ></DateSelector>
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
                  <div style={{ marginTop: '120px !important' }}>
                    <ErrorMessages
                      Error={
                        'Attendance date should be within current academic year.'
                      }
                    />
                  </div>
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
    </Box>
  );
};

export default TView;
