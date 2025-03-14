import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ITimetable from 'src/interfaces/Student/TimeTable';
import Card30 from 'src/libraries/card/Card30';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getTimetable } from 'src/requests/Student/Timetable';
import { RootState } from 'src/store';

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
    localStorage.setItem('url', window.location.pathname);
    dispatch(getTimetable(body));
  }, []);

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Timetable'} subheading={''} />

      <Card30 header={TimetableList}></Card30>
    </Box>
  );
}

export default Timetable;
