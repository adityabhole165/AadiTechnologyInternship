import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronRightTwoTone from "@mui/icons-material/ChevronRightTwoTone";
import HomeTwoTone from "@mui/icons-material/HomeTwoTone";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Breadcrumbs, IconButton, Stack, Typography } from "@mui/material";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import HeaderIcons from './HeaderIcons';
import UploadAnnualPlanner from './UploadAnnualPlanner';

const AnnualPlannerHeader = () => {
    const navigate = useNavigate();
    const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);
    const Note: string =
        'These events may change due to unavoidable reasons without prior notice.';
    const IconList = [
        { Id: 1, Icon: <PriorityHighIcon />, Title: Note, Action: 'Note' },
        { Id: 2, Icon: <QuestionMarkIcon />, Title: 'Help', Action: 'Help' },
        { Id: 1, Icon: <CalendarMonthIcon />, Title: 'Events Overview', Action: 'EventsOverview' },
        { Id: 4, Icon: <AddIcon />, Title: 'Add Annual Planner', Action: 'AddAnnualPlanner' },
    ]
    const ClickIcon = (value) => {
        if (value == 'EventsOverview') {
            navigate('/extended-sidebar/Common/EventOverview');
        }
        if (value == 'AddAnnualPlanner') {
            setOpenAnnualPlannerDialog(true);
        }
    }
    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Box>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<ChevronRightTwoTone />}
                    >
                        <Link
                            to={'/extended-sidebar/landing/landing'}
                            color="inherit"
                            style={{ textDecoration: 'none' }}
                        >
                            <IconButton
                                sx={{
                                    background: (theme) => theme.palette.common.white,
                                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                                }}
                            >
                                <HomeTwoTone color="primary" />
                            </IconButton>
                        </Link>{' '}
                        <Typography
                            variant={'h3'}
                            fontSize={'23px'}
                            color="text.primary"
                        >
                            Annual Planner
                        </Typography>
                    </Breadcrumbs>
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