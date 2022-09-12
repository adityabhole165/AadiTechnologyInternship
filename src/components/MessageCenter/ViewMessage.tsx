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

function ViewSms({}) {
  const dispatch = useDispatch();
  // const ViewSent: any = useSelector((state: RootState) => state.Sent__Message.ViewSent)
  const ViewDetail = {
    From: 'From',
    Subject: 'Subject',
    To: 'To',
    Attachment: 'Attachment',
    Body: 'Content'
  };

  const { ID, FromRoute } = useParams();
  const [viewSent, setViewSent] = useState<GetSentListResult>();

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

  useEffect(() => {
    GetViewEventResult();
  }, []);


  return (
    <>
      <PageHeader heading={'View Message'} subheading={''} />

      <BackButton FromRoute={'/MessageCenter/msgCenter/' + FromRoute} />
      

      {viewSent === undefined ? null : (
        <Card7
          ViewDetail={ViewDetail}
          From={viewSent.UserName}
          To={viewSent.RecieverName}
          Body={viewSent.Body}
          Text={viewSent.Subject}
          Attachments={viewSent.Attachments}
          ID={UserId}
          ViewSentObject={viewSent}
        />
      )}
    </>
  );
}

export default ViewSms;
