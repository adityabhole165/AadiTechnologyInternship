import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
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
  const RoleId = sessionStorage.getItem('RoleId');
  const SchoolId = localStorage.getItem('localSchoolId');
  const Feedback: any = useSelector(
    (state: RootState) => state.FeedBack.FeedbackList
  );
  const loading = useSelector((state: RootState) => state.FeedBack.Loading);

  const myRef = useRef(null);

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

  const clickRefresh = () => {
    dispatch(getuserFeedback(FeedbackBody));
  };

  const clickNav = (value) => {
    navigate(`/${location.pathname.split('/')[1]}/Student/AddFeedback`);
  };
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
    <Card sx={{ height: '370px', overflow: 'auto' }}>
      <Grid container sx={{ mb: '5px' }}>
        <Grid item xs={6}>
          <Typography variant="h3" p={1} sx={{ color: '#304ffe' }}>
            Feedback
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <RefreshIcon
              sx={{ mr: '1px', mt: '10px' }}
              onClick={clickRefresh}
            />
            <Avatar
              sx={{ height: '20px', width: '20px', mt: '13px', mr: '10px' }}
              src={'/imges/arrow.png'}
              onClick={ClickFeddback}
            />
          </Box>
        </Grid>
      </Grid>
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
                    <Grid container>
                      <Grid item xs={0.5}>
                        <AccessTimeIcon
                          sx={{ ml: '10px', color: '#64b5f6' }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={11.5}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          px={3}
                        >
                          <Typography variant="h5">{item.Header}</Typography>
                          <Typography variant="body2">{item.Text2}</Typography>
                        </Box>
                        <Tooltip title={item.Text3} placement="left-start">
                          <Typography
                            variant="body2"
                            px={3}
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              width: '300px'
                            }}
                          >
                            {item.Text3}
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
    </Card>
  );
}

export default FeedBackCard;
