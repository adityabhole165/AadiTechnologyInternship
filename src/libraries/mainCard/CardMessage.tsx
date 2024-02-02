import AttachmentIcon from '@mui/icons-material/Attachment';
import DraftsIcon from '@mui/icons-material/Drafts';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Dialog, Grid, Typography } from '@mui/material';
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
    ActiveTab == 'Inbox' && IsRead == 'N'
      ? 'blue'
      : ActiveTab == 'Sent' && IsSchedule
      ? 'blue'
      : '';
  return (
    <>
      <Grid container alignItems={'center'} onClick={clickNav}>
        <Grid item xs={11} sm={5} md={4}>
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
        <Grid item display={{ xs: 'block', sm: 'none' }} xs={1}>
          {IsAttachmentExist && <AttachmentIcon fontSize="small" />}
        </Grid>

        <Grid item xs={6} sm={2} md={4.5}>
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {text1}
          </Typography>
        </Grid>
        {/* This attachment is used for web view */}
        <Grid item display={{ xs: 'none', sm: 'block' }} sm={1} md={0.5}>
          {IsAttachmentExist && (
            <AttachmentIcon fontSize="small" sx={{ ml: '20px' }} />
          )}
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Typography variant="body1" sx={{ float: 'right' }}>
            <>
              {' '}
              {text2}{' '}
              {IsSchedule && (
                <ScheduleIcon
                  fontSize="small"
                  color="primary"
                  sx={{ mb: '-5px' }}
                />
              )}
            </>

            <>
              {HasReadReceipt && (
                <>
                  {RequestReadReceipt ? (
                    <>
                      <DraftsIcon
                        fontSize="small"
                        color="success"
                        sx={{ mb: '-5px', ml: '4px' }}
                        onClick={(e) => {
                          handleClickToOpen(e);
                        }}
                      />
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
                  ) : (
                    <EmailIcon
                      fontSize="small"
                      color="error"
                      sx={{ mt: '-2px', ml: '4px' }}
                    />
                  )}
                </>
              )}
            </>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default CardMessage;
