import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IUpdateReadReceiptStatusBody } from 'src/interfaces/MessageCenter/GetList';
import { IGetDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { IViewSent } from 'src/interfaces/MessageCenter/Sent_Message';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import BackButton from 'src/libraries/button/BackButton';
import Card7 from 'src/libraries/card/card7';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getDraftMessage } from 'src/requests/MessageCenter/RequestDraftMessage';
import http from 'src/requests/SchoolService/schoolServices';
import { GetEnableMessageCenterReadModeForStudent } from 'src/requests/SchoolSetting/schoolSetting';
import { getUpdateReadReceiptStatus } from 'src/requests/Student/InboxMessage';
import { RootState } from 'src/store';
import { compareStringWithoutSpace } from '../Common/Util';
import { Box, IconButton, Tooltip } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
import { grey } from '@mui/material/colors';
import { QuestionMark } from '@mui/icons-material';

function ViewSms({}) {
  const dispatch = useDispatch();
  const ViewDetail = {
    From: 'From',
    Subject: 'Subject',
    To: 'To',
    Cc: 'Cc',
    Attachment: 'Attachment',
    Body: 'Content'
  };

  const { ID, FromRoute } = useParams();

  const [viewSent, setViewSent] = useState(null);

  const [showMessage, setShowMessage] = useState(false);
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const MessageCenterReadMode: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableMessageCenterReadModeForStudent
  );
  const GetDraftMessage = useSelector(
    (state: RootState) => state.DraftMessages.DraftMessage
  );
  console.log('GetDraftMessage', GetDraftMessage);

  const DraftMessageBody: IGetDraftMessageBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserId: UserId,
    aiDraftId: ID
  };

  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: ''
  };
  const GetViewEventResult = () => {
    const ViewSent_body: IViewSent = {
      asSchoolId: asSchoolId,
      asMessageDetailsId: ID,
      asReceiverId: UserId,
      asAcademicYearId: asAcademicYearId
    };
    http
      .post('MessageCenter/GetMessage', ViewSent_body)
      .then((resp) => resp.data.GetMessagesResult)
      .then((data) => {
        console.log(data, 'data');
        setViewSent(data);
      });
  };

  useEffect(() => {
    if (GetDraftMessage !== null && GetDraftMessage !== undefined) {
      setViewSent(GetDraftMessage[0]);
    }
  }, [GetDraftMessage]);

  const SchoolId = localStorage.getItem('localSchoolId');

  useEffect(() => {
    if (FromRoute === 'Draft') dispatch(getDraftMessage(DraftMessageBody));
    else GetViewEventResult();
  }, []);

  useEffect(() => {
    dispatch(GetEnableMessageCenterReadModeForStudent(GetSettingValueBody));
  }, []);

  useEffect(() => {
    if (viewSent !== undefined && viewSent !== null) {
      if (viewSent.RequestReadReceipt === 'True') {
        let readRecipient = '0';
        if (
          confirm(
            "The Sender of this message has requested 'Read Receipt'. Do you want to send it"
          )
        ) {
          readRecipient = '1';
        }

        const body: IUpdateReadReceiptStatusBody = {
          asSchoolId: SchoolId,
          asAcademicYearId: asAcademicYearId,
          asReceiverId: viewSent.ReceiverDetailsId,
          asRequestReadReceipt: readRecipient
        };
        dispatch(getUpdateReadReceiptStatus(body));
      }
      setShowMessage(true);
    }
  }, [viewSent]);
  const isSame = (value1, value2) => {
    let arr1 = value1.split('(');
    let arr2 = value2.split('(');
    if (arr1[0] === arr1[0]) {
      if (arr1.length > 1 && arr2.length > 1) {
        if (compareStringWithoutSpace(arr1[1], arr2[1])) return true;
      }
    } else return false;
  };

  const getWithoutHTML = (value) => {
    var div = document.createElement('div');
    div.innerHTML = value;
    var text = div.textContent || div.innerText || '';
    return text;
  };

  return (
    
    <Box sx={{px:2}}>
    <CommonPageHeader
        // <PageHeader heading="Message Center" subheading=""></PageHeader>
          // <BackButton FromRoute={'/MessageCenter/msgCenter/' + FromRoute} />
        navLinks={[
          { title: 'Message Center', path: 'extended-sidebar/MessageCenter/msgCenter' },
          {title: 'View Message', path: 'extended-sidebar/MessageCenter/viewMSg '}
        ]}
       rightActions={
            <>
              <Box>
                <Tooltip title={`View sent/received messages.`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: grey[600] }
                    }}>
                    <QuestionMark />
                  </IconButton>
                </Tooltip>
              </Box>

            </>
          }
        />
      
      <>
        {viewSent === undefined
          ? null
          : showMessage && (
              <Card7
                ViewDetail={ViewDetail}
                From={
                  FromRoute === 'Draft'
                    ? viewSent.SenderName
                    : viewSent.UserName
                }
                InsertDateInFormat={viewSent.InsertDateInFormat}
                To={
                  viewSent.RecieverName != null && viewSent.RecieverName != ''
                    ? viewSent.RecieverName
                    : viewSent.DisplayText
                }
                // To={viewSent.DisplayText}
                Cc={viewSent.DisplayTextCc}
                Body={
                  FromRoute === 'Draft'
                    ? getWithoutHTML(viewSent.Body)
                    : viewSent.Body
                }
                Text={viewSent.Subject}
                Attachments={viewSent.Attachments}
                ID={ID}
                ViewSentObject={viewSent}
                LoggedInUserNameForMessage={viewSent.LoggedInUserNameForMessage}
                MessageCenterReadMode={MessageCenterReadMode}
              />
            )}
      </>
      </Box>
    
  );
}

export default ViewSms;
