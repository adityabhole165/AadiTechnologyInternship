import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getWeekdays, getTimetable } from 'src/requests/Student/Timetable';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import ITimetable, {
  GetWeekDaysResult,
  IWeekdays
} from 'src/interfaces/Student/TimeTable';
import ControlledAccordions from 'src/libraries/accordion/accordion';

function Timetable() {
  const dispatch = useDispatch();
  const weekdaysList = useSelector(
    (state: RootState) => state.Timetable.WeekdaysData
  );
  const TimetableList = useSelector(
    (state: RootState) => state.Timetable.TimetableData
  );
  const [expanded, setExpanded] = useState<boolean>(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const body2: IWeekdays = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getWeekdays(body2));
    dispatch(getTimetable(body));
  }, []);

  return (
    <div>
      <PageHeader heading={'Timetable'} subheading={''} />
      {weekdaysList.map((day: GetWeekDaysResult, i) => (
        <ControlledAccordions
          Days={day.WeekDay}
          Data={TimetableList}
          key={i}
          index={i}
          Collapse={handleChange}
          expand={expanded}
        />
      ))}
    </div>
  );
}

export default Timetable;
