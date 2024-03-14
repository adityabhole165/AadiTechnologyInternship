import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Stack } from "@mui/material";
import { green, grey } from '@mui/material/colors';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../AnnualPlannerNew/BreadCrumbs';
import HeaderIcons from '../AnnualPlannerNew/HeaderIcons';
import UploadAnnualPlanner from '../AnnualPlannerNew/UploadAnnualPlanner';

const EventManagementHeader = ({ ClickAddNewEvent, ClickSave }) => {
    const navigate = useNavigate();
    const { SelectedDate } = useParams();
    const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);

    const Note: string =
        '        Event management for your school. Add events to be held in your school for the current academic year.';
    const IconList = [
        {
            Id: 2,
            Icon: <QuestionMarkIcon />,
            Title: Note,
            Action: 'Help',
            sx: {
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': { backgroundColor: grey[700] }
            }
        },
        {
            Id: 4,
            Icon: <AddIcon />,
            Title: 'Add New Event',
            Action: 'AddNewEvent',
            sx: {
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': { backgroundColor: grey[700] }
            }
        },
        {
            Id: 3,
            Icon: <SaveIcon />,
            Title: "Save",
            Action: "Save",
            sx: {
                color: 'white',
                backgroundColor: green[500],
                '&:hover': { backgroundColor: green[700] }
            }
        }
    ]
    const ClickIcon = (value) => {
        if (value == 'EventsOverview') {
            navigate('/extended-sidebar/Common/EventOverview');
        }
        if (value == 'Save') {
            ClickSave();
        }
        if (value == 'AddNewEvent') {
            ClickAddNewEvent();
        }
    }
    const Breadcrumbs = [{
        Id: 1,
        Name: 'Annual Planner',
        Value: '/extended-sidebar/Common/AnnualPlanner/' + SelectedDate,
        IsActive: false
    }, {
        Id: 2,
        Name: 'Event(s) Management',
        IsActive: true
    }]
    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Box>
                    <BreadCrumbs ItemList={Breadcrumbs} />
                </Box>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <HeaderIcons IconList={IconList} ClickIcon={ClickIcon} />
                </Stack>
            </Stack>
            {openAnnualPlannerDialog && (
                <UploadAnnualPlanner openAnnualPlannerDialog={openAnnualPlannerDialog}
                    setOpenAnnualPlannerDialog={setOpenAnnualPlannerDialog} />

            )}
        </>
    )
}

export default EventManagementHeader