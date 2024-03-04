import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import EventManagementForm from './EventManagementForm';
import EventManagementHeader from './EventManagementHeader';
import EventManagementList from './EventManagementList';

const EventManagement = () => {
    const { SelectedDate, StandardId, DivisionId } = useParams();

    const [EventId, setEventId] = useState('');
    const [AddNewEventClicked, setAddNewEventClicked] = useState(true);

    const clickEventEdit = (value) => {
        setEventId(value)
    }
    console.log(EventId, "EventId");

    const ClickAddNewEvent = () => {
        setAddNewEventClicked(!AddNewEventClicked)
    }
    return (
        <>
            <Container sx={{ mt: 4.5 }} maxWidth={'xl'}>
                <EventManagementHeader ClickAddNewEvent={ClickAddNewEvent} />
                <Box sx={{ backgroundColor: 'white', mt: 2 }} p={2}>
                    <Box mt={1.5} sx={{ backgroundColor: 'white' }}>
                        <EventManagementList clickEventEdit={clickEventEdit}
                            SelectedDate={SelectedDate} StandardId={StandardId}
                            DivisionId={DivisionId} />
                        <EventManagementForm EventId={EventId} AddNewEventClicked={AddNewEventClicked} />
                    </Box>
                </Box>
            </Container >
        </>)
};

export default EventManagement