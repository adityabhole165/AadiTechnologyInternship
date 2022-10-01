import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getstaffBirthday } from 'src/requests/StaffBirthday/StaffBirthday';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Container, styled, useTheme } from '@mui/material';
import IstaffBirthday, {
  GetstaffBirthdayList
} from 'src/interfaces/Common/StaffBirthday';
import PageHeader from 'src/libraries/heading/PageHeader';
import List17 from 'src/libraries/list/list17';
import Buttons from 'src/libraries/buttons/button';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

function StaffBirthday() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const staffBirthdayList = useSelector(
    (state: RootState) => state.staffBirthday.staffBirthdayData
  );

  const [date, setDate] = useState({ selectedDate: '' });
  const [assignedYear, setAssignedYear] = useState<number>();

  const [assignedMonth, setAssignedMonth] = useState<string>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<number>();

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'long' });
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

  const body: IstaffBirthday = {
    asMonth: assignedMonth_num,
    asAcademicyearId: '9',
    asSchoolId: '120'
  };

  const DotLegend = styled('span')(
    ({ theme }) => `
      border-radius: 22px;
      width: ${theme.spacing(1.5)};
      height: ${theme.spacing(1.5)};
      display: inline-block;
      margin-right: ${theme.spacing(1)};
      margin-top: -${theme.spacing(0.1)};
  `
  );
  useEffect(() => {
    dispatch(getstaffBirthday(body));
  }, [assignedMonth]);

  const classes = Styles();
  console.log('staffBirthdayList', staffBirthdayList);

  return (
    <>
      <PageHeader heading={'Staff Birthdays'} subheading={''} />
      <DotLegend
        className={classes.border}
        style={{
          background: '#e9a69a',
          marginLeft: '1.5rem',
          marginBottom: '-2px'
        }}
      />
      <small>
        <b> Upcoming Birthday </b>
      </small>
      <br />
      <br />
<Buttons
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />

     
      {staffBirthdayList.length === 0 ? (
        <ErrorMessages Error={'No birthdays are available'} />
      ) : (
        <>
          {staffBirthdayList.map((item: GetstaffBirthdayList, i) => (
            <List17 Name={item.Name} BirthDate={item.BirthDate} key={i} />
          ))}
        </>
      )}
    </>
  );
}

export default StaffBirthday;
