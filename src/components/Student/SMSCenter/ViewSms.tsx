import React, { useEffect, useState } from 'react';
import { IViewSms, GetSMSDetailsResult } from 'src/interfaces/Student/SMSCenter';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router-dom';
import Card3 from 'src/libraries/card/card3';
import http from 'src/requests/SchoolService/schoolServices';

function ViewSms() {
  const ViewDetail = {
    From: 'From',
    Received_Date: 'Received Date',
    To: 'To',
    SMS_Text: 'SMS Text'
  };
  const [viewSms, setViewSms] = useState<GetSMSDetailsResult>();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const { ID } = useParams();

  const GetViewMessageResult = () => {
    const ViewSms_body: IViewSms = {
      asSchoolId: asSchoolId,
      asSMSId: `${ID}`,
      asUserRoleId: RoleId,
      asUserId: UserId,
      asAcademicYearId: asAcademicYearId
    };
    http
      .post('SMS/GetSMSDetails', ViewSms_body)
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
      <PageHeader heading={'View SMS'} subheading={''} />
      {viewSms === undefined ? null : (
        <Card3
          ViewDetail={ViewDetail}
          From={viewSms.UserName}
          To={viewSms.DisplayText}
          Date={viewSms.Date}
          Text={viewSms.Subject}
        />
      )}
    </>
  );
}

export default ViewSms;
