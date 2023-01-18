import { useEffect,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getuserFeedback } from 'src/requests/Feedback/RequestFeedback'
import { Container } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { IGetUserFeedbackBody } from 'src/interfaces/Student/IFeedback';
import PageHeader from 'src/libraries/heading/PageHeader';
import CardListText3 from 'src/libraries/card/CardListText3';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
function Feedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const Feedback: any = useSelector(
    (state: RootState) => state.FeedBack.FeedbackList
  );
  const loading = useSelector(
    (state: RootState) => state.FeedBack.Loading
  );

  const myRef = useRef(null);
  
  const executeScroll = () => {
    myRef.current.scrollIntoView({ top: 0, behavior: 'smooth' })
  };

  const FeedbackBody:IGetUserFeedbackBody =
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

   const clickNav = (value) => {
    navigate(`/${location.pathname.split('/')[1]}/Student/AddFeedback`)
}
  return (
    <Container>
    <div ref={myRef}></div>
    <PageHeader heading={'Feedback'} subheading={''} />
    <ButtonPrimary sx={{float:"right",mt:-1}}  onClick={() => clickNav('AddFeedback/')}>Add Feedback</ButtonPrimary>
    <br/>

    {loading ? (
        <SuspenseLoader />
      ) : (      
      <CardListText3 itemList={Feedback} executeScroll={executeScroll}/>  
      )}
    </Container>
  
  )
}

export default Feedback