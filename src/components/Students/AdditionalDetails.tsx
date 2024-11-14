// import React from 'react'

// const AdditionalDetails = ({onSave}) => {
//   return (
//     <div>AdditionalDetails</div>
//   )
// }

// export default AdditionalDetails

import { Box, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IGetStudentAdditionalDetailsBody } from 'src/interfaces/Students/IStudentUI';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetStudentAdditionalDetails } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';

const AdditionalDetails = ({ onTabChange }) => {
  const location = useLocation();
  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id } = location.state || {};
  const dispatch = useDispatch();

  // State to hold the input values
  const [form, setForm] = useState({
    lastSchoolName: '',
    lastSchoolAddress: '',
    standard: '',
    schoolUDISENo: '',
    schoolBoardName: '',
    isRecognised: '',
    // lastSchoolRollNumber: '',
    //  lastSchoolYear: '',
    houseNumber: '',
    mainArea: '', // New field
    subareaName: '', // New field
    landmark: '', // New field
    taluka: '', // New field
    district: '', // New field
    admissionStandard: '', // New field
    admissionAcademicYear: '', // New field
    previousMarksObtained: '', // New field
    previousMarksOutOf: '', // New field
    subjectNames: '', // New field
    previousYearOfPassing: '', // New field
    currentAcademicYear: '', // New field
    currentStandard: '' // New field
  });
  //#region API CALL
  const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);
  console.log('GetStudentAdditionalDetails', GetStudentAdditionalDetails);


  const GetStudentAdditionalDetailsBody: IGetStudentAdditionalDetailsBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    //asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
  };

  useEffect(() => {
    dispatch(CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody));
  }, []);

  useEffect(() => {
    if (GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0) {
      const studentAdditionalData: any = GetStudentAdditionalDetails; // Get first item from array
      setForm(prevForm => ({
        ...prevForm,
        lastSchoolName: '',
        lastSchoolAddress: studentAdditionalData.Last_School_Name || '',
        standard: studentAdditionalData.Last_School_Name || '',
        schoolUDISENo: studentAdditionalData.Last_School_Name || '',
        schoolBoardName: studentAdditionalData.Last_School_Name || '1',
        isRecognised: studentAdditionalData.Last_School_Name || '',
        // lastSchoolRollNumber: '',
        //  lastSchoolYear: '',
        houseNumber: studentAdditionalData.HouseNoPlotNo || '',
        mainArea: studentAdditionalData.MainArea || '',
        subareaName: studentAdditionalData.SubareaName || '',
        landmark: studentAdditionalData.Landmark || '',
        taluka: studentAdditionalData.Taluka || '',
        district: studentAdditionalData.District || '',
        admissionStandard: studentAdditionalData.AddmissionStandard || '',
        admissionAcademicYear: studentAdditionalData.AddmissionAcademicYear || '',
        previousMarksObtained: studentAdditionalData.PreviousMarksObtained || '',
        previousMarksOutOf: studentAdditionalData.PreviousMarksOutOff || '',
        subjectNames: studentAdditionalData.SubjectNames || '',
        previousYearOfPassing: studentAdditionalData.PreviousYearOfPassing || '',
        currentAcademicYear: studentAdditionalData.CurrentAcademicYear || '',
        currentStandard: studentAdditionalData.CurrentStandard || '',
      }));
    }
  }, [GetStudentAdditionalDetails]);

  //#endregion
  const SchoolBoardName = [
    { id: 1, Name: 'ICSE', Value: 1 },
    { id: 2, Name: 'SSC', Value: 2 },
    { id: 3, Name: 'CBSE', Value: 3 },
    { id: 4, Name: 'OTHERS', Value: 4 }
  ];

  const Recognised = [
    { id: 1, Name: 'Yes' },
    { id: 2, Name: 'No' }
  ];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    let fieldValue;
    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files ? files[0] : null;
    } else {
      fieldValue = value;
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: fieldValue
    }));

    //onTabChange({ firstName: fieldValue, })
    // Remove error when the user starts filling the field
    //setErrors({ ...errors, [name]: false });
  };

  // Handle dropdown change
  const handleDropdownChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    // setErrors((prev) => ({ ...prev, [name]: false }));
  };

  //#region DataTransfer 
  useEffect(() => {
    onTabChange(form); // Sends the initial form state to the parent when component mounts
  }, [form]);
  //#endregion

  // Handle form submission
  const handleSave = () => {
    // Call the onSave function passed as a prop
    // onSave(form);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Typography variant="h4" color="initial" pt={2} pb={1}>
        Last School Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolName"
            label="School Name"
            variant="outlined"
            fullWidth
            value={form.lastSchoolName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolAddress"
            label="School Address"
            variant="outlined"
            fullWidth
            value={form.lastSchoolAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="standard"
            label="Standard"
            variant="outlined"
            fullWidth
            value={form.standard}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolRollNumber"
            label="School UDISE No"
            variant="outlined"
            fullWidth
            value={form.schoolUDISENo}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.schoolBoardName}
            ItemList={SchoolBoardName}
            onChange={(value) => handleDropdownChange('schoolBoardName', value)}
            label={'School Board Name'}
            size={'medium'}

          />
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.isRecognised}
            ItemList={Recognised}
            onChange={(value) => handleDropdownChange('isRecognised', value)}
            label={'Is Recognised'}
            size={'medium'}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" color="initial" pt={2} pb={1}>
        Transport Address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="houseNumber"
            label="House No. / Plot No"
            variant="outlined"
            fullWidth
            value={form.houseNumber}
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
            value={form.mainArea}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="subareaName"
            label="Subarea Name"
            variant="outlined"
            fullWidth
            value={form.subareaName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="landmark"
            label="Landmark"
            variant="outlined"
            fullWidth
            value={form.landmark}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="taluka"
            label="Taluka"
            variant="outlined"
            fullWidth
            value={form.taluka}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="district"
            label="District"
            variant="outlined"
            fullWidth
            value={form.district}
            onChange={handleInputChange}
          />
        </Grid>
        {/* New Fields for Academic Details */}
      </Grid>
      {/* <Grid item xs={12} pt={2}>
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
      </Grid> */}
      <Typography variant="h4" color="initial" pt={2} pb={1}>
        Educational Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="admissionStandard"
            label="Admission Standard"
            variant="outlined"
            fullWidth
            value={form.admissionStandard}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="admissionAcademicYear"
            label="Admission Academic Year"
            variant="outlined"
            fullWidth
            value={form.admissionAcademicYear}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousMarksObtained"
            label="Previous Marks Obtained"
            variant="outlined"
            fullWidth
            value={form.previousMarksObtained}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousMarksOutOf"
            label="Previous Marks Out Of"
            variant="outlined"
            fullWidth
            value={form.previousMarksOutOf}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="subjectNames"
            label="Subject Names"
            variant="outlined"
            fullWidth
            value={form.subjectNames}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="previousYearOfPassing"
            label="Previous Year of Passing"
            variant="outlined"
            fullWidth
            value={form.previousYearOfPassing}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="currentAcademicYear"
            label="Current Academic Year"
            variant="outlined"
            fullWidth
            value={form.currentAcademicYear}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="currentStandard"
            label="Current Standard"
            variant="outlined"
            fullWidth
            value={form.currentStandard}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdditionalDetails;
