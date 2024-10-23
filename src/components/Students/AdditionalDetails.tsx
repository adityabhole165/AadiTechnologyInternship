// import React from 'react'

// const AdditionalDetails = ({onSave}) => {
//   return (
//     <div>AdditionalDetails</div>
//   )
// }

// export default AdditionalDetails

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useState } from 'react';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const AdditionalDetails = ({ onSave }) => {
  // State to hold the input values
  const [formData, setFormData] = useState({
    lastSchoolName: '',
    lastSchoolRollNumber: '',
    lastSchoolYear: '',
    lastSchoolAddress: '',
    schoolBoardName: '',
    isRecognised: '',
    houseNumber: '',
    mainArea: '',      // New field
    subareaName: '',   // New field
    landmark: '',      // New field
    taluka: '',        // New field
    district: '',      // New field
    admissionAcademicYear: '',  // New field
    previousMarksObtained: '',   // New field
    previousMarksOutOf: '',       // New field
    subjectNames: '',              // New field
    previousYearOfPassing: '',    // New field
    currentAcademicYear: '',      // New field
    currentStandard: '',          // New field
  });

  const SchoolBoardName = [
    { id: 1, Name: 'ICSE' },
    { id: 2, Name: 'SSC' },
    { id: 3, Name: 'CBSE' },
    { id: 4, Name: 'OTHERS' }
  ];

  const Recognised = [
    { id: 1, Name: 'Yes' },
    { id: 2, Name: 'No' }
  ];

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle dropdown change
  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSave = () => {
    // Call the onSave function passed as a prop
    onSave(formData);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="admissionAcademicYear"
            label="Admission Academic Year"
            variant="outlined"
            fullWidth
            value={formData.admissionAcademicYear}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousMarksObtained"
            label="Previous Marks Obtained"
            variant="outlined"
            fullWidth
            value={formData.previousMarksObtained}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousMarksOutOf"
            label="Previous Marks Out Of"
            variant="outlined"
            fullWidth
            value={formData.previousMarksOutOf}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="subjectNames"
            label="Subject Names"
            variant="outlined"
            fullWidth
            value={formData.subjectNames}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousYearOfPassing"
            label="Previous Year of Passing"
            variant="outlined"
            fullWidth
            value={formData.previousYearOfPassing}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="currentAcademicYear"
            label="Current Academic Year"
            variant="outlined"
            fullWidth
            value={formData.currentAcademicYear}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="currentStandard"
            label="Current Standard"
            variant="outlined"
            fullWidth
            value={formData.currentStandard}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" color="initial" py={2}>
        Last School Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolName"
            label="Last School Name"
            variant="outlined"
            fullWidth
            value={formData.lastSchoolName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolRollNumber"
            label="School Roll Number"
            variant="outlined"
            fullWidth
            value={formData.lastSchoolRollNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolYear"
            label="Standard"
            variant="outlined"
            fullWidth
            value={formData.lastSchoolYear}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolAddress"
            label="School Address"
            variant="outlined"
            fullWidth
            value={formData.lastSchoolAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={SchoolBoardName}
            label={'School Board Name'}
            size={"medium"}
            onChange={(value) => handleDropdownChange('schoolBoardName', value)}
          />
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={Recognised}
            label={'Is Recognised'}
            size={"medium"}
            onChange={(value) => handleDropdownChange('isRecognised', value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="houseNumber"
            label="House No. / Plot No"
            variant="outlined"
            fullWidth
            value={formData.houseNumber}
            onChange={handleInputChange}
          />
        </Grid>
        {/* New Fields */}
        <Grid item xs={3}>
          <TextField
            name="mainArea"
            label="Main Area"
            variant="outlined"
            fullWidth
            value={formData.mainArea}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="subareaName"
            label="Subarea Name"
            variant="outlined"
            fullWidth
            value={formData.subareaName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="landmark"
            label="Landmark"
            variant="outlined"
            fullWidth
            value={formData.landmark}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="taluka"
            label="Taluka"
            variant="outlined"
            fullWidth
            value={formData.taluka}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="district"
            label="District"
            variant="outlined"
            fullWidth
            value={formData.district}
            onChange={handleInputChange}
          />
        </Grid>
        {/* New Fields for Academic Details */}

      </Grid>
      <Grid item xs={12} pt={2}>
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100],
            },
          }}
          onClick={handleSave}
        >
          Save And Next
        </Button>
      </Grid>
    </Box>
  );
};

export default AdditionalDetails;
