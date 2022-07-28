import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList } from 'src/Client_Api/Common/AnnualPlanner';
import {
  IEventList,
} from 'src/Interface/Common/AnnualPlanner';
import { RootState } from 'src/store';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Buttons from 'src/UI_Library/buttons/button';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';
import moment from 'moment';
import List1 from 'src/UI_Library/mainCard/List1';

function EventOverview() {
  const dispatch = useDispatch();
  const eventList = useSelector(
    (state: RootState) => state.AnnualPlanner.EventList
  );
  const loading = useSelector(
    (state: RootState) => state.AnnualPlanner.Loading
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');

  const location = useLocation();

  const [date, setDate] = useState({ selectedDate: '' });
  const [assignedYear, setAssignedYear] = useState<number>();

  const [assignedMonth, setAssignedMonth] = useState<string>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<number>();

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month}-${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });
    setAssignedYear(Year);
    setAssignedMonth(Month);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {
    setCurrentDate();
  }, []);

  const getPreviousDate = () => {
    const { selectedDate } = date;
    const currentDayInMilli = new Date(selectedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const currentDayInMilli = new Date(selectedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() + 1);
    setCurrentDate(currentDayInMilli);
  };

  const body: IEventList = {
    asMonth: assignedMonth_num,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asYear: assignedYear,
    asUserId: UserId
  };

  const StartDate = new Date(
    moment(sessionStorage.getItem('StartDate')).format('YYYY-MM')
  );
  const EndDate = new Date(
    moment(sessionStorage.getItem('EndDate')).format('YYYY-MM')
  );
  const date1 = new Date(moment(date.selectedDate).format('YYYY-MM'));

  useEffect(() => {
    dispatch(getEventList(body));
  }, [assignedMonth]);

  const Data = eventList.map((item, index) => {
    return {
      id: index,
      header: item.Description,
      text1: 'Standard : ' + item.StandardList,
      text2: item.StartDate,
      linkPath: '/Student/viewevent/' + item.Id
    };
  });

  return (
    <>
      <PageHeader heading={'Events Overview'} subheading={''} />
      <Buttons
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />
      <>
        {StartDate.getTime() <= date1.getTime() &&
        EndDate.getTime() >= date1.getTime() ? (
          <>
            <List1 items={Data}></List1>
          </>
        ) : (
          <ErrorMessages Error={'Outside Academic Year'} />
        )}
      </>
    </>
  );
}

export default EventOverview;
