import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import MissingAttandenceInteface from 'src/interfaces/Student/MissingAttandenceInterface';
import { getMissingAttandenceList } from 'src/requests/Student/MissingAttandenceSlice';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import List16 from 'src/libraries/list/List16';
import { GetMissingAttandenceData } from 'src/interfaces/Student/MissingAttandenceInterface';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Fab, Grid, useTheme } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Styles } from 'src/assets/style/student-style';
import { getDateFormatted } from '../Common/Util';
import DateSelector from 'src/libraries/buttons/DateSelector';
import BackButton from 'src/libraries/button/BackButton';

function MissingAttandence() {
  // USE PARAMS FOR PREVIOUS PAGES DATE
  const { assignedDate } = useParams();

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
      <Container>
        <PageHeader heading={'Missing Attendance'} subheading={''} />
        <Grid
          container
          direction="row"
          sx={{ mt: '-40px', marginLeft: '33px' }}
        >
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackButton />
          </span>
        </Grid>
        <br />
        <br />

        <DateSelector
          date={getDate}
          setCurrentDate={getCurrentDate}
          Close={getCurrentDate}
        ></DateSelector>

        {AssignDate > PresentDate ? ( // FUTURE ATTANDENCE
          <ErrorMessages Error={'Future date attendance is not allowed'} />
        ) : MissingAttandenceList.length < 1 ||
          MissingAttandenceList == undefined ||
          MissingAttandenceList.daywiseAttendanceStatusResult.length < 1 ? ( // FOR UNDEFINED VALUE OR EMPTY ARRAY
          <ErrorMessages Error={'No Missing Attandence Found'} />
        ) : (
          MissingAttandenceList.daywiseAttendanceStatusResult.map(
            (items: GetMissingAttandenceData, i) => {
              return (
                <div key={i}>
                  {' '}
                  {i === 0 && items.Status == 'A' ? (
                    <>
                      <ErrorMessages Error={'Outside Academic Year'} />
                    </>
                  ) : i === 0 && items.Status == 'W' ? (
                    <>
                      <ErrorMessages Error={'Selected date is weekend.'} />
                    </>
                  ) : i === 0 && items.Status == 'H' ? (
                    <>
                      <ErrorMessages Error={'Selected date is holidays.'} />
                    </>
                  ) : i === 0 && items.Status == 'F' ? (
                    <>
                      <ErrorMessages
                        Error={'Future Date Attendance Cannot Be Viewed.'}
                      />
                    </>
                  ) : MissingAttandenceList.daywiseAttendanceStatusResult
                      .length < 1 ? (
                    <>
                      <ErrorMessages Error={'No missing attandence found'} />
                    </>
                  ) : (
                    <>
                      <List16 Class={items.Class} key={i} />
                    </>
                  )}
                </div>
              );
            }
          )
        )}
      </Container>
    </>
  );
}

export default MissingAttandence;
