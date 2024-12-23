import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  GetReceiveSMSDetails,
  GetSMSDetailsResult
} from 'src/interfaces/AdminSMSCenter/AReceiveSMS';
import Card25 from 'src/libraries/card/Card25';
import PageHeader from 'src/libraries/heading/PageHeader';
import http from 'src/requests/SchoolService/schoolServices';
import { decodeURL } from '../Common/Util';

const ViewReceiveSMS = () => {
  const ViewDetail = {
    From: 'From',
    Scheduled_Date: 'Received Date',
    To: 'To',
    SMS_Text: 'SMS Text'
  };
  let {
    DetailsId,
    FromURL
  } = useParams();

  // Decode in-place
  DetailsId = decodeURL(DetailsId);
  FromURL = decodeURL(FromURL);

  const [viewSms, setViewSms] = useState<GetSMSDetailsResult>();

  const body: GetReceiveSMSDetails = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asSMSId: `${DetailsId}`,
    asUserRoleId: sessionStorage.getItem('RoleId'),
    asUserId: sessionStorage.getItem('Id'),
    asAcademicYearId: sessionStorage.getItem('AcademicYearId')
  };

  const GetViewMessageResult = () => {
    http
      .post('SMS/GetSMSDetails', body)
      .then((resp) => resp.data.GetSMSDetailsResult)
      .then((data) => {
        setViewSms(data);
      });
  };

  useEffect(() => {
    GetViewMessageResult();
  }, []);

  return (
    <>
      <PageHeader heading={'View Received SMS'} subheading={''} />
      {viewSms == undefined ? null : (
        <Card25
          ViewDetail={ViewDetail}
          From={viewSms.UserName}
          To={viewSms.DisplayText}
          Date={viewSms.Date}
          Text={viewSms.Subject}
          FromURL={FromURL}
        />
      )}
    </>
  );
};

export default ViewReceiveSMS;
