import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import Card8 from 'src/libraries/mainCard/Card8';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
function TransportDetails() {

  const dispatch = useDispatch();

  const RouteDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.RouteDetails
  );
  const StopDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.StopDetails
  );
  const TrackingURI: any = useSelector(
    (state: RootState) => state.TransportDetails.TrackingURL
  );
  let screenWidth = window.innerWidth * 0.9;
  const [showMyStop, setShowMyStop] = useState(true)
  const [alignment, setAlignment] = React.useState('1');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  console.log(TrackingURI,"-")
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
      aiTypeId: parseInt(alignment)
    }
    dispatch(getTransportDetails(TransportBody));
  }, [alignment]);
  
  return (
    <div>
      <PageHeader heading={'Transport Details'} subheading={''} />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="1">Pickup</ToggleButton>
        <ToggleButton value="2">Drop</ToggleButton>
      </ToggleButtonGroup>
      <Card8 itemList={RouteDetails} />
      {
        StopDetails?.map((item, i) => {
          return (
            (showMyStop ? item.IsMyStop : true) &&
            <Card8 itemList={item.StopDetail} Selected={item.IsMyStop} key={i} />)
        })
      }
      <Button onClick={() => { setShowMyStop(!showMyStop) }}>
        {showMyStop ? "Show All Stop" : "Show My Stop"}
      </Button>
      <br></br>
      {showMyStop &&
        (<iframe allowFullScreen width={screenWidth} height="385px" title="Vehicle Tracking"
          src={TrackingURI}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        >
        </iframe>)
      }
    </div>
  )
}

export default TransportDetails