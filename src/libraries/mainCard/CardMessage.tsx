import { Email } from '@mui/icons-material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DraftsIcon from '@mui/icons-material/Drafts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReadReceiptDetail } from 'src/requests/MessageCenter/MessaageCenter';
import { RootState } from 'src/store';
import Card15 from './Card15';

function CardMessage({
  header,
  text1,
  text2,
  text3,
  DetailsId,
  ActiveTab,
  IsRead,
  IsSchedule,
  IsAttachmentExist,
  HasReadReceipt,
  RequestReadReceipt,
  NavPath
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [popup, setPopup] = useState(false);
  const [clickParent, setClickParent] = useState(true);

  const ReadReceipt = useSelector(
    (state: RootState) => state.MessageCenter.ReadReceiptDetails
  );

  const ReadReceipts = {
    aiSchoolId: SchoolId,
    aiAcademicYearId: AcademicYearId,
    aiMessageDetailId: DetailsId
  };
  const handleClickToOpen = (e) => {
    e.stopPropagation();
    setPopup(true);
    dispatch(ReadReceiptDetail(ReadReceipts));
    setClickParent(false);
  };
  const handleClose = (value) => {
    setPopup(false)
  }
  const clickNav = () => {
    if (clickParent) {
      navigate(
        '/' +
        location.pathname.split('/')[1] +
        '/MessageCenter/viewMSg/' +
        NavPath
      );
    }
    setClickParent(true);
  };
  let IsReadColor =
    ((ActiveTab == 'Inbox' || ActiveTab == 'Trash') && IsRead == 'N')
      ? 'blue'
      : ActiveTab == 'Sent' && IsSchedule
        ? 'blue'
        : '';
  return (
    <>
      <Box px={2}>
        <Grid container alignItems="center" spacing={2} onClick={clickNav}>
          {/* Header */}
          <Grid item xs={6} sm={4} md={3} lg={3}>
            <Typography
              variant="h6"
              sx={{
                color: IsReadColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                maxWidth:'180px'
              }}
            >
              {header}
            </Typography>
          </Grid>

          {/* Attachment (Mobile View) */}
          <Grid item xs={2} sm={2} lg={1} display={{ xs: 'block', sm: 'none' }}>
            {IsAttachmentExist && <AttachmentIcon fontSize="small" />}
          </Grid>

          {/* Text1 */}
          <Grid item xs={6} sm={4} md={2} lg={2.5}  >
            <Typography
              variant="body1"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                ml:6
              }}
            >
              {text1}
            </Typography>
          </Grid>

          {/* Text3 */}
          <Grid item xs={6} sm={3} md={2} lg={2} ml={ActiveTab == 'Trash' ? 8:''}>
            <Typography
              variant="body1"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
              }}
            >
              {text3}
            </Typography>
          </Grid>

          {/* Attachment (Web View) */}
          {ActiveTab === 'Inbox' && (
            <Grid item xs={6} sm={2} md={2} lg={1} >
              {IsAttachmentExist ? (
                <IconButton sx={{textAlign:'center',ml:-6}}>
                  <AttachmentIcon fontSize="small" />
                </IconButton>
              ) : (
                <Typography ml={-4.5}>-</Typography>
              )}
            </Grid>
          )}

          {/* Read Receipt */}
          <Grid item xs={6} sm={4} md={2} lg={2}>
            {RequestReadReceipt === 'True' && HasReadReceipt ? (
              <>
                <Tooltip title="View">
                  <IconButton
                    sx={{
                     
                      color: '#38548A',
                      '&:hover': {
                        color: 'green',
                        backgroundColor: green[100],
                      },
                    }}
                    onClick={(e) => handleClickToOpen(e)}
                  >
                    <DraftsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={popup}
                  maxWidth="md"
                  onClose={() => setPopup(false)}
                  PaperProps={{ sx: { borderRadius: '15px' } }}
                >
                  <DialogTitle
                    sx={{ bgcolor: '#223354', color: (theme) => theme.palette.common.white }}
                  >
                    <ClearIcon
                      onClick={handleClose}
                      sx={{
                        color: 'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '5px',
                        right: '7px',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                    />
                  </DialogTitle>
                  <DialogContent>
                    <Box
                      sx={{
                        maxHeight: '300px',
                        position: 'relative',
                        background: 'white',
                      }}
                    >
                      {ReadReceipt.map((item, i) => (
                        <div key={i}>
                          <Card15 text1={item.ReadingDateTime} text2={item.UserName} />
                        </div>
                      ))}
                    </Box>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              RequestReadReceipt === 'True' && (
                <Tooltip title="Requested">
                  <IconButton>
                  <Email fontSize="small" color="error"/>
                  </IconButton>
                </Tooltip>
              )
            )}
          </Grid>

          {/* Text2 and Schedule Icon */}
          <Grid item xs={6} sm={2} md={2} lg={2} ml={ActiveTab == 'Inbox' ? -12: ActiveTab == 'Sent' ? 5 : -14}>
            <Typography  sx={{ textAlign: 'left' }}>
              {text2}
              {IsSchedule && <ScheduleIcon fontSize="small" color="primary" />}
            </Typography>
          </Grid>
        </Grid>
      </Box>

    </>
  );
}

export default CardMessage;
