import { QuestionMark } from '@mui/icons-material';
import DocumentIcon from '@mui/icons-material/Description';
import FamilyIcon from '@mui/icons-material/FamilyRestroom';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Grid, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import AddmissionDocumentInformation from './AddmissionDocumentInformation';
import AdmissionDetails from './AdmissionDetails ';
import FamilyDetails from './FamilyDetails';
import PersonalDetails from './PersonalDetails'; // Assuming PersonalDetails is already created
import StudentProfileHeader from './StudentProfileHeader';

const StudentRegistrationForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(20);


    const [status, setStatus] = useState({
        admissionDetails: null,
        personalDetails: null,
    });



    const handleSave = (isSuccessful: boolean) => {
        if (currentTab === 0) {
            setStatus(prevStatus => ({ ...prevStatus, admissionDetails: isSuccessful }));
        } else if (currentTab === 1) {
            setStatus(prevStatus => ({ ...prevStatus, personalDetails: isSuccessful }));
        }

        if (isSuccessful) {
            // Slide to the next tab automatically if the form is successfully saved
            setCurrentTab(prevTab => prevTab + 1);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
                    { title: 'Enter Students Details', path: '/extended-sidebar/Teacher/Students/StudentRegistrationForm' },
                ]}
                rightActions={
                    <>
                        <Tooltip title={'View exam dates for each exam associated with standards.'}>
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
                        <Tooltip title={'Save'}>
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
            <Box sx={{ backgroundColor: 'white', p: 1 }}>
                <StudentProfileHeader />
            </Box>

            {/* Profile Completion Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1, backgroundColor: 'white', p: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Profile Completeness</Typography>
                <LinearProgress variant="determinate" value={profileCompletion} sx={{ flexGrow: 1, height: 10 }} />
                <Typography variant="body1" sx={{ ml: 2 }}>{profileCompletion}%</Typography>
            </Box>


            <Box sx={{ pl: 10, backgroundColor: 'white', minHeight: '100px' }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons={false}  // Disable the scroll arrows
                    aria-label="Student Registration Tabs"
                    sx={{

                        '& .MuiTab-root': {
                            minHeight: '60px',
                            minWidth: 120,
                            borderRadius: '10px',
                            textTransform: 'none',
                            color: '#38548A',
                            backgroundColor: grey[200],

                            // backgroundColor: tabValidity.admissionDetails ? green[100] : grey[200],
                            mx: 2,
                            '&:hover': {
                                color: '#38548A',
                                backgroundColor: grey[400],
                            },
                            '&.Mui-selected': {
                                backgroundColor: blue[300],
                                color: 'white',
                            },
                            '&.Mui-focusVisible': {
                                outline: '2px solid blue',
                            }
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        }
                    }}
                >
                    <Tab sx={{ m: 2 }} icon={<PersonIcon />} label="Admission Details" />
                    <Tab sx={{ m: 2 }} icon={<PersonIcon />} label="Personal Details" />
                    <Tab sx={{ m: 2 }} icon={<FamilyIcon />} label="Admission Document Information" />
                    <Tab sx={{ m: 2 }} icon={<DocumentIcon />} label="Family Details" />
                    <Tab sx={{ m: 2 }} icon={<SchoolIcon />} label="Additional Details" />
                    <Tab sx={{ m: 2 }} icon={<InfoIcon />} label="Student Stream / Subject Details" />
                </Tabs>
            </Box>

            <Box >
                {currentTab === 0 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* {status.admissionDetails !== null && (
                                <Alert severity={status.admissionDetails ? 'success' : 'error'}>
                                    {status.admissionDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
                        </Grid>
                        <Grid item xs={12}>
                            <AdmissionDetails onSave={handleSave} />
                        </Grid>
                    </Grid>
                )}
                {currentTab === 1 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
                        </Grid>
                        <Grid item xs={12}>
                            <PersonalDetails onSave={handleSave} />
                        </Grid>
                    </Grid>
                )}
                {/* Add additional tab contents here */}
                {currentTab === 2 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
                        </Grid>
                        <Grid item xs={12}>
                            <AddmissionDocumentInformation onSave={handleSave} />
                        </Grid>
                    </Grid>
                )}
                {currentTab === 3 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
                        </Grid>
                        <Grid item xs={12}>
                            <FamilyDetails onSave={handleSave} />
                        </Grid>
                    </Grid>
                )}
            </Box>

        </Box>
    );
};

export default StudentRegistrationForm;
