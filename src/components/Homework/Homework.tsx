import { useState } from 'react';
import Buttons from 'src/libraries/buttons/button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IHomework,
  IHomeworkSubject
} from 'src/interfaces/Student/Homework';
import {
  getHomeworkSubject
} from 'src/requests/Homework/Homework';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container, styled } from '@mui/material';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';
import Card30 from 'src/libraries/card/Card30';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

import DateSelector from 'src/libraries/buttons/DateSelector';
import { getDateFormatted } from '../Common/Util'

function Homework() {
  const dispatch = useDispatch();

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedDate, setAssignedDate] = useState<string>();
  const [calanderSelected, setcalanderSelected] = useState(false);
  const [CalanderDate, setCalanderDate] = useState("");
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const Id = sessionStorage.getItem('Id');

  const HomeworkSubjectList = useSelector(
    (state: RootState) => state.Homework.HomeworkSubjectData
  );
  const loading = useSelector(
    (state: RootState) => state.Homework.Loading);



  const homework_Body: IHomework = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate}`,
    asLoginUserId: Id
  };

  const homeworkSubject_Body: IHomeworkSubject = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate}`,
    asLoginUserId: Id
  };

  const getCurrentDate1 = (newDate?: Date) => {
    const date = `${calanderSelected ? CalanderDate : newDate || new Date()}`;
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

  const getCurrentDate = (newDate?: Date) => {
    setAssignedDate(getDateFormatted(newDate));
    setcalanderSelected(false);
  };


  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    getCurrentDate();
  }, []);

  useEffect(() => {

    if (homeworkSubject_Body.asDate != "undefined")
      dispatch(getHomeworkSubject(homeworkSubject_Body));
  }, [assignedDate, CalanderDate]);

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

  const getNextDate = (dayMultiple) => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay * dayMultiple;
    const next = new Date(nextDayInMilli);
    getCurrentDate(next);
  };


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
      <Container>
        <PageHeader heading={'Homework'} subheading={''} />
        <div>
          <DotLegend
            sx={{
              backgroundColor: '#DA70D6',
              marginBottom: '-2px',
              border: '1px black solid'
            }}
          />
          <small>
            <b> Completed By Date </b>
          </small>
        </div>{' '}
        <br />
        <DateSelector date={assignedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>

        <br />
        {/* <Buttons
        date={`${calanderSelected ? CalanderDate : date.selectedDate}`}
        PrevDate={getNextDate}
        NextDate={getNextDate}
        Close={CalenderDateHandler}
      /> */}
        {loading ? (
          <SuspenseLoader />
        ) : HomeworkSubjectList.length === 0 ? (
          <ErrorMessages Error={'Homework is not available'} />
        ) : (


          <Card30 header={HomeworkSubjectList} />

        )}
      </Container>
    </>
  );
}

export default Homework;
