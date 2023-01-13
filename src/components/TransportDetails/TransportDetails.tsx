import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import Card8 from 'src/libraries/mainCard/Card8';
import { Button, Container, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card10 from 'src/libraries/mainCard/Card10';
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
  const TrackingMessage: any = useSelector(
    (state: RootState) => state.TransportDetails.TrackingMessage
  );
  const loading = useSelector(
    (state: RootState) => state.TransportDetails.Loading
  );

  let screenWidth = window.innerWidth * 0.9;
  const [showMyStop, setShowMyStop] = useState(true)
  const [alignment, setAlignment] = React.useState('1');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment != null)
      setAlignment(newAlignment);
  };
  useEffect(() => {
    const TransportBody: GetStudentTransportDetailsBody = {
      aiUserId: parseInt(sessionStorage.getItem('Id')),
      aiSchoolId: parseInt(localStorage.getItem('localSchoolId')),
      aiAcademicYearId: parseInt(sessionStorage.getItem('AcademicYearId')),
      aiTypeId: parseInt(alignment)
    }
    // const TransportBody: GetStudentTransportDetailsBody = {
    //   aiUserId: 4162,
    //   aiSchoolId: 122,
    //   aiAcademicYearId: 7,
    //   aiTypeId: parseInt(alignment)
    // }
    dispatch(getTransportDetails(TransportBody));
  }, [alignment]);

  return (
    <Container>
      <PageHeader heading={'Transport Details'} subheading={''} />
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="1"
        >Pick-up</ToggleButton>
        <ToggleButton value="2">Drop</ToggleButton>
      </ToggleButtonGroup>
      <div>
        {loading ? <SuspenseLoader /> :
          RouteDetails.length === 0 ?
            <ErrorMessages Error={(alignment === "1" ? "Pick-up" : "Drop") + " is not associated yet"} /> :

            (<>
              <Card8 itemList={RouteDetails} />

              {
                StopDetails?.map((item, i) => {
                  return (
                    (showMyStop ? item.IsMyStop : true) &&
                    // <Card8 itemList={item.StopDetail} Selected={showMyStop ? false : item.IsMyStop} key={i} />)
                    <Card10 item={item.StopDetail} selected={showMyStop ? false : item.IsMyStop} />)
                })
              }
              <ButtonPrimary color={showMyStop ? 'primary' : 'warning'} onClick={() => { setShowMyStop(false) }}>
                Show All Stop
              </ButtonPrimary>
              <ButtonPrimary color={showMyStop ? 'warning' : 'primary'} onClick={() => { setShowMyStop(true) }}>
                Show My Stop
              </ButtonPrimary>
              <br></br>
              <br></br>
              {TrackingURI !== "" && TrackingMessage == "" ?
                <iframe allowFullScreen width={screenWidth} height="385px" title="Vehicle Tracking"
                  src={TrackingURI}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                > </iframe>
                : null
              }
            </>)}
      </div>
    </Container>
  )
}

export default TransportDetails