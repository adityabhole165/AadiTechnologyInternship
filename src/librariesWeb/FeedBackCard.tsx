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

function FeedBackCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
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
      <Grid container sx={{ backgroundColor: '#38548A', borderRadius: '10px' }}>
        <Grid item xs={6}>
          <Typography variant="h3" p={1} sx={{ color: 'white' }}>
            Feedback
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip
              title={`You are viewing ${countdown} old data, click here to see the latest data.`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <IconButton onClick={handleRefresh}>
                <RefreshIcon sx={{ mt: '8px', color: 'white', }} />
              </IconButton>
            </Tooltip>
            {/* <Avatar
              sx={{ height: '20px', width: '20px', mt: '13px', mr: '10px' }}
              src={'/imges/arrow.png'}
              onClick={ClickFeddback}
            /> */}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ height: '400px', overflow: 'auto', mt: 2 }}>
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
                  <div key={i}>
                    <Box key={i}>
                      <Grid >
                        <Grid item xs={12}>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            px={3}
                          >
                            <Typography variant="h3" p={0.5}  >{item.Header}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }} px={3}>
                            <AccessTimeIcon
                              sx={{ mr: '5px', color: '#64b5f6' }}
                              fontSize="small"
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: '300px',
                              }}
                            >
                              {item.Text2}
                            </Typography>
                          </Box>

                          <Tooltip title={item.Text3} placement="left-start">
                            <Typography
                              variant="body2"
                              px={3}
                              sx={{
                                overflow: 'hidden',
                                whiteSpace: 'normal',
                                textOverflow: 'ellipsis',
                                maxHeight: '6.25rem',
                                lineHeight: '1.25rem',
                                display: '-webkit-box',
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: 'vertical',
                                position: 'relative',
                              }}
                            >
                              "{item.Text3}"
                            </Typography>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Divider variant="middle" sx={{ m: '5px' }} />
                    </Box>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default FeedBackCard;
