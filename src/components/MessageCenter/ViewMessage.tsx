import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetSentListResult,
  IViewSent
} from 'src/interfaces/MessageCenter/Sent_Message';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router-dom';
import Card7 from 'src/libraries/card/card7';
import http from 'src/requests/SchoolService/schoolServices';
import BackButton from 'src/libraries/button/BackButton';
import { getUpdateReadReceiptStatus } from 'src/requests/Student/InboxMessage';
import { IUpdateReadReceiptStatusBody } from 'src/interfaces/MessageCenter/GetList';
import { compareStringWithoutSpace } from '../Common/Util';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { GetEnableMessageCenterReadModeForStudent } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import { IGetDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { getDraftMessage } from 'src/requests/MessageCenter/RequestDraftMessage';
import CardDraft from 'src/libraries/card/CardDraft';
import { Box } from '@mui/material';

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

  const { ID, FromRoute } = useParams();
  const [viewSent, setViewSent] = useState<GetSentListResult>();

  const [showMessage, setShowMessage] = useState(false)
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const MessageCenterReadMode: any = useSelector(
    (state: RootState) => state.getSchoolSettings.EnableMessageCenterReadModeForStudent
  );
  const GetDraftMessage = useSelector(
    (state: RootState) => state.DraftMessages.DraftMessage
  );
  
  const DraftMessageBody: IGetDraftMessageBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserId: UserId,
    aiDraftId: "10850"
  }
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: "",
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
        setViewSent(data);
      });
  };
  const SchoolId = localStorage.getItem('localSchoolId')

  useEffect(() => {
    GetViewEventResult();
    dispatch(getDraftMessage(DraftMessageBody))
  }, []);
  useEffect(() => {
    dispatch(GetEnableMessageCenterReadModeForStudent(GetSettingValueBody))
  }, []);
  useEffect(() => {   
    if (viewSent !== undefined) {
      if (viewSent.RequestReadReceipt === "True") {
        let readRecipient = "0"
        if (confirm("The Sender of this message has requested 'Read Receipt'. Do you want to send it")) {
          readRecipient = "1"
        }

        const body: IUpdateReadReceiptStatusBody = {
          asSchoolId: SchoolId,
          asAcademicYearId: asAcademicYearId,
          asReceiverId: viewSent.ReceiverDetailsId,
          asRequestReadReceipt: readRecipient
        };
        dispatch(getUpdateReadReceiptStatus(body));
      }
      setShowMessage(true)
    }
  }, [viewSent]);
  const isSame = (value1, value2) => {
    let arr1 = value1.split('(')
    let arr2 = value2.split('(')
    if (arr1[0] === arr1[0]) {
      if (arr1.length > 1 && arr2.length > 1) {
        if (compareStringWithoutSpace(arr1[1],arr2[1]) )
          return true
      }
    }
    else
      return false
  } 

  
  return (
    <>
      <PageHeader heading={'View Message'} subheading={''} />

      <BackButton FromRoute={'/MessageCenter/msgCenter/' + FromRoute} />
      {GetDraftMessage !== undefined && <>
        {GetDraftMessage.map((item,i) => {
          return <Box key={i}><CardDraft
            ViewDetail={ViewDetail}
            From={item.SenderName}
            InsertDateInFormat={item.InsertDateInFormat}
            To={item.DisplayText}
            Cc={item.DisplayTextCc}
            Body={item.Body}
            Text={item.Subject}
            Attachments={item.Attachments}
            ID={ID}
            ViewSentObject={GetDraftMessage}
            MessageCenterReadMode={MessageCenterReadMode} Viewsent={undefined} /></Box>
        })}

      </>

      }

      {

        viewSent === undefined ? null : showMessage && (
          <Card7
            ViewDetail={ViewDetail}
            From={viewSent.UserName}
            InsertDateInFormat={viewSent.InsertDateInFormat}
            // ReceivedTime={viewSent.Time}

            // To={(viewSent.RecieverName != null && viewSent.RecieverName != '') ?
            //   (isSame(viewSent.DisplayTextCc, viewSent.RecieverName)) ? '' :
            //     viewSent.RecieverName : viewSent.DisplayText}
            To={(viewSent.RecieverName != null && viewSent.RecieverName != '') ?
              // (isSame(viewSent.DisplayTextCc, viewSent.RecieverName)) ? '' :
                viewSent.RecieverName : viewSent.DisplayText}
            Cc={viewSent.DisplayTextCc}
            Body={viewSent.Body}
            Text={viewSent.Subject}
            Attachments={viewSent.Attachments}
            ID={ID}
            ViewSentObject={viewSent}
            LoggedInUserNameForMessage={viewSent.LoggedInUserNameForMessage}
            MessageCenterReadMode={MessageCenterReadMode}
          />
        )}
    </>
  );
}

export default ViewSms;
