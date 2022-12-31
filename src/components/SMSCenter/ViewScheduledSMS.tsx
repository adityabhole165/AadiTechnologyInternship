import React from 'react';
import { useParams } from 'react-router';
import {GetScheduledSMSDetails} from "src/interfaces/AdminSMSCenter/AScheduledSMS";
import http from 'src/requests/SchoolService/schoolServices';
import { useState,useEffect } from 'react';
import PageHeader from "src/libraries/heading/PageHeader";
import Card25 from "src/libraries/card/Card25";
import {GetSMSDetailsResult} from "src/interfaces/AdminSMSCenter/AScheduledSMS";

const ViewScheduledSMS = () => {

    const ViewDetail = { From: "From", Scheduled_Date: "Scheduled Date", To: "To", SMS_Text: "SMS Text" }
    const {DetailsId, FromURL} = useParams();
    const [viewSms, setViewSms] = useState<GetSMSDetailsResult>()

    const body : GetScheduledSMSDetails= {
        asSchoolId: localStorage.getItem('localSchoolId'),
        asSMSId: `${DetailsId}`,
        asUserRoleId: sessionStorage.getItem('RoleId'),
        asUserId: sessionStorage.getItem('Id'),
        asAcademicYearId: sessionStorage.getItem('AcademicYearId')
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
        <PageHeader heading={"View Scheduled SMS"} subheading={""} />
        { (viewSms == undefined) ? null :
            <Card25 ViewDetail={ViewDetail} From={viewSms.UserName} To={viewSms.DisplayText} 
            Date={viewSms.Date} Text={viewSms.Subject} FromURL={FromURL}/>
        }
    </>
  )
}

export default ViewScheduledSMS;