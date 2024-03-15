import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Stack } from "@mui/material";
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getFilePath } from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import BreadCrumbs from './BreadCrumbs';
import HeaderIcons from './HeaderIcons';
import UploadAnnualPlanner from './UploadAnnualPlanner';
const AnnualPlannerHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);

    const FileName: any = useSelector(
        (state: RootState) => state.AnnualPlanner.FilePath
    );

    const ScreensAccessPermission = JSON.parse(
        sessionStorage.getItem('ScreensAccessPermission')
    );
    let AnnualPlannerViewAccess = "N"
    ScreensAccessPermission?.map((item) => {
        if (item.ScreenName === 'Annual Planner') AnnualPlannerViewAccess = item.IsFullAccess;
    });
    const Note: string =
        'These events may change due to unavoidable reasons without prior notice.';
    const Note1: string =
        'Annual Planner With detailed event description of your school.';
    // const IconList = [
    //     { Id: 1, Icon: <PriorityHighIcon />, Title: Note, Action: 'Note' },
    //     { Id: 2, Icon: <QuestionMarkIcon />, Title: Note1, Action: 'Note1' },
    //     { Id: 1, Icon: <CalendarMonthIcon />, Title: 'Events Overview', Action: 'EventsOverview' },
    //     {
    //         Id: 4, Icon: AnnualPlannerViewAccess == "Y" ? <AddIcon /> : <Visibility />,
    //         Title: (AnnualPlannerViewAccess == "Y" ? 'Add' : '') + ' Annual Planner', Action: 'AddAnnualPlanner'
    //     },

    // ]
    const IconList = [
        {
            Id: 1,
            Icon: <PriorityHighIcon />,
            Title: Note,
            Action: 'Note',
            sx: {
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                    backgroundColor: grey[600]
                }
            }
        },
        {
            Id: 2, Icon: <QuestionMarkIcon />, Title: Note1, Action: 'Note1', sx: {
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                    backgroundColor: grey[600]
                }
            }
        },
        {
            Id: 3, Icon: <CalendarMonthIcon />, Title: 'Events Overview', Action: 'EventsOverview', sx: {
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                    backgroundColor: grey[600]
                }
            }
        },
        ...(AnnualPlannerViewAccess === 'Y'
            ? [{
                Id: 5, Icon: <AddIcon />, Title: 'Add Annual Planner', Action: 'AddAnnualPlanner', sx: {
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                        backgroundColor: grey[700]
                    }
                }
            }]
            : []),
        ...(FileName !== '' && AnnualPlannerViewAccess === 'N'
            ? [{
                Id: 4, Icon: <Visibility />, Title: 'Annual Planner', Action: 'AddAnnualPlanner', sx: {
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                        backgroundColor: grey[600]
                    }
                }
            }]
            : [])
    ];

    const ClickIcon = (value) => {
        if (value == 'EventsOverview') {
            navigate('/extended-sidebar/Common/EventOverview');
        }
        if (value == 'AddAnnualPlanner') {
            if (AnnualPlannerViewAccess == "N") {
                if (FileName !== '') {
                    window.open(localStorage.getItem('SiteURL') + FileName);
                }

            }
            else
                setOpenAnnualPlannerDialog(true);
        }

    }

    useEffect(() => {

        const FilepathBody = {
            aiSchoolId: localStorage.getItem('localSchoolId'),
            aiAcademicYearId: sessionStorage.getItem('AcademicYearId')
        };
        dispatch(getFilePath(FilepathBody));
    }, []);
    const Breadcrumbs = [{
        Id: 1,
        Name: 'Annual Planner',
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

export default AnnualPlannerHeader