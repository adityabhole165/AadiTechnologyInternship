import React from 'react';
import { useParams } from 'react-router';
import {GetReceiveSMSDetails} from "src/interfaces/AdminSMSCenter/AReceiveSMS";
import http from 'src/requests/SchoolService/schoolServices';
import { useState,useEffect } from 'react';
import PageHeader from "src/libraries/heading/PageHeader";
import Card25 from "src/libraries/card/Card25";
import {GetSMSDetailsResult} from "src/interfaces/AdminSMSCenter/AReceiveSMS";

const ViewReceiveSMS = () => {

    const ViewDetail = { From: "From", Scheduled_Date: "Received Date", To: "To", SMS_Text: "SMS Text" }
    const {DetailsId} = useParams();
    const [viewSms, setViewSms] = useState<GetSMSDetailsResult>()

    const body : GetReceiveSMSDetails= {
        asSchoolId: "120",
        asSMSId: `${DetailsId}`,
        asUserRoleId: "6",
        asUserId: "695",
        asAcademicYearId: "9"
    };

    const GetViewMessageResult = () => {
        
        http.post('SMS/GetSMSDetails', body)
          .then((resp) =>
            resp.data.GetSMSDetailsResult
          )
          .then((data) => {
            setViewSms(data);
            
          })
      }

      useEffect(() => {
        GetViewMessageResult()
      }, [])

  return (
      <>
        <PageHeader heading={"View Received SMS"} subheading={""} />
        { (viewSms == undefined) ? null :
            <Card25 ViewDetail={ViewDetail} From={viewSms.UserName} To={viewSms.DisplayText} Date={viewSms.Date} Text={viewSms.Subject} />
        }
    </>
  )
}

export default ViewReceiveSMS;