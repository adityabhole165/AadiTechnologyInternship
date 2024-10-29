import { QuestionMark } from '@mui/icons-material';
import DocumentIcon from '@mui/icons-material/Description';
import FamilyIcon from '@mui/icons-material/FamilyRestroom';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import AdditionalDetails from './AdditionalDetails';
import AddmissionDocumentInformation from './AddmissionDocumentInformation';
import AdmissionDetails from './AdmissionDetails ';
import FamilyDetails from './FamilyDetails';
import PersonalDetails from './PersonalDetails'; // Assuming PersonalDetails is already created
import StudentProfileHeader from './StudentProfileHeader';
import StudentSubjectDetails from './StudentSubjectDetails';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const StudentRegistrationForm = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(20);

  const handleSave = (isSuccessful: boolean) => {
    if (currentTab === 0) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        admissionDetails: isSuccessful
      }));
    } else if (currentTab === 1) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        personalDetails: isSuccessful
      }));
    }

    if (isSuccessful) {
      // Slide to the next tab automatically if the form is successfully saved
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  const handleNextTab = () => {
    setCurrentTab((prevTab) => Math.min(prevTab + 1, 5)); // Move to the next tab
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => Math.max(prevTab - 1, 0)); // Move to the previous tab
  };
  // Track the validation status for each tab
  const [status, setStatus] = useState({
    admissionDetails: null,
    personalDetails: null,
    admissionDocuments: null,
    familyDetails: null,
    additionalDetails: null,
    streamDetails: null
  });
  // const validateAllTabs = () => {
  //     const updatedStatus = {
  //         admissionDetails: validateAdmissionDetails(),
  //         personalDetails: validatePersonalDetails(),
  //         admissionDocuments: validateAdmissionDocuments(),
  //         familyDetails: validateFamilyDetails(),
  //         additionalDetails: validateAdditionalDetails(),
  //         streamDetails: validateStreamDetails(),
  //     };
  //     setStatus(updatedStatus);

  //     // Return true if all tabs are valid
  //     return Object.values(updatedStatus).every((isValid) => isValid);
  // };
  // const handleSaveClick = () => {
  //     const allValid = validateAllTabs();
  //     if (!allValid) {
  //         // Show an alert if any tab has unfilled required fields
  //         alert('Some fields are missing or incorrect.');
  //     } else {
  //         alert('All required fields are filled, saving draft!');
  //     }
  // };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/Students/StudentRegistrationForm'
          }
        ]}
        rightActions={
          <>
            <Tooltip
              title={'View exam dates for each exam associated with standards.'}
            >
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 1,
          backgroundColor: 'white',
          p: 2
        }}
      >
        <Typography variant="body1" sx={{ mr: 2 }}>
          Completeness
        </Typography>
        <LinearProgress
          variant="determinate"
          value={profileCompletion}
          sx={{ flexGrow: 1, height: 10 }}
        />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {profileCompletion}%
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          minHeight: '100px',
          display: 'flex',
          justifyContent: 'center',
          mb:0
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false} // Disable the scroll arrows
          aria-label="Student Registration Tabs"
          sx={{
            '& .MuiTab-root': {
              minHeight: '60px',
              borderRadius: '10px',
              textTransform: 'none',
              color: '#38548A',
              backgroundColor: grey[200],

              // backgroundColor: tabValidity.admissionDetails ? green[100] : grey[200],
              '&:hover': {
                color: '#38548A',
                backgroundColor: grey[400]
              },
              '&.Mui-selected': {
                backgroundColor: blue[300],
                color: 'white'
              },
              '&.Mui-focusVisible': {
                outline: '2px solid blue'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<SchoolIcon />}
            label="Admission Details"
          />
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<AccountCircleIcon />}
            label="Personal Details"
          />
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<DocumentIcon />}
            label="Admission Documents"
          />
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<FamilyRestroomIcon />}
            label="Family Details"
          />
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<GroupAddIcon />}
            label="Additional Details"
          />
          <Tab
            sx={{ m: 2, minWidth: 150 }}
            icon={<InfoIcon />}
            label="Stream Details"
          />
        </Tabs>
      </Box>

      <Box>
        {currentTab === 0 && (
          <Grid container spacing={1}>
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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12} >
              <PersonalDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {/* Add additional tab contents here */}
        {currentTab === 2 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
        {currentTab === 4 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12} >
              <AdditionalDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 5 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12} >
              <StudentSubjectDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' }, // Center buttons on smaller screens
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on smaller screens
          gap: 2, // Add some space between buttons
          p: { xs: 1, sm: 2 }, // Adjust padding for smaller screens
          backgroundColor: 'white'
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousTab}
          disabled={currentTab === 0}
          sx={{
            backgroundColor: grey[100],
            color: 'blue',
            '&:hover': { color: 'blue', backgroundColor: blue[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextTab}
          disabled={currentTab === 5} // Disable if on the last tab
          sx={{
            backgroundColor: grey[100],
            color: 'green',
            '&:hover': { color: 'green', backgroundColor: green[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;
