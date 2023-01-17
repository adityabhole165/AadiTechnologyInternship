import { useEffect,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getuserFeedback } from 'src/requests/Feedback/RequestFeedback'
import CardText3 from 'src/libraries/card/CardText3';
import { Container } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import TopScroll from 'src/libraries/card/TopScroll';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
function Feedback() {

  const dispatch = useDispatch();
  const myRef = useRef(null);
  const Feedback: any = useSelector(
    (state: RootState) => state.FeedBack.FeedbackList
  );
  const loading = useSelector(
    (state: RootState) => state.FeedBack.Loading
  );
  const executeScroll = () => myRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
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
    <Container>
    <div ref={myRef}></div>
    <PageHeader heading={'Feedback'} subheading={''} />
    <ButtonPrimary sx={{float:"right",mt:-1}}>Add Feedback</ButtonPrimary>
    <br/>
    {loading ? (
        <SuspenseLoader />
      ) : (
        <>
           {(Feedback.length == undefined) ? (<ErrorMessages Error={'No records found'} />):
             (<>
                   <CardText3 itemList={Feedback}/>       
                   <TopScroll executeScroll={executeScroll}/>
             </>)}
       </>
      
      )}
   
     </Container>
  
  )
}

export default Feedback