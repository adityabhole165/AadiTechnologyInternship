import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Badge,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { useNavigate } from 'react-router';
import { IUnreadMessages } from "src/interfaces/Student/dashboard";
import { getUnreadMessages } from "src/requests/Dashboard/Dashboard";

const UnreadMessage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UnreadMessage = useSelector((state: RootState) => state.Dashboard.UnreadMessage);
  const loading = useSelector((state: RootState) => state.Dashboard.Loading);
  const UnreadMessagesBody: IUnreadMessages = {
    aiSchoolId: localStorage.getItem('SchoolId'),
    aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
    aiReceiverId: localStorage.getItem('UserId'),
    aiReceiverRoleId: sessionStorage.getItem('RoleId')
  }
  useEffect(() => {

    dispatch(getUnreadMessages(UnreadMessagesBody))
  }, [])
  const clickRefresh = () => {
    dispatch(getUnreadMessages(UnreadMessagesBody))
  };
  const clickMessage = (item) => {
    navigate('/extended-sidebar/MessageCenter/viewMSg/' + item.MessageDetailsId + '/Inbox')
  }
  return (
    <Card sx={{ height: '370px', overflow: 'auto' }}>
      <Grid container sx={{ mb: '5px' }}>
        <Grid item xs={6}>
          <Typography variant="h3" p={1} sx={{ color: '#304ffe' }}>
            Unread Messages
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton sx={{ mt: '20px', mr: '20px' }}>
              <Badge
                badgeContent={UnreadMessage.length !== 0 ? UnreadMessage.length : '0'}
                color="secondary"
              />
            </IconButton>
            {/* <RefreshIcon
              sx={{ mr: '1px', mt: '10px' }}
              onClick={clickRefresh}
            /> */}
            {/* <Avatar
              sx={{ height: '20px', width: '20px', mt: '13px', mr: '10px' }}
              src={'/imges/arrow.png'}
              onClick={ClickFeddback}
            /> */}
          </Box>
        </Grid>
      </Grid>
      {loading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress size={40} disableShrink thickness={4} />
        </Stack>
      ) : (
        <>
          {UnreadMessage.length == 0 ?
            "No records found" :
            UnreadMessage.map((item, i) => {
              return (<div key={i}>
                <Box>
                  <Grid container>
                    <Grid item xs={0.5}>
                      <AccessTimeIcon
                        sx={{ ml: '10px', color: '#64b5f6' }}
                        fontSize="small"
                      />
                    </Grid>
                    <Grid item xs={11.5} onClick={() => { clickMessage(item) }}>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        px={3}
                      >
                        <Typography variant="h5">{item.UserName}</Typography>
                        <Typography variant="body2">{item.Subject}</Typography>
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
                          {item.Date}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" sx={{ m: '5px' }} />
                </Box>

              </div>)
            })
          }
        </>
      )}
      <Grid container>
        <Grid item xs={12} onClick={() => { navigate('/extended-sidebar/MessageCenter/msgCenter') }}>
          See all messages
          <ArrowRightAltIcon />
        </Grid>
      </Grid>
    </Card>
  );
}

export default UnreadMessage