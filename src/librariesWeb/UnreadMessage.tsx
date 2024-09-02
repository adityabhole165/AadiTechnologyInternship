import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Divider,
  FormGroup,
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
  const UnreadMessageCount = useSelector((state: RootState) => state.Dashboard.UnreadMessageCount);
  const SenderPhoto = useSelector((state: RootState) => state.Dashboard.SenderPhoto);
  const loading = useSelector((state: RootState) => state.Dashboard.Loading);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asRoleId = Number(sessionStorage.getItem('RoleId'));

  const UnreadMessagesBody: IUnreadMessages = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiReceiverId: asUserId,
    aiReceiverRoleId: asRoleId,
  };
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
    <Box sx={{backgroundColor:'white', p:1}}>
      <Grid container sx={{ backgroundColor:'#38548A',}}>
        <Grid item xs={8}>
          <Typography variant="h3" p={1} sx={{ color: 'white' }}>
            Unread Messages
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ mr: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',      // Circle diameter
                  height: '30px',     // Circle diameter
                  borderRadius: '50%', // Makes the Box a circle
                  backgroundColor: 'white', // Secondary background color
                  color: 'black',      // Text color
                  fontSize: '0.8rem',
                }}
              >
               <b>{UnreadMessageCount}</b> 
              </Box>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ height: '400px', overflow: 'auto', mt:2 }}>
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
                    <Grid item xs={11.5} onClick={() => { clickMessage(item) }}>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        px={3}
                      > {SenderPhoto.map((image, i) => {
                        if (image.Id === item.SenderUserId) {
                          return (
                            <FormGroup>
                              <Avatar
                                alt="u"
                                src={`data:image/png;base64,${image.Photo}`}
                              />
                            </FormGroup>
                          );
                        }
                      })}

                        <Typography variant="h5">{item.UserName}</Typography>
                        <Typography variant="body2">{item.Subject}</Typography>
                      </Box>
                      <Tooltip title={item.Text3} placement="left-start">
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
                            {item.Date}
                          </Typography>
                        </Box>
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
      </Box>
    </Box>
  );
}

export default UnreadMessage