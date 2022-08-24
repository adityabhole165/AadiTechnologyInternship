import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getWeekday,
  getTimetable,
  getAdditional
} from 'src/requests/TMtimetable/TMtimetable';
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

  console.log('asStandardDivisionId', asStandardDivisionId);

  const tt_body: IWdays = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const t_body: ItimeTable = {
    asStandardDivId: '0',
    asTeacherId: asTeacherId,
    asIsTeacher: 1,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getWeekday(tt_body));
    dispatch(getTimetable(t_body));
    dispatch(getAdditional(t_body));
  }, []);

  return (
    <>
      <PageHeader heading={'Timetable'} subheading={''} />
      {weekdaysList.map((day: GetWdaysResult, i) => (
        <ControlledAccordions
          Days={day.WeekDay}
          Data={TMTimetable}
          key={i}
          index={i}
          Collapse={handleChange}
          expand={expanded}
        />
      ))}
      <Accordion7
        Data={TMTimetable}
        Days={weekdaysList}
        additional={additional}
        AddLectures={AddLectures}
      />
    </>
  );
}

export default TeacherTimetable;
