// import { Box, Button, Grid, Typography } from '@mui/material';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
// import MonthSelector from 'src/libraries/DateSelector/MonthSelector';
// import { getUpcomingEventDashdata } from 'src/requests/UpcomingEventDash/ReqUpcomingEventDash';
// import { RootState } from 'src/store';
// import Header from './Header';

// function UpcomingEvent() {
//   const dispatch = useDispatch();

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [assignedYear, setAssignedYear] = useState<any>();
//   const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
//   const [selectedEventType, setSelectedEventType] = useState('');
//   const asSchoolId = Number(localStorage.getItem('localSchoolId'));
//   const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
//   const asUserId = Number(localStorage.getItem('UserId'));
//   const asUserRoleId = Number(sessionStorage.getItem('RoleId'));
//   const UpcomingEventDash = useSelector((state: RootState) => state.UpcomingEventDash.UpcomingEventData)

//   function setCurrentDate(newDate?: Date) {
//     const date = newDate || new Date();
//     const Month = new Date(date).toLocaleString('en-US', { month: 'short' });

//     const Month_num = new Date(date).getMonth();

//     const Year = new Date(date).getFullYear();
//     const NewDateFormat = `${Month} ${Year}`;

//     setAssignedYear(Year);
//     SetassignedMonth_num(Month_num + 1);
//   }

//   const clickEvents = () => {
//     const UpcomingEventDashBody: IUpcomingEventDashBody = {
//       aiSchoolId: asSchoolId,
//       aiAcademicYrId: asAcademicYearId,
//       aiUserId: asUserId,
//       aiUserRoleId: asUserRoleId,
//       isScreenFullAccess: true
//     }
//     dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
//   }


//   const handleEventTypeClick = (eventType: string) => {
//     setSelectedEventType(eventType);
//   };

//   const filteredEvents = UpcomingEventDash.filter(event =>
//     selectedEventType === null || event.type === selectedEventType
//   );
//   const ClickDate = (value) => {
//     setSelectedDate(value)
//   }
//   return (
//     <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
//       <Header Title="Upcoming Event" />
//       <Grid container spacing={1} >
//         <Grid item sm={6} md={12}>
//           <Box
//             justifyContent={'center'}
//             px={4.5}>
//             <MonthSelector
//               DefaultDate={selectedDate}
//               ClickDate={ClickDate} />
//           </Box>
//         </Grid>
//         {/* <Grid container>
//           <Grid xs={4} sx={{
//             backgroundColor: '#4db6ac', color: 'black', height: '3rem'
//           }}>
//             < b > School Event</b>
//           </Grid><Grid xs={4} sx={{ backgroundColor: '#64b5f6', color: 'black' }}>
//             <b> Holiday</b>
//           </Grid><Grid xs={4} sx={{ backgroundColor: 'orange', color: 'black' }}>
//             <b> Exam</b>
//           </Grid>
//         </Grid> */}

//         <Grid container>
//           <Grid item xs={4}>
//             <Button
//               sx={{ backgroundColor: '#4db6ac', color: 'black', height: '3rem', width: '100%' }}
//               onClick={() => handleEventTypeClick('School Event')}
//             >
//               <b>School Event</b>
//             </Button>
//           </Grid>
//           <Grid item xs={4}>
//             <Button
//               sx={{ backgroundColor: '#64b5f6', color: 'black', height: '3rem', width: '100%' }}
//               onClick={() => handleEventTypeClick('Holiday')}
//             >
//               <b>Holiday</b>
//             </Button>
//           </Grid>
//           <Grid item xs={4}>
//             <Button
//               sx={{ backgroundColor: 'orange', color: 'black', height: '3rem', width: '100%' }}
//               onClick={() => handleEventTypeClick('Exam')}
//             >
//               <b>Exam</b>
//             </Button>
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           {filteredEvents.map((event, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
//                 <Typography variant="h6">{event.Text3}</Typography>
//                 <Typography variant="body2" color="textSecondary">{event.Text1}</Typography>
//                 <Typography variant="body2">{event.Text4}</Typography>
//               </Box>
//             </Grid>
//           ))}
//           {filteredEvents.length === 0 && (
//             <Grid item xs={12}>
//               <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
//                 No events found for the selected type.
//               </Typography>
//             </Grid>
//           )}
//         </Grid>
//       </Grid>
//     </Box >
//   );
// }

// export default UpcomingEvent;

import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import MonthSelector from 'src/libraries/DateSelector/MonthSelector';
import { getUpcomingEventDashdata } from 'src/requests/UpcomingEventDash/ReqUpcomingEventDash';
import { RootState } from 'src/store';
import Header from './Header';

function UpcomingEvent() {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState('');
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asUserRoleId = Number(sessionStorage.getItem('RoleId'));

  const UpcomingEventDash = useSelector((state: RootState) => state.UpcomingEventDash.UpcomingEventData);

  // Function to format the date to the required format
  // const formatDate = (date: Date) => {
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1; // Months are 0-based
  //   return { year, month };
  // };

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('en-US', { month: 'short' });

    const Month_num = new Date(date).getMonth();

    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month} ${Year}`;

    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {

    const UpcomingEventDashBody: IUpcomingEventDashBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYrId: asAcademicYearId,
      aiUserId: asUserId,
      aiUserRoleId: asUserRoleId,
      isScreenFullAccess: true
    };

    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
  }, [dispatch, selectedDate, asSchoolId, asAcademicYearId, asUserId, asUserRoleId]);

  const handleEventTypeClick = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const filteredEvents = UpcomingEventDash.filter(event =>
    selectedEventType === '' || event.type === selectedEventType
  );

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  return (
    <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
      <Header Title="Upcoming Event" />
      <Grid container spacing={1}>
        <Grid item sm={6} md={12}>
          <Box justifyContent={'center'} px={4.5}>
            <MonthSelector
              DefaultDate={selectedDate}
              ClickDate={handleDateChange}
            />
          </Box>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Button
              sx={{ backgroundColor: '#4db6ac', color: 'black', height: '3rem', width: '100%' }}
              onClick={() => handleEventTypeClick('School Event')}
            >
              <b>School Event</b>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ backgroundColor: '#64b5f6', color: 'black', height: '3rem', width: '100%' }}
              onClick={() => handleEventTypeClick('Holiday')}
            >
              <b>Holiday</b>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ backgroundColor: 'orange', color: 'black', height: '3rem', width: '100%' }}
              onClick={() => handleEventTypeClick('Exam')}
            >
              <b>Exam</b>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
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
