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
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { RootState } from 'src/store';

const AdditionalDetails = ({ additional, onChange }) => {
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

  useEffect(() => {
    console.log('4️⃣additional data from Parent', additional);
  }, [additional]);
  //#region API CALL
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  //console.log('⚙️UsGetSchoolSettings:', UsGetSchoolSettings);
  const IsAdditionalFieldsApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable || false;

  //const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);
  //console.log('GetStudentAdditionalDetails', GetStudentAdditionalDetails);
  //const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);

  // const GetStudentAdditionalDetailsBody: IGetStudentAdditionalDetailsBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   //asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
  // };

  // useEffect(() => {
  //   dispatch(CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody));
  // }, []);

  // useEffect(() => {
  //   if ((GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0) || (USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0)) {
  //     const studentAdditionalData: any = GetStudentAdditionalDetails;
  //     const studentData = USGetSingleStudentDetails[0]; // Get first item from array
  //     setForm(prevForm => ({
  //       ...prevForm,
  //       lastSchoolName: studentData?.LastSchoolName || '',
  //       lastSchoolAddress: studentData?.LastSchoolAddress || '',
  //       standard: studentData?.LastCompletedStd || '',
  //       schoolUDISENo: studentData?.LastSchoolUDISENo || '',
  //       schoolBoardName: studentData?.LastCompletedBoard || '',
  //       isRecognised: studentData?.IsRecognisedBoard === "True" ? 'Yes' : 'No',
  //       // lastSchoolRollNumber: '',
  //       //  lastSchoolYear: '',
  //       houseNumber: studentAdditionalData.HouseNoPlotNo || '',
  //       mainArea: studentAdditionalData.MainArea || '',
  //       subareaName: studentAdditionalData.SubareaName || '',
  //       landmark: studentAdditionalData.Landmark || '',
  //       taluka: studentAdditionalData.Taluka || '',
  //       district: studentAdditionalData.District || '',
  //       admissionStandard: studentAdditionalData.AddmissionStandard || '',
  //       admissionAcademicYear: studentAdditionalData.AddmissionAcademicYear || '',
  //       previousMarksObtained: studentAdditionalData.PreviousMarksObtained || '',
  //       previousMarksOutOf: studentAdditionalData.PreviousMarksOutOff || '',
  //       subjectNames: studentAdditionalData.SubjectNames || '',
  //       previousYearOfPassing: studentAdditionalData.PreviousYearOfPassing || '',
  //       currentAcademicYear: studentAdditionalData.CurrentAcademicYear || '',
  //       currentStandard: studentAdditionalData.CurrentStandard || '',
  //     }));
  //   }
  // }, [GetStudentAdditionalDetails]);

  //#endregion
  const SchoolBoardName = [
    { id: 1, Name: 'ICSE', Value: 1 },
    { id: 2, Name: 'SSC', Value: 2 },
    { id: 3, Name: 'CBSE', Value: 3 },
    { id: 4, Name: 'OTHERS', Value: 4 }
  ];

  const Recognised = [
    { id: 1, Name: 'Yes', Value: 'Yes' },
    { id: 2, Name: 'No', Value: 'No' }
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

    // setForm((prevForm) => ({
    //   ...prevForm,
    //   [name]: fieldValue
    // }));
    onChange(name, fieldValue);
    //onTabChange({ firstName: fieldValue, })
    // Remove error when the user starts filling the field
    //setErrors({ ...errors, [name]: false });
  };

  // Handle dropdown change
  // const handleDropdownChange = (name: string, value: any) => {
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value
  //   }));
  //   // setErrors((prev) => ({ ...prev, [name]: false }));
  // };

  //#region DataTransfer 
  // useEffect(() => {
  //   onTabChange(form); // Sends the initial form state to the parent when component mounts
  // }, [form]);
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
            value={additional.lastSchoolName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastSchoolAddress"
            label="School Address"
            variant="outlined"
            fullWidth
            value={additional.lastSchoolAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="standard"
            label="Standard"
            variant="outlined"
            fullWidth
            value={additional.standard}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="schoolUDISENo"
            label="School UDISE No"
            variant="outlined"
            fullWidth
            value={additional.schoolUDISENo}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={additional.schoolBoardName}
            ItemList={SchoolBoardName}
            onChange={(value) => onChange('schoolBoardName', value)}
            label={'School Board Name'}
            size={'medium'}

          />
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={additional.isRecognised}
            ItemList={Recognised}
            onChange={(value) => onChange('isRecognised', value)}
            label={'Is Recognised'}
            size={'medium'}
          />
        </Grid>
      </Grid>
      {IsAdditionalFieldsApplicable && (
        <>
          <Typography variant="h4" color="initial" pt={2} pb={1}>
            Other Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="houseNumber"
                label="House No. / Plot No"
                variant="outlined"
                fullWidth
                value={additional.houseNumber}
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
                value={additional.mainArea}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="subareaName"
                label="Subarea Name"
                variant="outlined"
                fullWidth
                value={additional.subareaName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="landmark"
                label="Landmark"
                variant="outlined"
                fullWidth
                value={additional.landmark}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="taluka"
                label="Taluka"
                variant="outlined"
                fullWidth
                value={additional.taluka}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="district"
                label="District"
                variant="outlined"
                fullWidth
                value={additional.district}
                onChange={handleInputChange}
              />
            </Grid>
            {/* New Fields for Academic Details */}
          </Grid>

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
                value={additional.admissionStandard}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="admissionAcademicYear"
                label="Admission Academic Year"
                variant="outlined"
                fullWidth
                value={additional.admissionAcademicYear}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="previousMarksObtained"
                label="Previous Marks Obtained"
                variant="outlined"
                fullWidth
                value={additional.previousMarksObtained}
                onChange={handleInputChange}
                inputProps={{
                  maxLength: 3,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 3);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="previousMarksOutOf"
                label="Previous Marks Out Off"
                variant="outlined"
                fullWidth
                value={additional.previousMarksOutOf}
                onChange={handleInputChange}
                inputProps={{
                  maxLength: 3,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 3);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="subjectNames"
                label="Subject Names"
                variant="outlined"
                fullWidth
                value={additional.subjectNames}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="previousYearOfPassing"
                label="Previous Year of Passing"
                variant="outlined"
                fullWidth
                value={additional.previousYearOfPassing}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="currentAcademicYear"
                label="Current Academic Year"
                variant="outlined"
                fullWidth
                value={additional.currentAcademicYear}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="currentStandard"
                label="Current Standard"
                variant="outlined"
                fullWidth
                value={additional.currentStandard}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdditionalDetails;
