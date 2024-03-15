import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ITimetable from 'src/interfaces/Student/TimeTable';
import IWdays, {
  GettimeTable,
  ItimeTable
} from 'src/interfaces/Student/Tmtimetable';
import CardTimetable from 'src/libraries/card/CardTimetable';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getTimetable } from 'src/requests/Teacher/TMtimetable';
import { RootState } from 'src/store';
function TeacherTimetable() {
  const dispatch = useDispatch();
  const weekdaysList = useSelector(
    (state: RootState) => state.TMTimetable.Weekdays
  );
  const TMTimetable = useSelector(
    (state: RootState) => state.TMTimetable.TmTimetable
  );
  const AddLectures = useSelector(
    (state: RootState) => state.TMTimetable.AdditionalLecture
  );
  const [expanded, setExpanded] = useState<boolean>(true);
  const [additional, setAdditional] = useState<GettimeTable>();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivisionId = sessionStorage.getItem('DivisionId');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const tt_body: IWdays = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const t_body: ITimetable = {
    asStandardDivId: '0',
    asTeacherId: asTeacherId,
    asIsTeacher: '1',
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };
  const teacger_body: ItimeTable = {
    asStandardDivId: '0',
    asTeacherId: asTeacherId,
    asIsTeacher: 1,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getTimetable(t_body));
    // dispatch(getAdditional(teacger_body));
  }, []);

  return (
    <>
      <Container maxWidth={'xl'} sx={{ mt: 4 }}>
        <PageHeader heading={'Timetable'} subheading={''} />

        <CardTimetable header={TMTimetable}></CardTimetable>
        {/* <CardTimetable2 header={TMTimetable.filter((item)=>{return item.Name === "Additional Lectures"})}></CardTimetable2> */}
      </Container>
    </>
  );
}

export default TeacherTimetable;
