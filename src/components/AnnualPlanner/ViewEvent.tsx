import React, { useEffect, useState } from 'react';
import {
  IEventDetails,
  GetEventsDetailsResult
} from 'src/interfaces/Common/AnnualPlanner';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router-dom';
import Card2 from 'src/libraries/card/card2';
import http from 'src/requests/SchoolService/schoolServices';
import BackButton from 'src/libraries/button/BackButton';

function ViewEvent() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');

  const { Id , AssigMonth,AssigYear } = useParams();
  const [viewEvent, setViewEvent] = useState<GetEventsDetailsResult>();
  const ViewDetail = {
    Title: 'Event Title',
    Start_Date: 'Start Date',
    End_Date: 'End Date',
    Standards: 'Standards',
    Attachment: 'Attachment',
    Description: 'Description'
  };
  const GetViewEventResult = () => {
    const ViewEvent_body: IEventDetails = {
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId,
      asEventId: `${Id}`
    };

    http
      .post('School/GetEventsDetails', ViewEvent_body)
      .then((resp) => resp.data.GetEventDetailResult)
      .then((data) => {
        setViewEvent(data);
      });
  };
  useEffect(() => {
    GetViewEventResult();
  }, []);

  return (
    <>
      <PageHeader heading={'View Event'} subheading={''} />
       {AssigMonth===undefined?
      <BackButton FromRoute={'/Common/EventOverview/UpcomingEvent'} />:
      <BackButton FromRoute={'/Common/EventOverview' + '/' + AssigMonth + '/' + AssigYear} />
    }
      {viewEvent === undefined ? null : (
        <Card2
          ViewDetail={ViewDetail}
          Title={viewEvent.Description}
          StartDate={viewEvent.StartDate}
          EndDate={viewEvent.EndDate}
          Standard={viewEvent.StandardList}
          Description={viewEvent.EventComment}
        />
      )}
    </>
  );
}

export default ViewEvent;
