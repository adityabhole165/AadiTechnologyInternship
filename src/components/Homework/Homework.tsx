import { useState } from 'react';
import Buttons from 'src/libraries/buttons/button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IHomework,
  IHomeworkResponse,
  IHomeworkSubject
} from 'src/interfaces/Student/Homework';
import {
  getHomework,
  getHomeworkSubject
} from 'src/requests/Homework/Homework';
import { RootState } from 'src/store';
import Accordion2 from 'src/libraries/accordion/accordion2';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import { styled } from '@mui/material';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';


function Homework() {
  const dispatch = useDispatch();
  const HomeworkList = useSelector(
    (state: RootState) => state.Homework.HomeworkData
  );
  const HomeworkSubjectList = useSelector(
    (state: RootState) => state.Homework.HomeworkSubjectData
  );
  const loading = useSelector((state: RootState) => state.Homework.Loading);

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedDate, setAssignedDate] = useState<string>();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [calanderSelected,setcalanderSelected] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [CalanderDate,setCalanderDate] = useState("");
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const Id = sessionStorage.getItem('Id');

  const homework_Body: IHomework = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate }` ,
    asLoginUserId: Id
  };

  const homeworkSubject_Body: IHomeworkSubject = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate }` ,
    asLoginUserId: Id
  };

  const getCurrentDate = (newDate?: Date) => {
    const date = `${calanderSelected ? CalanderDate :  newDate || new Date() }` ;
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });
    setAssignedDate(NewDateFormat);
    setcalanderSelected(false);
  };

  const getPreviousDate = () => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).valueOf();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const prev = new Date(previousDayInMilli);
    getCurrentDate(prev);
    setExpanded(false);
    setLoading(true);
    setcalanderSelected(false);
  };

  const getNextDate = () => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const next = new Date(nextDayInMilli);
    getCurrentDate(next);
    setExpanded(false);
  };

  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
    getCurrentDate();
  }, []);

  useEffect(() => {
    dispatch(getHomework(homework_Body));
    dispatch(getHomeworkSubject(homeworkSubject_Body));
  }, [assignedDate,CalanderDate]);

  const DotLegend = styled('span')(
    ({ theme }) => `
        border-radius: 10px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
    `
  );

  const CalenderDateHandler = (e) => {
    const date = new Date(e);
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setCalanderDate(NewDateFormat);
    setcalanderSelected(true);
  }


  return (
    <>
      <PageHeader heading={'Homework'} subheading={''} />
      <div>
        <DotLegend
          sx={{
            backgroundColor: '#DA70D6',
            marginLeft: '1.5rem',
            marginBottom: '-2px',
            border: '1px black solid'
          }}
        />
        <small>
          <b> Completed By Date </b>
        </small>
      </div>{' '}
      <br />
      <Buttons
        date={`${calanderSelected ?  CalanderDate : date.selectedDate }`}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={CalenderDateHandler}
      />
      {loading ? (
        <SuspenseLoader />
      ) : HomeworkSubjectList.length === 0 ? (
        <ErrorMessages Error={'Homework is not available'} />
      ) : (
        HomeworkSubjectList.map((item: IHomeworkResponse, i) => (
          <>
            <Accordion2
              subject={item.SubjectName}
              Data={HomeworkList}
              Close={handleChange}
              index={i}
              expand={expanded}
            />
          </>
        ))
      )}
    </>
  );
}

export default Homework;
