import { Box } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import { decodeURL } from '../Common/Util';
import EventManagementForm from './EventManagementForm';
import EventManagementHeader from './EventManagementHeader';
import EventManagementList from './EventManagementList';

const EventManagement = () => {
    let {
        SelectedDate,
        StandardId,
        DivisionId
    } = useParams();

    // Decode in-place
    SelectedDate = decodeURL(SelectedDate);
    StandardId = decodeURL(StandardId);
    DivisionId = decodeURL(DivisionId);


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
            <Box sx={{ px: 2 }}>
                <EventManagementHeader ClickAddNewEvent={ClickAddNewEvent}
                    ClickSave={ClickSave} />
                <Box sx={{ backgroundColor: 'white' }} p={2}>
                    <Box mt={1.5} sx={{ backgroundColor: 'white' }}>
                        <EventManagementList clickEventEdit={clickEventEdit}
                            SelectedDate={SelectedDate} StandardId={StandardId}
                            DivisionId={DivisionId} />
                        <EventManagementForm EventId={EventId}
                            AddNewEventClicked={AddNewEventClicked}
                            SaveClicked={SaveClicked} />
                    </Box>
                </Box>
            </Box >
        </>)
};

export default EventManagement