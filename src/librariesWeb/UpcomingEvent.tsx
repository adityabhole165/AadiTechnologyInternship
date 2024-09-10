import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import MonthSelector from 'src/libraries/DateSelector/MonthSelector';
import Header from './Header';
function UpcomingEvent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('en-US', { month: 'short' });

    const Month_num = new Date(date).getMonth();

    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month} ${Year}`;

    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }
  const ClickDate = (value) => {
    setSelectedDate(value)
  }
  return (
    <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
      <Header Title="Upcoming Event" />
      <Grid container spacing={1} >
        <Grid item sm={6} md={12}>
          <Box
            justifyContent={'center'}
            px={4.5}>
            <MonthSelector
              DefaultDate={selectedDate}
              ClickDate={ClickDate} />
          </Box>
        </Grid>
        <Grid container>
          <Grid xs={4} sx={{
            backgroundColor: '#4db6ac', color: 'black', height: '3rem'
          }}>
            < b > School Event</b>
          </Grid><Grid xs={4} sx={{ backgroundColor: '#64b5f6', color: 'black' }}>
            <b> Holiday</b>
          </Grid><Grid xs={4} sx={{ backgroundColor: 'orange', color: 'black' }}>
            <b> Exam</b>
          </Grid>
        </Grid>
      </Grid >
    </Box >
  );
}

export default UpcomingEvent;
