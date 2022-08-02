import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { GetSentListResult, IViewSent } from "src/interfaces/MessageCenter/Sent_Message";
import PageHeader from "src/libraries/heading/PageHeader";
import { useParams } from "react-router-dom";
import Card7 from "src/libraries/card/card7";
import http from 'src/requests/SchoolService/schoolServices';

function ViewSms() {
  const dispatch = useDispatch();
  // const ViewSent: any = useSelector((state: RootState) => state.Sent__Message.ViewSent)
  const ViewDetail = { From:"From", Subject:"Subject", To:"To", Attachment:"Attachment", Body: "Content" }

  const { ID } = useParams();
  const [viewSent, setViewSent] = useState<GetSentListResult>()
  
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');




  const GetViewEventResult = () => {
    const ViewSent_body: IViewSent = {
      "asSchoolId":asSchoolId,
      "asMessageDetailsId": ID,
      "asReceiverId": UserId,
      "asAcademicYearId": asAcademicYearId
    };

    http.post('MessageCenter/GetMessage', ViewSent_body)
      .then((resp) =>
        resp.data.GetMessagesResult
      )
      .then((data) => {
        setViewSent(data)
      })
  }

  useEffect(() => {
    GetViewEventResult()
  }, [])

  return (
    <>
      <PageHeader heading={"View Message"} subheading={""} />
      {
        (viewSent === undefined) ?
          null
          :
          <Card7 ViewDetail={ViewDetail} From={viewSent.UserName} To={viewSent.RecieverName} Body={viewSent.Body} Text={viewSent.Subject} Attachments={viewSent.Attachment} />
      }



    </>
  );
}

export default ViewSms;
