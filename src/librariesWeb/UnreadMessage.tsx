import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  FormGroup,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router';
import { IUnreadMessages } from "src/interfaces/Student/dashboard";
import { getUnreadMessages } from "src/requests/Dashboard/Dashboard";
import Actions from './Actions';
import Header from './Header';

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
    <Box sx={{ backgroundColor: 'white', pt: 1 }}>
      <Grid container >
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Header Title="Unread Messages" />
          </Grid>
        </Grid>
        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3 }}>
          <Actions IconType="Label" DiplayText={UnreadMessageCount} />
        </Grid>
      </Grid>
      <Box sx={{ height: '252px', overflow: 'auto', mt: 2, }}>
        {loading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress size={40} disableShrink thickness={4} />
          </Stack>
        ) : (
          <>
            {UnreadMessage.length == 0 ?
              "No records found" :
              UnreadMessage.map((item, i) => {
                return (
                  <Grid container key={i}>
                    <Grid item xs={2} onClick={() => { clickMessage(item) }}>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        px={1}
                      > {SenderPhoto.map((image, i) => {
                        if (image.Id === item.SenderUserId) {
                          return (
                            <FormGroup key={i}>
                              <Avatar
                                alt="u"
                                src={`data:image/png;base64,${image.Photo}`}
                              />
                            </FormGroup>
                          );
                        }
                      })}
                      </Box>
                    </Grid><Grid item xs={10}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="h4" pl={0.6}  >{item.UserName}</Typography>
                        </Grid>
                        <Grid container item xs={6}>
                          <AccessTimeIcon sx={{ mr: '10px', color: '#64b5f6' }} fontSize="small" />
                          <Typography>{item.Date}</Typography> 
                        </Grid>
                      </Grid>
                      <Tooltip title={item.Subject} >
                        <Typography
                          variant="body2"
                          px={1}
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'normal',
                            textOverflow: 'ellipsis',
                            maxHeight: '6.25rem',
                            // lineHeight: '1.25rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            position: 'relative',
                            color:'#38548A'
                          }}
                        >{item.Subject}</Typography>
                      </Tooltip>
                    </Grid><Grid item xs={9}>
                      <Divider variant="middle" sx={{ m: '5px' }} />
                    </Grid>
                  </Grid>
                )
              })
            }
          </>
        )}
      </Box>
      <Grid container py={1.5} >
        <Grid item xs={7} textAlign={'right'} onClick={() => { navigate('/extended-sidebar/MessageCenter/msgCenter') }}>
          <Typography variant="h4"> <b>See all messages</b></Typography>
        </Grid>
        <Grid item xs={5}>
          <ArrowCircleRightIcon />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UnreadMessage