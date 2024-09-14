import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import { getUpcomingEventDashdata } from 'src/requests/UpcomingEventDash/ReqUpcomingEventDash';
import { RootState } from 'src/store';
import Header from './Header';

function UpcomingEvent() {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState('');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asUserRoleId = Number(sessionStorage.getItem('RoleId'));

  const UpcomingEventDash = useSelector((state: RootState) => state.UpcomingEventDash.UpcomingEventData);

  useEffect(() => {
    const UpcomingEventDashBody: IUpcomingEventDashBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYrId: asAcademicYearId,
      aiUserId: asUserId,
      aiUserRoleId: asUserRoleId,
      isScreenFullAccess: true
    };

    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
  }, [dispatch, asSchoolId, asAcademicYearId, asUserId, asUserRoleId]);

  const handleEventTypeClick = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const filteredEvents = UpcomingEventDash.filter(event =>
    selectedEventType === '' || event.Text6 === selectedEventType
  );

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  const getButtonColor = (eventType: string) => {
    switch (eventType) {
      case 'Event': return '#4db6ac';
      case 'Holiday': return '#64b5f6';
      case 'Exam': return 'orange';
      default: return '#F0F0F0';
    }
  };

  return (
    <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
      <Header Title="Upcoming Event" />
      <Grid container spacing={1}>
        {/* <Grid item sm={6} md={12}>
          <Box justifyContent={'center'} px={4.5}>
            <MonthSelector
              DefaultDate={selectedDate}
              ClickDate={handleDateChange}
            />
          </Box>
        </Grid> */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {['Event', 'Holiday', 'Exam'].map((eventType) => (
            <Grid item xs={4} key={eventType}>
              <Button
                sx={{
                  backgroundColor: selectedEventType === eventType ? '#F0F0F0' : getButtonColor(eventType),
                  color: 'black',
                  height: '3rem',
                  width: '100%',
                }}
                onClick={() => handleEventTypeClick(eventType)}
              >
                <b>{eventType}</b>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${getButtonColor(event.Text6)}`,
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <Typography variant="h6">{event.Text3}</Typography>
                <Typography variant="body2" color="textSecondary">{event.Text1}</Typography>
                <Typography variant="body2">{event.Text4}</Typography>
              </Box>
            </Grid>
          ))}
          {filteredEvents.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                No events found for the selected type.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default UpcomingEvent;
