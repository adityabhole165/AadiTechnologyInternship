import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material';
import AdmissionDetails from './AdmissionDetails ';

// import PersonalDetails from './PersonalDetails';
// import ParentsDetails from './ParentsDetails';
// import OtherDetails from './OtherDetails';

const StudentRegistrationForms = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Admission Details" />
          <Tab label="Personal Details" />
          <Tab label="Parents Details" />
          <Tab label="Other Details" />
          {/* Add more tabs as needed */}
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <AdmissionDetails />
      </TabPanel>
      {/* <TabPanel value={currentTab} index={1}>
        <PersonalDetails />
      </TabPanel> */}
      {/* Add more TabPanels */}
      <Button variant="contained" color="primary" onClick={null}>
        Save Form
      </Button>
    </Box>
  );
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default StudentRegistrationForms;
