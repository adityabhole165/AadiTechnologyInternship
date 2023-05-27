import { Typography, Grid, Avatar, Container, Button } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Note from 'src/libraries/Note/Note'
import Card10 from 'src/libraries/mainCard/Card10'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import RefreshIcon from '@mui/icons-material/Refresh';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TransportDetails from './TransportDetails';
import { getTransportDetails } from 'src/requests/TransportDetails/RequestTransportDetails';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
function Map() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { PickDrop } = useParams();

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
    const [showMyStop, setShowMyStop] = useState(true)
    const [isRefresh, setIsRefresh] = React.useState(false);
    const [alignment, setAlignment] = React.useState('1');

    const refresh = () => window.location.reload()
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
        dispatch(getTransportDetails(TransportBody));
    }, [alignment, isRefresh]);





    return (
        <Container>



            <BackButton FromRoute={"/Student/TransportDetails/" + PickDrop} />


            <PageHeader heading={PickDrop} subheading={''} />

            <Avatar onClick={() => { setIsRefresh(!isRefresh) }} sx={{ height: 40, width: 40, color: "black", float: "right", mt: "-50px" }}><RefreshIcon fontSize='small' /></Avatar>
            {OtherTrackingDetails.ShowStops ?
                <>
                    {StopDetails?.map((item, i) => {
                        return (
                            (showMyStop ? item.IsMyStop : true) &&
                            <Card10 item={item.StopDetail} selected={showMyStop ? false : item.IsMyStop} key={i} />)
                    })

                    }
                    <Grid container spacing={2} sx={{ mb: "10px" }}>
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
                </> : null}

            {OtherTrackingDetails.TrackingURL !== "" ?
                <><Grid container>
                    <Grid item xs={11}>

                    </Grid><Grid item xs={1}>

                    </Grid></Grid>

                    {loading ? <SuspenseLoader /> :
                    OtherTrackingDetails.TrackingMessage == "" ?
                        <>
                            <iframe allowFullScreen style={{ border: "none" }} width="100%" height="580px" title="Vehicle Tracking"
                                src={OtherTrackingDetails.TrackingURL}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            > </iframe>
                        </>
                        : <Note NoteDetail={[OtherTrackingDetails.TrackingMessage]}></Note>
                    }
                </> : null
            }



        </Container >
    )
}

export default Map