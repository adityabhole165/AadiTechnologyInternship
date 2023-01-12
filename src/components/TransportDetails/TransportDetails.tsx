import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import Card8 from 'src/libraries/mainCard/Card8';
function TransportDetails() {

  const dispatch = useDispatch();

  const RouteDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.RouteDetails
  );
  const StopDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.StopDetails
  );


  useEffect(() => {
    // const TransportBody: GetStudentTransportDetailsBody = {
    //   aiUserId: parseInt(sessionStorage.getItem('Id')),
    //   aiSchoolId: parseInt(localStorage.getItem('localSchoolId')),
    //   aiAcademicYearId: parseInt(sessionStorage.getItem('AcademicYearId')),
    //   aiTypeId: 1
    // }
    const TransportBody: GetStudentTransportDetailsBody = {
      aiUserId: 4162,
      aiSchoolId: 122,
      aiAcademicYearId: 7,
      aiTypeId: 1
    }
    dispatch(getTransportDetails(TransportBody));
  }, []);


  return (
    <div>
      <PageHeader heading={'Transport Details'} subheading={''} />
      <Card8 itemList={RouteDetails}/>
      {
        StopDetails?.map((item,i)=>{
          return (<Card8 itemList={item.StopDetail} key={i}/>)
        })
      }
    </div>
  )
}

export default TransportDetails