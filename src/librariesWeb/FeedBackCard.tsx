import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetUserFeedbackBody } from 'src/interfaces/Student/IFeedback';
import { getuserFeedback } from 'src/requests/Feedback/RequestFeedback';
import { RootState } from 'src/store';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Actions from './Actions';
import Header from './Header';

function FeedBackCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const RoleId = sessionStorage.getItem('RoleId');
  const SchoolId = localStorage.getItem('localSchoolId');
  const Feedback: any = useSelector(
    (state: RootState) => state.FeedBack.FeedbackList
  );
  const loading = useSelector((state: RootState) => state.FeedBack.Loading);

  const myRef = useRef(null);
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
  };

  const FeedbackBody: IGetUserFeedbackBody = {
    aiUserRoleId: RoleId,
    aiFeedbackTypeId: 0,
    asFeedBackFor: 'School',
    aiSchoolId: SchoolId,
    sortDirection: 'desc',
    asStartDate: '',
    asEndDate: '',
    sortExpression: '',
    startRowIndex: 0,
    iEndIndex: 10,
    abIsServiceCall: true,
    asDesignationId: '0',
    abIsAccountsCumAdminOfficer: false
  };

  useEffect(() => {
    dispatch(getuserFeedback(FeedbackBody));
  }, []);


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
  const handleRefresh = () => {
    dispatch(getuserFeedback(FeedbackBody));
    setLastRefreshTime(new Date());
  };

  // const clickNav = (value) => {
  //   navigate(`/${location.pathname.split('/')[1]}/Student/AddFeedback`);
  // };
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const ClickFeddback = () => {
    navigate('/extended-sidebar/Student/Feedback');
  };

  const open = Boolean(anchorEl);
  return (
    <Box sx={{ backgroundColor: 'white', p: 1 }} >
      <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
        <Grid item xs={12}>
          <Header Title="Feedback" />
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3 }}>    
          <Actions Icon={RefreshIcon} ClickIcon={handleRefresh}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </Grid>
      </Grid>
      <Box sx={{ height: '320px', overflow: 'auto', mt: 1 }}>
        {loading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress size={40} disableShrink thickness={4} />
          </Stack>
        ) : (
          <>
            {Feedback.length == 0 ? (
              <ErrorMessages Error={'No records found'} />
            ) : (
              <>
                {Feedback.map((item, i) => (

                  <Grid container key={i}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography variant="h4" p={1}  >{item.Header}</Typography>
                        </Grid>
                        <Grid container item xs={4} >
                          <AccessTimeIcon sx={{ mr: '10px', color: '#64b5f6' }} fontSize="small" />
                          <Typography>{item.Text2}</Typography>
                        </Grid>

                        <Grid item xs={12}>

                          <Tooltip title={item.Text3} placement="left-start">
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
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                position: 'relative',
                              }}
                            >
                              {item.Text3}
                            </Typography>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant="middle" sx={{ m: '10px' }} />
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </Box >
  );
}

export default FeedBackCard;
