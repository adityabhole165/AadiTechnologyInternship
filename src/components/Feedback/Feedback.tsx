import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getuserFeedback } from 'src/requests/Feedback/RequestFeedback'

function Feedback() {

  const dispatch = useDispatch();

  const Feedback: any = useSelector(
    (state: RootState) => state.FeedBack.FeedbackList
  );

  const FeedbackBody =
  {
    "aiUserRoleId": 6,
    "aiFeedbackTypeId": 0,
    "asFeedBackFor": "School",
    "aiSchoolId": 120,
    "sortDirection": "desc",
    "asStartDate": "",
    "asEndDate": "",
    "sortExpression": "",
    "startRowIndex": 0,
    "iEndIndex": 10,
    "abIsServiceCall": true,
    "asDesignationId": "0",
    "abIsAccountsCumAdminOfficer": false
  }
  useEffect(() => {
    dispatch(getuserFeedback(FeedbackBody));
  }, []);

  return (
    <div>
      <PageHeader heading={'Feedback'} subheading={''} />
    </div>
  )
}

export default Feedback