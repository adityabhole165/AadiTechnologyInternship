import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  getTimetable } from 'src/requests/Student/Timetable';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import ITimetable, {
} from 'src/interfaces/Student/TimeTable';
import Card30 from 'src/libraries/card/Card30';
import { Container } from '@mui/material';

function Timetable() {
  const dispatch = useDispatch();
  const TimetableList = useSelector(
    (state: RootState) => state.Timetable.TimetableData
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');

  const body: ITimetable = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardDivId: asStandardDivisionId,
    asTeacherId: '0',
    asIsTeacher: '0'
  };

  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
    dispatch(getTimetable(body));
  }, []);

  return (
    <Container>
      <PageHeader heading={'Timetable'} subheading={''} />
      
      <Card30 header={{Header:TimetableList}}></Card30>
    </Container>
  );
}

export default Timetable;