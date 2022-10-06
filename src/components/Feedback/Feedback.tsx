import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react'
import { IFeedbackList } from 'src/interfaces/Common/Feedback';
import List1 from 'src/libraries/mainCard/List1';
// import RadioButton from 'src/libraries/RadioButton/RadioButton';
import { RootState } from 'src/store';
import { getFeedback } from 'src/requests/Feedback/Feedback';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PageHeader from 'src/libraries/heading/PageHeader';


const Feedback = () => {
const dispatch = useDispatch();
const GetFeedback = useSelector((state: RootState) => state.Feedback.FeedbackList);
console.log("feedback",GetFeedback);
const Data = GetFeedback.map((item, index) => {
    return {
      id: index,
      text1: item.Text
    };
  });
const Feedback_body: IFeedbackList = { 
    "aiUserRoleId":6,
    "aiFeedbackTypeId":0,
    "asFeedBackFor":"School",
    "aiSchoolId":120,
    "sortDirection":"desc",
    "asStartDate":"",
    "asEndDate":"",
    "sortExpression":"",
    "startRowIndex":0,
    "iEndIndex":10,
    "abIsServiceCall":true,
    "asDesignationId":"0", 
    "abIsAccountsCumAdminOfficer":false
  }

  useEffect(() => { 
    dispatch(getFeedback(Feedback_body))
  }, [])
  return (
    <>
      <PageHeader heading={'Feedback'} subheading={''} />
     <Container>
     <List1 items={Data}/>
     </Container>
    </>
  )
}

export default Feedback



