import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import EventManagementForm from './EventManagementForm';
import EventManagementHeader from './EventManagementHeader';
import EventManagementList from './EventManagementList';

const EventManagement = () => {
    const { SelectedDate, StandardId, DivisionId } = useParams();

    const [EventId, setEventId] = useState(0);
    const [AddNewEventClicked, setAddNewEventClicked] = useState(0);
    const [SaveClicked, setSaveClicked] = useState(0);

    const clickEventEdit = (value) => {
        setEventId(value)
    }
    const ClickSave = () => {
        setSaveClicked(SaveClicked + 1)
    }
    const ClickAddNewEvent = () => {
        setAddNewEventClicked(AddNewEventClicked + 1)
        setEventId(0)
    }
    return (
        <>
            <Container sx={{ mt: 4.5 }} maxWidth={'xl'}>
                <EventManagementHeader ClickAddNewEvent={ClickAddNewEvent}
                    ClickSave={ClickSave} />
                <Box sx={{ backgroundColor: 'white', mt: 2 }} p={2}>
                    <Box mt={1.5} sx={{ backgroundColor: 'white' }}>
                        <EventManagementList clickEventEdit={clickEventEdit}
                            SelectedDate={SelectedDate} StandardId={StandardId}
                            DivisionId={DivisionId} />
                        <EventManagementForm EventId={EventId} SelectedDate={SelectedDate}
                            AddNewEventClicked={AddNewEventClicked}
                            SaveClicked={SaveClicked} />
                    </Box>
                </Box>
            </Container >
        </>)
};

export default EventManagement