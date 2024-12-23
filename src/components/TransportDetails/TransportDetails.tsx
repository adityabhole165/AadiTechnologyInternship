import {
  Box,
  Grow,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card8 from 'src/libraries/mainCard/Card8';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import { RootState } from 'src/store';
import { encodeURL,decodeURL } from '../Common/Util';
function TransportDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RouteDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.RouteDetails
  );
  const StopDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.StopDetails
  );
  const OtherTrackingDetails: any = useSelector(
    (state: RootState) => state.TransportDetails.OtherTrackingDetails
  );
  const loading = useSelector(
    (state: RootState) => state.TransportDetails.Loading
  );

  const [showMyStop, setShowMyStop] = useState(true);
  const [alignment, setAlignment] = React.useState('1');
  const [isRefresh, setIsRefresh] = React.useState(false);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment != null) setAlignment(newAlignment);
  };

  // useEffect(()=>{
  //   const { PickDrop } = useParams();
  //   setAlignment(PickDrop==='Drop Vehicle Tracking'? '2' :'1')
  // },[])
  let {
    PickDrop
  } = useParams();

  // Decode in-place
  PickDrop = decodeURL(PickDrop);

  useEffect(() => {
    setAlignment(PickDrop === 'Drop Vehicle Tracking' ? '2' : '1');
  }, []);
  useEffect(() => {
    const TransportBody: GetStudentTransportDetailsBody = {
      aiUserId: parseInt(sessionStorage.getItem('Id')),
      aiSchoolId: parseInt(localStorage.getItem('localSchoolId')),
      aiAcademicYearId: parseInt(sessionStorage.getItem('AcademicYearId')),
      aiTypeId: parseInt(alignment)
    };
    dispatch(getTransportDetails(TransportBody));
  }, [alignment, isRefresh]);

  const refresh = () => window.location.reload();
  const variableToPass =
    alignment === '1' ? 'Pick-up Vehicle Tracking' : 'Drop Vehicle Tracking';

  const Map = () => {
    navigate(
      '/RITeSchool/Student/TransportDetails/Map/' +
      encodeURL(variableToPass) +
      `/` +
      encodeURL(alignment)
    );
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Transport Details'} subheading={''} />

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '25px' }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ mb: 0.5 }}
        >
          <ToggleButton value="1">Pick-up</ToggleButton>
          <ToggleButton value="2">Drop</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1500 } : {})}
      >
        <Box>
          {loading ? (
            <SuspenseLoader />
          ) : RouteDetails.length === 0 ? (
            <ErrorMessages
              Error={
                (alignment === '1' ? 'Pick-up ' : 'Drop') +
                ' is not associated yet'
              }
            />
          ) : (
            <>
              <Card8 itemList={RouteDetails} />

              <ButtonPrimary onClick={Map} sx={{ mt: '25px', float: 'right' }}>
                {alignment === '1' ? 'Pick-up' : 'Drop'} Vehicle Tracking
              </ButtonPrimary>

              {/* {OtherTrackingDetails.ShowStops ?
                  <>
                    {StopDetails?.map((item, i) => {
                      return (
                        (showMyStop ? item.IsMyStop : true) &&
                        <Card10 item={item.StopDetail} selected={showMyStop ? false : item.IsMyStop} key={i} />)
                    })

                    } */}
              {/* <Grid container spacing={2} sx={{ mb: "10px" }}>
                      <Grid item xs={6}>
                        <ButtonPrimary fullWidth color={showMyStop ? 'primary' : 'warning'} onClick={() => { setShowMyStop(false) }}>
                          Show All Stops
                        </ButtonPrimary>
                      </Grid>
                      <Grid item xs={6}>
                        <ButtonPrimary fullWidth color={showMyStop ? 'warning' : 'primary'} onClick={() => { setShowMyStop(true) }}>
                          Show My Stop
                        </ButtonPrimary>
                      </Grid>
                    </Grid>
                  </> : null} */}

              {/* {OtherTrackingDetails.TrackingURI !== "" ?
                  <><Grid container>
                    <Grid item xs={11}>
                      <Typography variant='h5' sx={{ textAlign: "center", mb: 1 }}>{alignment === "1" ? "Pick-up" : "Drop"} Vehicle Tracking</Typography>
                    </Grid><Grid item xs={1}>
                      <Avatar onClick={() => { setIsRefresh(!isRefresh) }} sx={{ height: 25, width: 25, color: "black" }}><RefreshIcon fontSize='small' /></Avatar>
                    </Grid></Grid>
                    {OtherTrackingDetails.TrackingMessage == "" ?
                      <>
                        <iframe allowFullScreen style={{ border: "none" }} width="100%" height="385px" title="Vehicle Tracking"
                          src={OtherTrackingDetails.TrackingURI}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        > </iframe>
                      </>
                      : <Note NoteDetail={[OtherTrackingDetails.TrackingMessage]}></Note>
                    }
                  </> : null
                } */}
            </>
          )}
        </Box>
      </Grow>
      {/* <Map/> */}
    </Box>
  );
}

export default TransportDetails;
