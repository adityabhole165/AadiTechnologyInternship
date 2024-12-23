import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GetEventsDetailsResult,
  IEventDetails
} from 'src/interfaces/Common/AnnualPlanner';
import BackButton from 'src/libraries/button/BackButton';
import Card2 from 'src/libraries/card/card2';
import PageHeader from 'src/libraries/heading/PageHeader';
import http from 'src/requests/SchoolService/schoolServices';
import { decodeURL } from '../Common/Util';

function ViewEvent() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');

  let {
    Id,
    AssigMonth,
    AssigYear,
    DateFrommon,
    DateFromyear,
    holiday,
    event,
    exam
  } = useParams();

  // Decode in-place
  Id = decodeURL(Id);
  AssigMonth = decodeURL(AssigMonth);
  AssigYear = decodeURL(AssigYear);
  DateFrommon = decodeURL(DateFrommon);
  DateFromyear = decodeURL(DateFromyear);
  holiday = decodeURL(holiday);
  event = decodeURL(event);
  exam = decodeURL(exam);

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
      {exam === undefined ? (
        AssigMonth === undefined ? (
          <BackButton FromRoute={'/Common/EventOverview/UpcomingEvent'} />
        ) : (
          <BackButton
            FromRoute={
              '/Common/EventOverview' + '/' + AssigMonth + '/' + AssigYear
            }
          />
        )
      ) : (
        <BackButton
          FromRoute={
            '/Common/EventOverview' +
            '/' +
            DateFrommon +
            '/' +
            DateFromyear +
            '/' +
            holiday +
            '/' +
            event +
            '/' +
            exam
          }
        />
      )}
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
