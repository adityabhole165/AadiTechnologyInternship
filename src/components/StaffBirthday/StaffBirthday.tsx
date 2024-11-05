import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { IstaffBirthday } from 'src/interfaces/Student/dashboard';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import List17 from 'src/libraries/list/list17';
import { CardDetail7 } from 'src/libraries/styled/CardStyle';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { getstaffBirthday } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

function StaffBirthday() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const staffBirthdayList = useSelector(
    (state: RootState) => state.Dashboard.staffBirthdayData
  );


  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const [date, setDate] = useState({ selectedDate: '' });
  const [assignedYear, setAssignedYear] = useState<number>();

  const [assignedMonth, setAssignedMonth] = useState<string>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<number>();
  const Current_Month = new Date().getMonth() + 1;

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'long' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear();
    setAssignedYear(Year)
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
    asAcademicyearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    year: assignedYear
  };

  useEffect(() => {
    dispatch(getstaffBirthday(body));
  }, [assignedMonth]);

  const classes = Styles();

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[{ title: 'Staff Birthdays', path: ' ' },
        ]}

      />
      {assignedMonth_num == Current_Month &&
        <DotLegend1>
          <DotLegendStyled1
            className={classes.border}
            style={{ background: '#e9a69a' }}
          />
          <CardDetail7>Upcoming Birthday</CardDetail7>
          <DotLegendStyled1
            className={classes.border}
            style={{ background: "#C0C0C0", marginLeft: '10px' }}
          />
          <CardDetail7>Past Birthday</CardDetail7>
        </DotLegend1>
      }
      <br />
      <MonthSelector
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />

      {staffBirthdayList.length === 0 ? (
        <ErrorMessages Error={'No birthdays are available'} />
      ) : (
        <>
          {staffBirthdayList.map((item, i) => (
            <List17 Name={item.Name} BirthDate={item.BirthDate} Designation={item.Designation} EmailAddress={item.EmailAddress} MobileNumber={item.MobileNumber} IsHighlight={item.IsHighlight} key={i} />
          ))}
        </>
      )}
    </Box>
  );
}

export default StaffBirthday;
