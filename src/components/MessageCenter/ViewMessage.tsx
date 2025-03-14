import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AlertContext } from 'src/contexts/AlertContext';
import { IUpdateReadReceiptStatusBody } from 'src/interfaces/MessageCenter/GetList';
import { IGetDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { IViewSent } from 'src/interfaces/MessageCenter/Sent_Message';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import Card7 from 'src/libraries/card/card7';
import { getDraftMessage } from 'src/requests/MessageCenter/RequestDraftMessage';
import http from 'src/requests/SchoolService/schoolServices';
import { GetEnableMessageCenterReadModeForStudent } from 'src/requests/SchoolSetting/schoolSetting';
import { getUpdateReadReceiptStatus } from 'src/requests/Student/InboxMessage';
import { RootState } from 'src/store';
import { compareStringWithoutSpace, decodeURL } from '../Common/Util';


function ViewSms({ }) {
  const dispatch = useDispatch();
  const ViewDetail = {
    From: 'From',
    Subject: 'Subject',
    To: 'To',
    Cc: 'Cc',
    Attachment: 'Attachment',
    Body: 'Content'
  };

  let {
    ID,
    FromRoute
  } = useParams();

  // Decode in-place
  ID = decodeURL(ID);
  FromRoute = decodeURL(FromRoute);

  const [viewSent, setViewSent] = useState(null);
  const { showAlert, closeAlert } = useContext(AlertContext);
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
  //console.log('GetDraftMessage', GetDraftMessage);

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
        //console.log(data, 'data');
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

  // useEffect(() => {
  //   if (viewSent !== undefined && viewSent !== null) {
  //     if (viewSent.RequestReadReceipt === 'True') {
  //       let readRecipient = '0';
  //       if (
  //         confirm(
  //           "The Sender of this message has requested 'Read Receipt'. Do you want to send it"
  //         )
  //       ) {
  //         readRecipient = '1';
  //       }

  //       const body: IUpdateReadReceiptStatusBody = {
  //         asSchoolId: SchoolId,
  //         asAcademicYearId: asAcademicYearId,
  //         asReceiverId: viewSent.ReceiverDetailsId,
  //         asRequestReadReceipt: readRecipient
  //       };
  //       dispatch(getUpdateReadReceiptStatus(body));
  //     }
  //     setShowMessage(true);
  //   }
  // }, [viewSent]);

  useEffect(() => {
    if (viewSent !== undefined && viewSent !== null) {
      if (viewSent.RequestReadReceipt === 'True' && viewSent.ReadingDateTime === null) {
        let readRecipient = '0';

        showAlert({
          title: 'Read Receipt Request',
          message:
            'The sender of this message has requested "Read Receipt". Do you want to send it?',
          variant: 'warning',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          onCancel: () => {
            readRecipient = '0';

            const body: IUpdateReadReceiptStatusBody = {
              asSchoolId: SchoolId,
              asAcademicYearId: asAcademicYearId,
              asReceiverId: viewSent.ReceiverDetailsId,
              asRequestReadReceipt: readRecipient,
            };

            dispatch(getUpdateReadReceiptStatus(body));
            closeAlert();
          },
          onConfirm: () => {
            readRecipient = '1';

            const body: IUpdateReadReceiptStatusBody = {
              asSchoolId: SchoolId,
              asAcademicYearId: asAcademicYearId,
              asReceiverId: viewSent.ReceiverDetailsId,
              asRequestReadReceipt: readRecipient,
            };

            dispatch(getUpdateReadReceiptStatus(body));
            closeAlert();
          },
        });
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

    <Box sx={{ px: 2 }}>
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
              Body={viewSent.Body
                // FromRoute === 'Draft'
                //   ? getWithoutHTML(viewSent.Body)
                //   : viewSent.Body
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
