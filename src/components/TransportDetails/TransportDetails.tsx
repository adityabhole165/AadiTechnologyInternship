import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
function TransportDetails() {

  const dispatch = useDispatch();

  const TransportDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.TransportDetailslist
  );

  console.log("TransportDetails", TransportDetails);

const TransportBody= {
    "aiUserId":4162,
    "aiSchoolId":122,
    "aiAcademicYearId":7,
    "aiTypeId":1
}

useEffect(() => {
  dispatch(getTransportDetails (TransportBody));
}, []);





  return (
    <div>
         <PageHeader heading={'Transport Details'} subheading={''} />

    </div>
  )
}

export default TransportDetails