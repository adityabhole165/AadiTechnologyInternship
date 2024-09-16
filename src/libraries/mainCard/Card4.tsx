import AttachmentIcon from '@mui/icons-material/Attachment';
import DraftsIcon from '@mui/icons-material/Drafts';
import EmailIcon from '@mui/icons-material/Email';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { ReadReceiptDetail } from 'src/requests/MessageCenter/MessaageCenter';
import { RootState } from 'src/store';
import {
  AttachmentIcon1,
  CardD,
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardDetail3,
  CardDetail9,
  DateWidth,
  DateWidth1
} from '../styled/CardStyle';
import Card15 from './Card15';

function Card4({
  header,
  text1,
  text2,
  text3,
  text5,
  DetailsId = undefined,
  text4,
  text6,
  clickCard = undefined,
  ActiveTab = undefined,
  IsRead = undefined,
  IsSchedule = false,
  IsAttachmentExist = undefined,
  HasReadReceipt = undefined,
  RequestReadReceipt = undefined,
  NavPath = undefined,
  Textcolor
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Common/', '');
  const pageName1 = pathname.replace('/extended-sidebar/', '');
  const pageNameStudent = pathname.replace('/extended-sidebar/Student/', '');

  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [popup, setPopup] = useState(false);

  const ReadReceipt = useSelector(
    (state: RootState) => state.MessageCenter.ReadReceiptDetails
  );

  const ReadReceipts = {
    aiSchoolId: SchoolId,
    aiAcademicYearId: AcademicYearId,
    aiMessageDetailId: DetailsId
  };
  let clickParent = true;
  const handleClickToOpen = (e) => {
    e.stopPropagation();
    setPopup(true);
    dispatch(ReadReceiptDetail(ReadReceipts));
    clickParent = false;
  };
  const navigate = useNavigate();

  const clickNav = () => {
    if (clickParent) {
      navigate(
        '/' +
        location.pathname.split('/')[1] +
        '/MessageCenter/viewMSg/' +
        NavPath
      );
    }
  };

  let IsReadColor =
    ActiveTab == 'Inbox' && IsRead == 'N'
      ? 'blue'
      : ActiveTab == 'Sent' && IsSchedule
        ? 'blue'
        : '';
  return (
    <>
      {/* <CardDetail onClick={clickCard}>
        <CardDetail1 sx={{ color: IsReadColor || Textcolor }}>
          {header}
        </CardDetail1>

        {pageNameStudent == 'SubjectTeacher' ? (
          <>
            <RouterLink
              style={{ textDecoration: 'none' }}
              to={
                `/${location.pathname.split('/')[1]}/MessageCenter/Compose/` +
                header
              }
            >
              <ForwardToInboxIcon
                sx={{ cursor: 'pointer', color: '#f0483e', height: '18px' }}
                fontSize="small"
              />
            </RouterLink>
          </>
        ) : (
          <>
            {pageName1 == 'Teacher/Texamschedule' ? (
              <DateWidth>{text3}</DateWidth>
            ) : pageName == 'EventOverview' ? (
              <DateWidth1>{text3}</DateWidth1>
            ) : (
              <CardDetail2>
                {text3}{' '}
                {IsAttachmentExist && (
                  <AttachmentIcon1>
                    <AttachmentIcon />
                  </AttachmentIcon1>
                )}
              </CardDetail2>
            )}
          </>
        )}
      </CardDetail> */}

        {/* <CardDetail>
          {pageName1 == 'MessageCenter/msgCenter' ? (
            <CardD>{text1}</CardD>
          ) : (
            <CardDetail3>{text1}</CardDetail3>
          )}
          <CardDetail2 sx={{ color: 'black', display: 'flex' }}>
            <>
              {text2}{' '}
              {IsSchedule && (
                <ScheduleIcon
                  fontSize="small"
                  color="primary"
                  sx={{ mt: '-2px', ml: '4px' }}
                />
              )}
            </>
            <>
              {RequestReadReceipt === 'True' && (
                <>
                  {HasReadReceipt ? (
                    <>
                      <DraftsIcon
                        fontSize="small"
                        color="success"
                        sx={{ mt: '-2px', ml: '4px' }}
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
                        <Card15 text1={text2} text2={text1} />
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
          </CardDetail2>
        </CardDetail> */}

      {/* <CardDetail>
        {pageName == 'PTA' ? (
          <CardDetail2 color="primary">{text6}</CardDetail2>
        ) : null}
        <CardDetail9 color="primary">{text5}</CardDetail9>
        <CardDetail2>{text4}</CardDetail2>
      </CardDetail> */}
    </>
  );
}

export default Card4;
