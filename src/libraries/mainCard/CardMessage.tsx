import { Email } from '@mui/icons-material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DraftsIcon from '@mui/icons-material/Drafts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Dialog, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
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
      <Grid container alignItems={'center'} onClick={clickNav} pt={0.8}>
        <Grid item xs={2} sm={2} md={ActiveTab == 'Inbox' ? 4 : ActiveTab == 'Sent' ? 3 : 4} >
          <Typography
            variant="h6"
            sx={{
              color: IsReadColor,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '150px'
            }}
          >
            {header}
          </Typography>
        </Grid>
        {/* This attachment is used for Mobile view */}
        <Grid item display={{ xs: 'block', sm: 'none' }} xs={2}>
          {IsAttachmentExist && <AttachmentIcon fontSize="small" />}
        </Grid>
        {/* 
        Form data and Message Body */}
        <Grid item xs={2} sm={2} md={2}>
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {text1}
            {/* <span
              dangerouslySetInnerHTML={{ __html: (text1) }}
            /> */}
          </Typography>
        </Grid>
        {/* cc data  */}
        <Grid item xs={2} sm={2} md={2} ml={2} >
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ml: 8
            }}
          >
            {text3}
          </Typography>
        </Grid>
        {/* This attachment is used for web view */}
        <Grid item sm={2} md={2} ml={-2}>
          {IsAttachmentExist && (
            <IconButton
              sx={{ ml: -13 }}>
              <AttachmentIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={1} sm={1} md={2} ml={-12}>
          <>
            {RequestReadReceipt === 'True' && HasReadReceipt === true && (
              <>
                <Tooltip title={'View'}>
                  <IconButton
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      mb: '-5px',
                      ml: '0px',
                      color: '#38548A',
                      '&:hover': {
                        color: 'green',
                        backgroundColor: green[100],
                      },
                    }}
                    onClick={(e) => {
                      handleClickToOpen(e);
                    }}
                  >
                    <DraftsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Dialog
                  open={popup}
                  onClose={() => {
                    setPopup(false);
                  }}
                >
                  {ReadReceipt.map((item, i) => (
                    <div key={i}>
                      <Card15
                        text1={item.ReadingDateTime}
                        text2={item.UserName}
                      />
                    </div>
                  ))}
                </Dialog>
              </>
            )}
          </>
          {RequestReadReceipt === 'True' && HasReadReceipt === false && (
            <Tooltip title={'Requested'}>
              <Email
                fontSize="small"
                color="error"
              // sx={{ mt: '-2px', ml: '4px' }}
              /></Tooltip>
          )}
        </Grid>
        <Grid item xs={2} sm={2} md={2} ml={ActiveTab == 'Inbox' ? -10 : ActiveTab == 'Sent' ? 0 : -10}>
          <Typography variant="body1" sx={{ float: 'right' }}>
            <>
              {' '}
              {text2}{' '}
              {IsSchedule && (
                <ScheduleIcon
                  fontSize="small"
                  color="primary"
                // sx={{ mb: '5px' }}
                />
              )}
            </>
          </Typography>
        </Grid>
      </Grid >
    </>
  );
}

export default CardMessage;
