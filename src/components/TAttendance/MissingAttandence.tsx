import { Box, Grid, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import MissingAttandenceInteface, {
  GetMissingAttandenceData
} from 'src/interfaces/Student/MissingAttandenceInterface';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import DateSelector from 'src/libraries/buttons/DateSelector';
import PageHeader from 'src/libraries/heading/PageHeader';
import List16 from 'src/libraries/list/List16';
import { getMissingAttandenceList } from 'src/requests/Student/MissingAttandenceSlice';
import { RootState } from 'src/store';
import { decodeURL, getDateFormatted } from '../Common/Util';

function MissingAttandence() {
  // USE PARAMS FOR PREVIOUS PAGES DATE 
  let {
    assignedDate,
    StandardId
  } = useParams();

  // Decode in-place
  assignedDate = decodeURL(assignedDate);
  StandardId = decodeURL(StandardId);


  // VARIABLES
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = Styles();
  const theme = useTheme();
  const [getDate, setgetDate] = useState<any>(assignedDate);

  const getCurrentDate = (newDate?: Date) => {
    setgetDate(getDateFormatted(newDate));
  };

  const MissingAttandenceList: any = useSelector(
    (state: RootState) => state.MissingAttandence.MissingAttandenceList
  );

  //SESSION DATA
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');

  // BODY FOR API
  const body: MissingAttandenceInteface = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asDate: getDate
  };

  // CALL FOR API ON DATE CHANGE AND EVEN AT START
  useEffect(() => {
    // getCurrentDate();
    dispatch(getMissingAttandenceList(body));
  }, []);

  useEffect(() => {
    dispatch(getMissingAttandenceList(body));
  }, [getDate]);

  // FOR FUTURE MISSING ATTANDENCE CONSITION -----
  const AssignDate = new Date(getDate);
  const PresentDate = new Date();

  return (
    <>
      <Box sx={{ px: 2 }}>
        <PageHeader heading={'Missing Attendance'} subheading={''} />
        <Grid container direction="row">
          <BackButton
            FromRoute={
              '/Teacher/TAttendance/' + assignedDate + '/' + StandardId
            }
          />
        </Grid>

        <DateSelector
          date={getDate}
          setCurrentDate={getCurrentDate}
          Close={getCurrentDate}
        ></DateSelector>

        {AssignDate > PresentDate ? ( // FUTURE ATTANDENCE
          <ErrorMessages Error={'Future date attendance is not allowed.'} />
        ) : MissingAttandenceList.length < 1 ||
          MissingAttandenceList == undefined ||
          MissingAttandenceList.daywiseAttendanceStatusResult.length < 1 ? ( // FOR UNDEFINED VALUE OR EMPTY ARRAY
          <ErrorMessages Error={'No missing attendance found.'} />
        ) : (
          MissingAttandenceList.daywiseAttendanceStatusResult.map(
            (items: GetMissingAttandenceData, i) => {
              return (
                <div key={i}>
                  {' '}
                  {i === 0 && items.Status == 'A' ? (
                    <>
                      <ErrorMessages
                        Error={
                          'Attendance date should be within the current academic year'
                        }
                      />
                    </>
                  ) : i === 0 && items.Status == 'W' ? (
                    <>
                      <ErrorMessages Error={'Selected date is weekend.'} />
                    </>
                  ) : i === 0 && items.Status == 'H' ? (
                    <>
                      <ErrorMessages Error={'Selected date is holiday.'} />
                    </>
                  ) : i === 0 && items.Status == 'F' ? (
                    <>
                      <ErrorMessages
                        Error={'Future date attendance cannot be viewed.'}
                      />
                    </>
                  ) : MissingAttandenceList.daywiseAttendanceStatusResult
                    .length < 1 ? (
                    <>
                      <ErrorMessages Error={'No missing attendance found.'} />
                    </>
                  ) : (
                    <>
                      <List16 Class={items.Class} key={i} />
                    </>
                  )}
                </div>);
            }
          )
        )}
      </Box>
    </>
  );
}

export default MissingAttandence;
