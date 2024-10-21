import DocumentIcon from '@mui/icons-material/Description';
import FamilyIcon from '@mui/icons-material/FamilyRestroom';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import { Alert, Box, Grid, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { green, grey, orange } from '@mui/material/colors';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import AdmissionDetails from './AdmissionDetails ';
import PersonalDetails from './PersonalDetails';
const StudentRegistrationForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(20); // Example initial percentage
    const [status, setStatus] = useState({
        admissionDetails: null,
        personalDetails: null,
        parentsDetails: null,
        otherDetails: null,
        admissionDocumentInformation: null,
        lastSchoolDetails: null,
        additionalDetails: null,
    });
    const [admissionDetailsField1, setAdmissionDetailsField1] = useState('');
    const [admissionDetailsField2, setAdmissionDetailsField2] = useState('');
    const [personalDetailsField1, setPersonalDetailsField1] = useState('');
    const [personalDetailsField2, setPersonalDetailsField2] = useState('');
    const [parentsDetailsField1, setParentsDetailsField1] = useState('');
    const [admissionDocumentField1, setAdmissionDocumentField1] = useState('');
    const [lastSchoolField1, setLastSchoolField1] = useState('');

    // Validity state for each tab
    const [tabValidity, setTabValidity] = useState({
        admissionDetails: false,
        personalDetails: false,
        parentsDetails: false,
        otherDetails: false,
        admissionDocumentInformation: false,
        lastSchoolDetails: false,
        additionalDetails: false,
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for mobile screens

    const validateFields = () => {
        // Example validation logic
        const newTabValidity = { ...tabValidity };

        // Replace with your actual validation logic
        newTabValidity.admissionDetails = !!(admissionDetailsField1 && admissionDetailsField2); // Check if mandatory fields are filled
        newTabValidity.personalDetails = !!(personalDetailsField1 && personalDetailsField2); // Replace with actual field checks
        newTabValidity.parentsDetails = !!(parentsDetailsField1); // Check if at least one mandatory field is filled
        newTabValidity.otherDetails = true; // Assuming no mandatory fields for this tab
        newTabValidity.admissionDocumentInformation = !!(admissionDocumentField1); // Check if mandatory field is filled
        newTabValidity.lastSchoolDetails = !!(lastSchoolField1); // Check if mandatory field is filled
        newTabValidity.additionalDetails = true; // Assuming no mandatory fields for this tab

        setTabValidity(newTabValidity);
    };

    const handleSave = (isSuccessful: boolean) => {
        if (currentTab === 0) {
            setStatus(prevStatus => ({ ...prevStatus, admissionDetails: isSuccessful }));
        }
        // Validate fields after saving
        validateFields();
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
                        <Tooltip title={'Save the current exam schedule'}>
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
                <Box sx={{ mt: 2, alignItems: 'center' }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        //  scrollButtons="off"
                        aria-label="Student Registration Tabs"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: '60px',
                                minWidth: 120,
                                borderRadius: '10px',
                                textTransform: 'none',
                                color: '#38548A',
                                backgroundColor: tabValidity.admissionDetails ? green[100] : grey[200], // Set color based on validity
                                mx: 1,
                                '&:hover': {
                                    color: '#38548A',
                                    backgroundColor: grey[400],
                                },
                                '&.Mui-selected': {
                                    backgroundColor: orange[500],
                                    color: 'white',
                                }
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            }
                        }}
                    >
                        <Tab icon={<PersonIcon />} label="Admission Details" />
                        <Tab icon={<PersonIcon />} label="Personal Details" />
                        <Tab icon={<FamilyIcon />} label="Parents Details" />
                        <Tab icon={<DocumentIcon />} label="Other Details" />
                        <Tab icon={<SchoolIcon />} label="Admission Document Information" />
                        <Tab icon={<InfoIcon />} label="Last School Details" />
                        <Tab icon={<InfoIcon />} label="Additional Details" />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                <Box sx={{ mt: 5 }}>
                    {currentTab === 0 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                    {currentTab === 1 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/* <Typography variant="h6">Personal Details Form Placeholder</Typography> */}
                            </Grid>
                            <Grid item xs={12}>
                                <PersonalDetails onSave={handleSave} />
                            </Grid>
                        </Grid>
                    )}
                    {currentTab === 2 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Parents Details Form Placeholder</Typography>
                            </Grid>
                        </Grid>
                    )}
                    {/* Add additional tab content as necessary */}
                </Box>
            </Box>
        </Box>
    );
};

export default StudentRegistrationForm;
