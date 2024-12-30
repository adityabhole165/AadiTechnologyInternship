// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import {
//   Avatar,
//   Box,
//   CircularProgress,
//   Divider,
//   FormGroup,
//   Grid,
//   Stack,
//   Tooltip,
//   Typography
// } from '@mui/material';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'src/store';

// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import { useNavigate } from 'react-router';
// import { IUnreadMessages } from "src/interfaces/Student/dashboard";
// import { getUnreadMessages } from "src/requests/Dashboard/Dashboard";
// import Actions from './Actions';
// import Header from './Header';

// const UnreadMessage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const UnreadMessage = useSelector((state: RootState) => state.Dashboard.UnreadMessage);
//   console.log(UnreadMessage, 'UnreadMessage')
//   const UnreadMessageCount = useSelector((state: RootState) => state.Dashboard.UnreadMessageCount);
//   const SenderPhoto = useSelector((state: RootState) => state.Dashboard.SenderPhoto);
//   const loading = useSelector((state: RootState) => state.Dashboard.Loading);

//   const asSchoolId = Number(localStorage.getItem('localSchoolId'));
//   const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
//   const asUserId = Number(localStorage.getItem('UserId'));
//   const asRoleId = Number(sessionStorage.getItem('RoleId'));

//   const UnreadMessagesBody: IUnreadMessages = {
//     aiSchoolId: asSchoolId,
//     aiAcademicYrId: asAcademicYearId,
//     aiReceiverId: asUserId,
//     aiReceiverRoleId: asRoleId,
//   };

//   useEffect(() => {
//     dispatch(getUnreadMessages(UnreadMessagesBody));
//   }, []);

//   const clickRefresh = () => {
//     dispatch(getUnreadMessages(UnreadMessagesBody));
//   };

//   const clickMessage = (item) => {
//     navigate('/RITeSchool/MessageCenter/viewMSg/' + item.MessageDetailsId + '/Inbox');
//   };

//   return (
//     <Box sx={{ backgroundColor: 'white', pt: 1 }}>
//       <Grid container>
//         <Grid item xs={6}>
//           <Grid item xs={12} pl={0.5}>
//             <Header Title="Unread Messages" />
//           </Grid>
//         </Grid>
//         <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//           <Actions IconType="Label" DiplayText={UnreadMessageCount} />
//         </Grid>
//       </Grid>
//       <Box sx={{ height: '262px', overflow: 'auto', mt: 2 }}>
//         {loading ? (
//           <Stack justifyContent="center" alignItems="center">
//             <CircularProgress size={40} disableShrink thickness={4} />
//           </Stack>
//         ) : (
//           <>
//             {UnreadMessage.length === 0
//               ? <Grid item xs={12}>
//                 <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
//                   <b>No record found.</b>
//                 </Typography>
//               </Grid>
//               : UnreadMessage.map((item, i) => (
//                 <Grid container key={i} onClick={() => clickMessage(item)} sx={{ cursor: 'pointer' }}>
//                   <Grid item xs={2}>
//                     <Box display={'flex'} justifyContent={'space-between'} px={1}>
//                       {SenderPhoto.map((image, i) => {
//                         if (image.Id === item.SenderUserId) {
//                           return (
//                             <FormGroup key={i}>
//                               <Avatar alt="u" src={`data:image/png;base64,${image.Photo}`} />
//                             </FormGroup>
//                           );
//                         }
//                       })}
//                     </Box>
//                   </Grid>
//                   <Grid item xs={10}>
//                     <Grid container>
//                       <Grid item xs={6}>
//                         <Typography variant="h4" pl={0.6}>
//                           {item.UserName}
//                         </Typography>
//                       </Grid>
//                       <Grid container item xs={6}>
//                         <AccessTimeIcon sx={{ mr: '10px', color: '#64b5f6' }} fontSize="small" />
//                         <Typography>{item.Date}</Typography>
//                       </Grid>
//                     </Grid>
//                     <Tooltip title={item.Subject}>
//                       <Typography
//                         variant="body2"
//                         px={1}
//                         sx={{
//                           overflow: 'hidden',
//                           whiteSpace: 'normal',
//                           textOverflow: 'ellipsis',
//                           maxHeight: '6.25rem',
//                           lineHeight: '1.25rem',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 1,
//                           WebkitBoxOrient: 'vertical',
//                           position: 'relative',
//                           color: '#38548A'
//                         }}
//                       >
//                         {item.Subject}
//                       </Typography>
//                     </Tooltip>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider variant="middle" sx={{ m: '5px' }} />
//                   </Grid>
//                 </Grid>
//               ))}
//           </>
//         )}
//       </Box>
//       <Grid container py={1.5}>
//         <Grid item xs={7} textAlign={'right'} onClick={() => navigate('/RITeSchool/MessageCenter/msgCenter')}>
//           <Typography variant="h4">
//             <b>See all messages</b>
//           </Typography>
//         </Grid>
//         <Grid item xs={5} onClick={() => navigate('/RITeSchool/MessageCenter/msgCenter')}>
//           <ArrowCircleRightIcon />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UnreadMessage;

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  FormGroup,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IUnreadMessages } from 'src/interfaces/Student/dashboard';
import { getUnreadMessages } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import Actions from './Actions';
import Header from './Header';
import { encodeURL } from 'src/components/Common/Util';
import { grey } from '@mui/material/colors';

const UnreadMessage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const UnreadMessage = useSelector(
    (state: RootState) => state.Dashboard.UnreadMessage
  );
  const UnreadMessageCount = useSelector(
    (state: RootState) => state.Dashboard.UnreadMessageCount
  );
  const SenderPhoto = useSelector(
    (state: RootState) => state.Dashboard.SenderPhoto
  );
  const loading = useSelector((state: RootState) => state.Dashboard.Loading);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asRoleId = Number(sessionStorage.getItem('RoleId'));

  const UnreadMessagesBody: IUnreadMessages = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiReceiverId: asUserId,
    aiReceiverRoleId: asRoleId
  };

  useEffect(() => {
    dispatch(getUnreadMessages(UnreadMessagesBody));
  }, []);

  const clickRefresh = () => {
    dispatch(getUnreadMessages(UnreadMessagesBody));
  };

  const clickMessage = (item) => {
    navigate(
      '/RITeSchool/MessageCenter/viewMSg/' +
        encodeURL(item.MessageDetailsId) +
        '/Inbox'
    );
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '382px', lg: '382px' }, // Adjust height for different screen sizes
        backgroundColor: 'white',
        pt: 1
      }}
    >
      {/* Header Section */}
      <Grid container spacing={2}>
        <Grid
          item
          xs={8} sm={6} md={10} lg={6}
        >
          <Header Title="Unread Messages" />
        </Grid>
        <Grid
          item
          xs={2} sm={5} md={2} lg={6}
          container
          justifyContent="flex-end"
          sx={{ ml: { xs: 2, md: 0 } }} // Add top margin for small devices
        >
          <Actions IconType="Label" DiplayText={UnreadMessageCount} />
        </Grid>
      </Grid>

      {/* Message List Section */}
      <Box
        sx={{
          overflow: 'auto',
          mt: 2,
          height: { xs: '240px', md: '382px' },
          maxWidth: '100%'
        }}
      >
        {loading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress size={40} disableShrink thickness={4} />
          </Stack>
        ) : (
          <>
            {UnreadMessage.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                  <b>No record found.</b>
                </Typography>
              </Grid>
            ) : (
              UnreadMessage.map((item, i) => (
                <Grid
                  container
                  key={i}
                  onClick={() => clickMessage(item)}
                  sx={{ cursor: 'pointer', px: 1 }}
                >
                  {/* Sender Photo */}
                  <Grid item xs={2} sm={2}>
                    <Box display="flex" justifyContent="center">
                      {SenderPhoto.map((image, i) =>
                        image.Id === item.SenderUserId ? (
                          <Avatar
                            key={i}
                            alt="Sender"
                            src={`data:image/png;base64,${image.Photo}`}
                            sx={{
                              backgroundColor: grey[700],
                              width: 40,
                              height: 40,
                              '& img': { objectFit: 'contain' }
                            }}
                            // variant='circular'
                          />
                        ) : null
                      )}
                    </Box>
                  </Grid>

                  {/* Message Details */}
                  <Grid item xs={10} sm={10}>
                    <Grid container>
                      <Grid item xs={4} sm={4}  md={4}
                        lg={5}>
                        <Typography variant="h6" pl={1}>{item.UserName}</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        lg={7}
                        container
                      >
                        <AccessTimeIcon
                          sx={{ color: '#64b5f6' }}
                          fontSize="small"
                        />
                        <Typography
                          variant="body1"
                          sx={{width:'80%' }}
                        >
                          {item.Date}
                        </Typography>
                        {/* </Box> */}
                      </Grid>
                    </Grid>
                    <Tooltip title={item.Subject}>
                      <Typography
                        variant="body2"
                        px={1}
                        sx={{
                          overflow: 'hidden',
                          whiteSpace: 'normal',
                          textOverflow: 'ellipsis',
                          maxHeight: '3rem',
                          lineHeight: '1.25rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          color: '#38548A'
                        }}
                      >
                        {item.Subject}
                      </Typography>
                    </Tooltip>
                  </Grid>

                  {/* Divider */}
                  <Grid item xs={12}>
                    <Divider variant="middle" sx={{ my: 0.5 }} />
                  </Grid>
                </Grid>
              ))
            )}
          </>
        )}
      </Box>

      {/* Footer Section */}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm="auto" container justifyContent="center">
          <Link
            href="/RITeSchool/MessageCenter/msgCenter"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                pr: 1,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              See all messages
            </Typography>
            <ArrowCircleRightIcon />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnreadMessage;
