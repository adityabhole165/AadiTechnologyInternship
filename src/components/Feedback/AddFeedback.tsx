import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { saveFeedbackdetails } from 'src/requests/Feedback/RequestFeedback'


const AddFeedback = () => {
  const dispatch = useDispatch();

  const AddFeedback: any = useSelector(
    (state: RootState) => state.FeedBack.AddFeedbackList
  );

  console.log("AddFeedback", AddFeedback);

  const AddFeedbackBody = {

    "aiSchoolId": 122,
    "aiAcademicYrId": 7,
    "aiFeedbackfor": "School",
    "aiUserId": 5966,
    "aiFeedbackDescription": "Testing comment.",
    "aiFeedbackTypeId": 1,
    "aiInsertedById": 5966,
    "aiemail": "s@s.com",
    "aiUserName": "abc",
    "asMailSubject": "",
    "asAdminMailAddress": "",
    "asLogin": ""
  }
  useEffect(() => {
    dispatch(saveFeedbackdetails(AddFeedbackBody));
  }, []);


return (
  <>
    sejal
  </>
)
  }

export default AddFeedback