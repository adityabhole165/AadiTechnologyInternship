import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Box, Grid, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useState } from 'react';

import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CommonPageHeader from '../CommonPageHeader';
import AdmissionDetails from './AdmissionDetails ';
import { Height, Margin, Padding } from '@mui/icons-material';

const StudentRegistrationForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(30); // Example initial percentage
    const [status, setStatus] = useState({
        admissionDetails: null, // To track success or error in Admission Details tab
        personalDetails: null,
        parentsDetails: null
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for mobile screens

    const handleSave = (isSuccessful) => {
        // Update the status of the current tab based on success or failure
        if (currentTab === 0) {
            setStatus(prevStatus => ({ ...prevStatus, admissionDetails: isSuccessful }));
        }
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // Function to dynamically style tabs based on their status
    const getTabStyle = (tabStatus) => {
        if (tabStatus === null) {
            return {
                color: 'inherit',
                backgroundColor: 'inherit',
               
            };
        }
        if (tabStatus) {
            // When fields are filled correctly
            return {
                color: green[700],
                backgroundColor: green[100],
            };
        }
        // When mandatory fields are not filled
        return {
            color: red[700],
            backgroundColor: red[100],
        };
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Students',
                        path: '/extended-sidebar/Teacher/Students',
                    },
                    {
                        title: 'Enter Students Details',
                        path: '/extended-sidebar/Teacher/Students/StudentRegistrationForm',
                    },
                ]}
                rightActions={
                    <>
                        <Tooltip title={'View exam dates for each exam associated for standards.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'View exam schedule'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}
                            >
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            />

            {/* Profile Completion Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2, backgroundColor: 'white', p: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Profile Completeness</Typography>
                <LinearProgress variant="determinate" value={profileCompletion} sx={{ flexGrow: 1, height: 10 }} />
                <Typography variant="body1" sx={{ ml: 2 }}>{profileCompletion}%</Typography>
            </Box>

            <Box sx={{ p: 2, backgroundColor: 'white' }}>
                <Box>
                {/* Responsive Tabs */}
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    sx={{
                        maxWidth: isMobile ? '100%' : '80%', // Width adjustments for responsiveness
                        maxHeight: isMobile ? '100%' : '100%', 
                        margin: 'auto',
                        mt: 2,
                        '.MuiTab-root': { // Styling for each tab
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}
                >
                    {/* Tabs with icons similar to the steps shown in the image */}
                    <Tab
                        label="Personal Information"
                        icon={<PersonIcon />}
                        sx={{
                            ...getTabStyle(status.admissionDetails),
                           
                        }}
                    />
                    <Tab
                        label="Address Information"
                        icon={<HomeIcon />}
                        sx={{
                            ...getTabStyle(status.personalDetails),
                       
                        }}
                    />
                    <Tab
                        label="Other Information"
                        icon={<InfoIcon />}
                        sx={{
                            ...getTabStyle(status.parentsDetails),
                           
                        }}
                    />
                    <Tab
                        label="Current Course"
                        icon={<BookIcon />}
                        sx={{
                            color: currentTab === 3 ? blue[700] : 'inherit',
                            backgroundColor: currentTab === 3 ? blue[100] : 'inherit',
                            
                        }}
                    />
                    <Tab
                        label="Past Qualification"
                        icon={<SchoolIcon />}
                        sx={{
                            color: currentTab === 4 ? blue[700] : 'inherit',
                            backgroundColor: currentTab === 4 ? blue[100] : 'inherit',
                            
                        }}
                    />
                    <Tab
                        label="Hostel Details"
                        icon={<HomeIcon />}
                        sx={{
                            color: currentTab === 5 ? blue[700] : 'inherit',
                            backgroundColor: currentTab === 5 ? blue[100] : 'inherit',
                            
                        }}
                    />
                </Tabs>
                </Box>  
                {/* Tab Content */}
                <Box sx={{ mt: 5 }}>
                    {currentTab === 0 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/* Show success/error alert */}
                                {status.admissionDetails !== null && (
                                    <Alert severity={status.admissionDetails ? 'success' : 'error'}>
                                        {status.admissionDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                    </Alert>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <AdmissionDetails onSave={handleSave} />
                            </Grid>
                        </Grid>
                    )}

                    {/* Placeholder for other tabs (Personal Details, Parents Details) */}
                    {currentTab === 1 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Address Information Form Placeholder</Typography>
                            </Grid>
                        </Grid>
                    )}

                    {currentTab === 2 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Other Information Form Placeholder</Typography>
                            </Grid>
                        </Grid>
                    )}
                </Box>
                </Box>
        </Box>
    );
};

export default StudentRegistrationForm;
