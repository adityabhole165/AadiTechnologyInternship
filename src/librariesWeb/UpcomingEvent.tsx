import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Divider, Grid, Link, Tooltip, Typography } from '@mui/material';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import { getUpcomingEventDashdata } from 'src/requests/UpcomingEventDash/ReqUpcomingEventDash';
import { RootState } from 'src/store';
import Actions from './Actions';
import Header from './Header';

function UpcomingEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asUserRoleId = Number(sessionStorage.getItem('RoleId'));

  const UpcomingEventDash = useSelector((state: RootState) => state.UpcomingEventDash.UpcomingEventData);

  const UpcomingEventDashBody: IUpcomingEventDashBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserId: asUserId,
    aiUserRoleId: asUserRoleId,
    isScreenFullAccess: true
  };

  useEffect(() => {
    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
  }, []);



  const handleEventTypeClick = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const filteredEvents = UpcomingEventDash.filter(event =>
    selectedEventType === '' || event.Text6 === selectedEventType
  );

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  const getTimeDifference = () => {
    if (!lastRefreshTime) return 'no';

    const now = new Date();
    const seconds = differenceInSeconds(now, lastRefreshTime);
    if (seconds < 60) {
      return `${seconds} second(s)`;
    }

    const minutes = differenceInMinutes(now, lastRefreshTime);
    if (minutes < 60) {
      return `${minutes} minute(s)`;
    }

    const hours = differenceInHours(now, lastRefreshTime);
    return `${hours} hour(s)`;
  };

  const updateCountdown = () => {
    setCountdown(getTimeDifference());
  };

  useEffect(() => {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastRefreshTime]);
  const handleRefresh = () => {
    dispatch(getUpcomingEventDashdata(UpcomingEventDashBody));
    setSelectedEventType('');
    setLastRefreshTime(new Date());
  };
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateCountdown, 1000);
  };
  const getButtonColor = (eventType: string) => {
    switch (eventType) {
      case 'Event': return '#4d79ff';
      case 'Holiday': return ' #ff4d4d';
      case 'Exam': return ' #33ff77';
      default: return '#F0F0F0';
    }
  };

  return (
    <Box sx={{ height: '382px', width: 'auto', backgroundColor: 'white', p: 1, }}>
      <Grid container >
        <Grid item xs={6}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Header Title="Upcoming Event" />
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3.5 }}>
          <Actions Icon={RefreshIcon} ClickIcon={handleRefresh}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {['Event', 'Holiday', 'Exam'].map((eventType) => (
            <Grid item xs={4} key={eventType}>
              <Button
                sx={{
                  backgroundColor: selectedEventType === eventType ? '#F0F0F0' : getButtonColor(eventType),
                  color: selectedEventType === eventType ? `${getButtonColor(eventType)}` : '#F0F0F0', height: '3rem', width: '100%',
                }}
                onClick={() => handleEventTypeClick(eventType)}>
                <b>{eventType}</b>
              </Button>
            </Grid>
          ))}
        </Grid></Grid>
      <Box sx={{ height: {xs:'180px', sm:'180px', md:'150px', lg:'180px'} , mt: 2, overflow: 'auto' }}>
        {filteredEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={12} >
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h4" p={1} sx={{ color: `${getButtonColor(event.Text6)}` }} >{event.Text3}</Typography>
              </Grid>
              <Grid item xs={4} pt={0.5} >
                {/* <AccessTimeIcon sx={{ mr: '10px', color: '#64b5f6' }} fontSize="small" /> */}
                <Typography>
                  {/* {event.Text1.length > 4 ? event.Text1.slice(0, -5) + '' : event.Text1} to  {event.Text2.length > 4 ? event.Text2.slice(0, -5) + '' : event.Text2} */}
                  <Typography sx={{ mt: 0.5, ml: 2 }}>
                    {event.Text1.length > 4 ? event.Text1.slice(0, -5) + '' : event.Text1}
                    {event.Text1 !== event.Text2 && ` to ${event.Text2.length > 4 ? event.Text2.slice(0, -5) + '' : event.Text2}`}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Tooltip title={event.Text4} >
                  <Typography
                    variant="body2"
                    px={1}
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                      textOverflow: 'ellipsis',
                      maxHeight: '6.25rem',
                      lineHeight: '1.25rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      position: 'relative',
                    }}
                  >
                    {event.Text4}
                  </Typography>
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                <Divider variant="middle" sx={{ m: '0px' }} />
              </Grid>
            </Grid>
          </Grid>
        ))}


        {
          filteredEvents.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                <b>No record found for the selected type.</b>
              </Typography>
            </Grid>
          )
        }
      </Box>
      <Grid
      container
      alignItems="center"
      justifyContent="center" 
    >
      <Grid item xs={12} sm={8} md={8} lg={6} pl={6} sx={{pl:{xs:24, sm:6, md:6, lg:6} }} textAlign={'center'}>
        <Link
          href="/RITeSchool/Common/AnnualPlanner"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none',  }}
        >
          <Typography variant="h4"  textAlign={'center'}>
            <b>See all events</b>
          </Typography>
          <ArrowCircleRightIcon />
        </Link>
      </Grid>
      <Grid item xs={12} textAlign={'center'} >
        <Typography variant="h4" > <b>Please re-login or refresh the widget to see the updates.</b></Typography>
      </Grid>
      </Grid>
    </Box>
  );
}

export default UpcomingEvent;
