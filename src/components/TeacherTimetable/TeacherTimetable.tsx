import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getTimetable,
  getAdditional
} from 'src/requests/Teacher/TMtimetable';
import ITimetable from 'src/interfaces/Student/TimeTable';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import IWdays, {
  GetWdaysResult,
  ItimeTable,
  GettimeTable
} from 'src/interfaces/Student/Tmtimetable';
import Accordion7 from 'src/libraries/accordion/accordion7';
import ControlledAccordions from 'src/libraries/accordion/accordion';
import Card30 from 'src/libraries/card/Card30';
import { Container } from '@mui/material';
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
    <Container>
      <PageHeader heading={'Timetable'} subheading={''} />
      <Card30 header={TMTimetable}></Card30>

      </Container>
    </>
  );
}

export default TeacherTimetable;
