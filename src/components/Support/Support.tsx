import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSupportDetails } from 'src/requests/Support/RequestSupport';


function Support() {

  const dispatch = useDispatch();

  const Support: any = useSelector(
    (state: RootState) => state.Support.SupportList
  );
  
  console.log("Support", Support);

  const SupportBody ={
    
        "aiUserID":"31",
        "aiSchoolId":"122",
        "aiAcademicYrId":"7"
    
  }
  
  useEffect(() => {
    dispatch(getSupportDetails(SupportBody));
  }, []);

  return (
    <div>
      <PageHeader heading={'Support'}  subheading={''} />
      
    </div>
  )
}

export default Support