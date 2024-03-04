import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Stack } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../AnnualPlannerNew/BreadCrumbs';
import HeaderIcons from '../AnnualPlannerNew/HeaderIcons';
import UploadAnnualPlanner from '../AnnualPlannerNew/UploadAnnualPlanner';

const EventManagementHeader = ({ ClickAddNewEvent }) => {
    const navigate = useNavigate();
    const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);
    const Note: string =
        'These events may change due to unavoidable reasons without prior notice.';
    const IconList = [
        { Id: 1, Icon: <PriorityHighIcon />, Title: Note, Action: 'Note' },
        { Id: 2, Icon: <QuestionMarkIcon />, Title: 'Help', Action: 'Help' },
        { Id: 1, Icon: <CalendarMonthIcon />, Title: 'Events Overview', Action: 'EventsOverview' },
        { Id: 4, Icon: <AddIcon />, Title: 'Add New Event', Action: 'AddNewEvent' },
    ]
    const ClickIcon = (value) => {
        if (value == 'EventsOverview') {
            navigate('/extended-sidebar/Common/EventOverview');
        }
        if (value == 'AddNewEvent') {
            ClickAddNewEvent();
        }
    }
    const Breadcrumbs = [{
        Id: 1,
        Name: 'Annual Planner',
        Value: '/extended-sidebar/Common/AnnualPlanner',
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