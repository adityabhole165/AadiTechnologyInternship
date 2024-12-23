import RefreshIcon from '@mui/icons-material/Refresh';
import { Avatar, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Note from 'src/libraries/Note/Note';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card10 from 'src/libraries/mainCard/Card10';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
function Map() {
  const dispatch = useDispatch();
  const location = useLocation();
  let {
    PickDrop,
    alignment
  } = useParams();

  // Decode in-place
  PickDrop = decodeURL(PickDrop);
  alignment = decodeURL(alignment);


  // const variable = location.state?.variable;
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
  const [isRefresh, setIsRefresh] = React.useState(false);
  // const [alignment, setAlignment] = React.useState('1');
  // console.log("stop alignment",alignment);

  const refresh = () => window.location.reload();
  // const handleChange = (
  //     event: React.MouseEvent<HTMLElement>,
  //     newAlignment: string,
  // ) => {
  //     if (newAlignment != null)
  //         setAlignment(newAlignment);
  // };
  useEffect(() => {
    const TransportBody: GetStudentTransportDetailsBody = {
      aiUserId: parseInt(sessionStorage.getItem('Id')),
      aiSchoolId: parseInt(localStorage.getItem('localSchoolId')),
      aiAcademicYearId: parseInt(sessionStorage.getItem('AcademicYearId')),
      aiTypeId: parseInt(alignment)
    };
    dispatch(getTransportDetails(TransportBody));
  }, [alignment, isRefresh]);

  return (
    <Box sx={{ px: 2 }}>
      <BackButton FromRoute={'/Student/TransportDetails/' + PickDrop} />

      <PageHeader heading={PickDrop} subheading={''} />

      <Avatar
        onClick={() => {
          setIsRefresh(!isRefresh);
        }}
        sx={{
          height: 40,
          width: 40,
          color: 'black',
          float: 'right',
          mt: '-50px'
        }}
      >
        <RefreshIcon fontSize="small" />
      </Avatar>
      {OtherTrackingDetails.ShowStops ? (
        <>
          {StopDetails?.map((item, i) => {
            return (
              (showMyStop ? item.IsMyStop : true) && (
                <Card10
                  item={item.StopDetail}
                  selected={showMyStop ? false : item.IsMyStop}
                  key={i}
                />
              )
            );
          })}
          <Grid container spacing={2} sx={{ mb: '10px' }}>
            <Grid item xs={6}>
              <ButtonPrimary
                fullWidth
                color={showMyStop ? 'primary' : 'warning'}
                onClick={() => {
                  setShowMyStop(false);
                }}
              >
                Show All Stops
              </ButtonPrimary>
            </Grid>
            <Grid item xs={6}>
              <ButtonPrimary
                fullWidth
                color={showMyStop ? 'warning' : 'primary'}
                onClick={() => {
                  setShowMyStop(true);
                }}
              >
                Show My Stop
              </ButtonPrimary>
            </Grid>
          </Grid>
        </>
      ) : null}

      {OtherTrackingDetails.TrackingURL !== '' ? (
        <>
          <Grid container>
            <Grid item xs={11}></Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          {loading ? (
            <SuspenseLoader />
          ) : OtherTrackingDetails.TrackingMessage == '' ? (
            <>
              <iframe
                allowFullScreen
                style={{ border: 'none' }}
                width="100%"
                height="580px"
                title="Vehicle Tracking"
                src={OtherTrackingDetails.TrackingURL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              >
                {' '}
              </iframe>
            </>
          ) : (
            <Note NoteDetail={[OtherTrackingDetails.TrackingMessage]}></Note>
          )}
        </>
      ) : null}
    </Box>
  );
}

export default Map;
