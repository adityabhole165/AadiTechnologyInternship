import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IViewHomework,
  IViewHomeworkResponse
} from 'src/interfaces/Student/Homework';
import http from 'src/requests/SchoolService/schoolServices';
import Card4 from 'src/libraries/card/card4';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';

function ViewHomework() {
  const { Id,SelectedDate } = useParams();

  const [viewHomework, setViewhomework] = useState<IViewHomeworkResponse>();
  const ViewDetail = {
    SubjectName: 'Subject Name',
    Title: 'Title',
    AssignedDate: 'Assigned Date',
    CompleteByDate: 'Complete By Date',
    AttachmentPath: 'Attachment',
    Details: 'Details'
  };

  const asSchoolId = localStorage.getItem('localSchoolId');
  const userId = sessionStorage.getItem('Id');

  const GetViewHomeworkresult = () => {
    const ViewHomework_body: IViewHomework = {
      asSchoolId: asSchoolId,
      asId: Id,
      asLoginUserId: userId
    };

    http
      .post('Student/GetHomework', ViewHomework_body)
      .then((resp) => resp.data.GetHomeworkResult)
      .then((data) => {
        setViewhomework(data);
      });
  };

  useEffect(() => {
    GetViewHomeworkresult();
  }, []);

  return (
    <>
      <PageHeader heading={'View Homework'} subheading={''} />
   
        <BackButton FromRoute={"/Student/Homework/"+SelectedDate} />
    
      {viewHomework === undefined ? null : (
        <Card4
          ViewDetail={ViewDetail}
          Title={viewHomework.Title}
          SubjectName={viewHomework.SubjectName}
          Assignedate={viewHomework.AssignedDate}
          CompletedDate={viewHomework.CompleteByDate}
          Details={viewHomework.Details}
          Attachments={viewHomework.AttachmentPath}
        />
      )}
    </>
  );
}

export default ViewHomework;
