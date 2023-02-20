import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  }, []);
  useEffect(() => {
    if(viewSent !== undefined){
    if(viewSent.RequestReadReceipt==="True")
    {
      let readRecipient = "0"
      if(confirm("do you want to allow read")){
        readRecipient = "1"
      }
      
  const body: IUpdateReadReceiptStatusBody = {
    asSchoolId: SchoolId,
    asAcademicYearId:asAcademicYearId,
    asReceiverId:viewSent.ReceiverDetailsId,
    asRequestReadReceipt:readRecipient
  };
    dispatch(getUpdateReadReceiptStatus(body));

    }
    setShowMessage(true)
  }
  }, [viewSent]);
  
  return (
    <>
      <PageHeader heading={'View Message'} subheading={''} />

      <BackButton FromRoute={'/MessageCenter/msgCenter/' + FromRoute} />


      {
      
      viewSent === undefined ? null : showMessage && (
        <Card7
          ViewDetail={ViewDetail}
          From={viewSent.UserName}
          To={(viewSent.RecieverName != null && viewSent.RecieverName != '') ?
            viewSent.RecieverName : viewSent.DisplayText}
          Cc={viewSent.DisplayTextCc}
          Body={viewSent.Body}
          Text={viewSent.Subject}
          Attachments={viewSent.Attachments}
          ID={ID}
          ViewSentObject={viewSent}
        />
      )}
    </>
  );
}

export default ViewSms;
