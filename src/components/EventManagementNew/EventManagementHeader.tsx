import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { green, grey } from '@mui/material/colors';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import HeaderIcons from '../AnnualPlannerNew/HeaderIcons';
import UploadAnnualPlanner from '../AnnualPlannerNew/UploadAnnualPlanner';
import CommonPageHeader from '../CommonPageHeader';

const EventManagementHeader = ({ ClickAddNewEvent, ClickSave }) => {
    const navigate = useNavigate();
    const { SelectedDate, StandardId, DivisionId } = useParams();
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
                '&:hover': { backgroundColor: grey[600] }
            }
        },
        {
            Id: 4,
            Icon: <AddIcon />,
            Title: 'Add New Event',
            Action: 'AddNewEvent',
            sx: {
                color: 'white',
                backgroundColor: green[500],
                '&:hover': { backgroundColor: green[600] }
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
                '&:hover': { backgroundColor: green[600] }
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
        Value: '/extended-sidebar/Common/AnnualPlanner/' + SelectedDate + '/' + StandardId + '/' + DivisionId,
        IsActive: false
    }, {
        Id: 2,
        Name: 'Event(s) Management',
        IsActive: true
    }]
    return (
        <>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Annual Planner',
                        path: '/extended-sidebar/Common/AnnualPlanner/' + SelectedDate + '/' + StandardId + '/' + DivisionId
                    },
                    {
                        title: 'Event(s) Management',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <HeaderIcons IconList={IconList} ClickIcon={ClickIcon} />
                    </>
                }
            />
            {openAnnualPlannerDialog && (
                <UploadAnnualPlanner openAnnualPlannerDialog={openAnnualPlannerDialog}
                    setOpenAnnualPlannerDialog={setOpenAnnualPlannerDialog} />

            )}
        </>
    )
}

export default EventManagementHeader