import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import Datepicker1 from 'src/libraries/DateSelector/Datepicker1';
import SingleFile from 'src/libraries/File/SingleFile';
import { CDADeleteFamilyPhoto, CDADeleteFatherPhoto, CDADeleteGuardianPhoto, CDADeleteMotherPhoto, CDAresetDeletePhotoMsg, } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';

const FamilyDetails = ({ family, onChange, invalidFields }) => {
  const location = useLocation();
  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id } = location.state || {};
  const dispatch = useDispatch();
  const schoolId = localStorage.getItem('SchoolId');

  const { AssignedDate } = useParams();
  const [form, setForm] = useState({
    // Father's Information
    fatherQualification: '',
    fatherEmail: '',
    fatherOfficeName: '',
    fatherOfficeAddress: '',
    fatherDesignation: '',
    fatherDOB: '',
    fatherPhoto: '',
    fatherWeight: 0,
    fatherHeight: 0,
    fatherBloodGroup: '',
    fatherAadharCard: '',
    fatherAnnualIncome: 0,

    // Mother's Information
    motherOccupation: '',
    motherQualification: '',
    motherEmail: '',
    motherOfficeName: '',
    motherOfficeAddress: '',
    motherDesignation: '',
    motherDOB: '',
    motherPhoto: '',
    motherWeight: 0,
    motherHeight: 0,
    motherAadharCard: '',
    motherBloodGroup: '',
    motherAnnualIncome: 0,

    // Family Information
    marriageAnniversaryDate: '',
    localGuardianPhoto: '',
    familyMonthlyIncome: 0.0,
    cwsn: '',
    relativeFullName: '',
    residencePhoneNumber: '',
    neighbourPhoneNumber: '',
    officePhoneNumber: '',
    familyPhoto: '',
    name1: '',
    name2: '',
    age1: 0,
    age2: 0,
    institution1: '',
    institution2: '',
    standard1: '',
    standard2: '',
  });

  useEffect(() => {
    if (family) {
      //console.log('3️⃣family data from Parent', family);
      // console.log('🎈🎈FatherDOB From Parent', family.fatherDOB);
      // console.log('🎈🎈MotherDOB From Parent', family.motherDOB);
      // console.log('🎈🎈Anniversery From Parent', family.marriageAnniversaryDate);
    }
  }, [family]);

  const ValidFileTypes = ['BMP', 'DOC', 'DOCX', 'JPG', 'JPEG', 'PDF', 'XLS', 'XLSX'];
  const MaxfileSize = 5000000;

  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );

  //#region API CALLS
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  //console.log('⚙️UsGetSchoolSettings:', UsGetSchoolSettings);
  const IsAdditionalFieldsApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable || false;

  const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);
  //console.log('GetStudentAdditionalDetails FAMILY', GetStudentAdditionalDetails);
  const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  //console.log(USGetSingleStudentDetails, '🔲USGetSingleStudentDetails');
  const DeleteFamilyPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteFamilyPhotoMsg);
  const DeleteFatherPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteFatherPhotoMsg);
  const DeleteMotherPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteMotherPhotoMsg);
  const DeleteGuardianPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteGuardianPhotoMsg);


  // const GetStudentAdditionalDetailsBody: IGetStudentAdditionalDetailsBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   //asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
  // };

  // useEffect(() => {
  //   dispatch(CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody));
  // }, []);
  //#region Date Formation
  const formatDOB = (date) => {
    try {
      if (!date) return '';

      // Handle "DD-MM-YYYY HH:mm:ss" format
      if (date.includes('-')) {
        const [day, month, year] = date.split(' ')[0].split('-');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        return parsedDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      }

      // Handle other cases (if already valid Date object or other formats)
      const d = new Date(date);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };
  //#endregion

  // useEffect(() => {
  //   if ((GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0) || (USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0)) {
  //     const FamilyData: any = GetStudentAdditionalDetails;
  //     const studentData = USGetSingleStudentDetails[0];// Get first item from array
  //     setForm(prevForm => ({
  //       ...prevForm,
  //       fatherQualification: FamilyData?.FatherQualification || "",
  //       fatherEmail: FamilyData?.FatherEmail || "",
  //       fatherOfficeName: FamilyData?.FatherOfficeName || "",
  //       fatherOfficeAddress: FamilyData?.FatherOfficeAddress || "",
  //       fatherDesignation: FamilyData?.FatherDesignation || "",
  //       fatherDOB: formatDOB(FamilyData?.FatherDOB) || "",
  //       fatherPhoto: FamilyData?.FatherPhoto || "",
  //       fatherWeight: FamilyData?.FatherWeight || "",
  //       fatherHeight: FamilyData?.FatherHeight || "",
  //       fatherBloodGroup: FamilyData?.FatherBloodGroup || "",
  //       fatherAadharCard: FamilyData?.FatherAadharcardNo || "",
  //       fatherAnnualIncome: FamilyData?.FatherAnnualIncome || "",

  //       // Mother's Information
  //       motherOccupation: FamilyData?.MotherOccupation || "",
  //       motherQualification: FamilyData?.MotherQualification || "",
  //       motherEmail: FamilyData?.MotherEmail || "",
  //       motherOfficeName: FamilyData?.MotherOfficeName || "",
  //       motherOfficeAddress: FamilyData?.MotherOfficeAddress || "",
  //       motherDesignation: FamilyData?.MotherDesignation || "",
  //       motherDOB: formatDOB(FamilyData?.MotherDOB) || "",
  //       motherPhoto: FamilyData?.MotherPhoto || "",
  //       motherWeight: FamilyData?.MotherWeight || "",
  //       motherHeight: FamilyData?.MotherHeight || "",
  //       motherAadharCard: FamilyData?.MotherAadharcardNo || "",
  //       motherBloodGroup: FamilyData?.MotherBloodGroup || "",
  //       motherAnnualIncome: FamilyData?.MotherAnnualIncome || "",

  //       // Family Information
  //       marriageAnniversaryDate: formatDOB(FamilyData?.AnniversaryDate) || "",
  //       localGuardianPhoto: FamilyData?.GuardianPhoto || "",
  //       familyMonthlyIncome: FamilyData?.FamilyMonthlyIncome || "",
  //       cwsn: FamilyData?.CWSN || "",
  //       relativeFullName: FamilyData?.RelativeName || "",
  //       residencePhoneNumber: studentData?.Residence_Phone_Number || "",  //Single 
  //       neighbourPhoneNumber: studentData?.Neighbour_Number || "",
  //       officePhoneNumber: studentData?.Office_Number || "",
  //       familyPhoto: studentData?.Family_Photo_Copy_Path || "",           //Single
  //       name1: FamilyData?.Name1 || "",
  //       name2: FamilyData?.Name2 || "",
  //       age1: FamilyData?.Age1 || "",
  //       age2: FamilyData?.Age2 || "",
  //       institution1: FamilyData?.Institution1 || "",
  //       institution2: FamilyData?.Institution2 || "",
  //       standard1: FamilyData?.StandardName1 || "",
  //       standard2: FamilyData?.StandardName2 || "",
  //     }));
  //   }
  //   console.log(form, '🔲form');
  // }, [GetStudentAdditionalDetails, USGetSingleStudentDetails]);

  //#endregion

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
    onChange(name, fieldValue);
    // setForm((prevForm) => {
    //   const updatedForm = { ...prevForm, [name]: fieldValue };
    //   onTabChange(updatedForm); // Notify parent of updated data
    //   return updatedForm;
    // });

    //onTabChange({ firstName: fieldValue, })
    // Remove error when the user starts filling the field
    setErrors({ ...errors, [name]: false });
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    //const formattedDate = date? moment(date).format('DD-MM-YYYY HH:mm:ss') : ''; // Use an empty string if the date is null

    onChange(name, date); // Pass the formatted date to parent

  };

  function handleContactNoChange(e) {
    const numericValue = e.target.value.replace(/\D/g, '');
    if (!isNaN(Number(numericValue)) && numericValue.length <= 10) {
      //setIContactNumber(numericValue);
      // setForm((prevForm) => ({
      //   ...prevForm,
      //   [e.target.name]: numericValue
      // }));
      onChange(e.target.name, numericValue);
    }
  }
  //#region Photos Opr
  const { showAlert, closeAlert } = useContext(AlertContext);
  const ValidFileTypes2 = ['JPG', 'JPEG', 'PNG', 'BMP'];
  const MaxfileSize2 = 5000000;

  const [fileNameError, setFileNameError] = useState('');
  const [ImageFile, setImageFile] = useState('');
  const [base64URL2, setbase64URL2] = useState('');
  const [imageFileExtention, setImageFileExtention] = useState('');

  const handlePhotoChange = (key, value) => {
    console.log(`0️⃣Selected file for ${key}:`, value);
    if (!ValidFileTypes2.includes(value.FileExtension.toUpperCase())) {
      //setFileNameError('Invalid file format. Supported formats are JPEG, PNG, BMP.');
      setFileNameError(value.ErrorMsg);
      onChange(key, value.Name); // Clear file name
      setbase64URL2(''); // Clear Base64 URL
      return;
    }

    // Calculate file size from Base64 string
    const base64Length = value.Value.length - (value.Value.indexOf(',') + 1); // Exclude metadata
    const padding = (value.Value.endsWith('==') ? 2 : value.Value.endsWith('=') ? 1 : 0);
    const fileSizeInBytes = (base64Length * 3) / 4 - padding;

    if (fileSizeInBytes > MaxfileSize) {
      setFileNameError('File size exceeds 5 MB. Please upload a smaller file.');
      onChange(key, value.Name); // Clear file name
      setbase64URL2(''); // Clear Base64 URL
      return;
    }

    onChange(key, value.Name);
    setbase64URL2(value.Value);
    setImageFileExtention(value.FileExtension);
    setFileNameError(value.ErrorMsg);
  };

  // const url = `${localStorage.getItem("SiteURL")}RITESCHOOL/DOWNLOADS/Student Documents/${form.familyPhoto}`;   //--remeber to set aadharCardScanCopy
  // const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;

  // const viewFamilyPhoto = () => {
  //   //const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;
  //   console.log('base64Image', base64Image);
  //   if (form.familyPhoto) {                             // -----show image using url🩸
  //     window.open(url, '_blank');
  //   }
  // };

  const viewPhoto = (key) => {
    const fileName = family[key];
    const url = `${localStorage.getItem("SiteURL")}RITESCHOOL/DOWNLOADS/StudentDocuments/${fileName}`;
    const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;

    if (fileName) {
      console.log(`Viewing ${key}:`, fileName);
      console.log(`Viewing ${key}:`, base64Image);
      console.log(`Viewing ${key}:`, url);
      window.open(url, '_blank'); // Opens the URL in a new tab
    } else {
      console.log(`No photo available for ${key}`);
    }
  };


  // const deleteImage = () => {
  //   const DeleteFamilyPhotosBody: IDeleteFamilyPhotosBody = {
  //     asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //     asStudentId: SchoolWise_Student_Id,
  //     asUpdatedById: Number(localStorage.getItem('UserId')),
  //   };
  //   if (form.familyPhoto) {
  //     console.log('👎', form.familyPhoto);
  //     showAlert({
  //       title: 'Please Confirm',
  //       message: 'Are you sure you want to delete Family Photo?',
  //       variant: 'warning',
  //       confirmButtonText: 'Confirm',
  //       cancelButtonText: 'Cancel',
  //       onCancel: () => {
  //         closeAlert();
  //       },
  //       onConfirm: () => {
  //         //console.log('👍', DeleteFamilyPhotosBody);
  //         dispatch(CDADeleteFamilyPhoto(DeleteFamilyPhotosBody));
  //         closeAlert();
  //       },
  //     });
  //   }
  // };

  const deleteImageReusable = (key, deleteAction, alertMessage) => {
    const fileName = family[key];
    const deleteBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asStudentId: SchoolWise_Student_Id,
      asUpdatedById: Number(localStorage.getItem('UserId')),
    };

    if (fileName) {
      console.log(`👎 Deleting ${key}:`, fileName);
      showAlert({
        title: 'Please Confirm',
        message: alertMessage,
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => closeAlert(),
        onConfirm: () => {
          dispatch(deleteAction(deleteBody));
          closeAlert();
        },
      });
    }
    //onChange(key, '');
  };


  useEffect(() => {
    if (DeleteFamilyPhotoMsg !== '') {
      toast.success(DeleteFamilyPhotoMsg);
      //setForm((prevForm) => ({ ...prevForm, familyPhoto: '', }));              // delete photo
      onChange('familyPhoto', '');
      dispatch(CDAresetDeletePhotoMsg());
    }
    if (DeleteFatherPhotoMsg !== '') {
      toast.success(DeleteFatherPhotoMsg);
      //setForm((prevForm) => ({ ...prevForm, fatherPhoto: '', }));              // delete photo
      onChange('fatherPhoto', '');
      dispatch(CDAresetDeletePhotoMsg());
    }
    if (DeleteMotherPhotoMsg !== '') {
      toast.success(DeleteMotherPhotoMsg);
      //setForm((prevForm) => ({ ...prevForm, motherPhoto: '', }));              // delete photo
      onChange('motherPhoto', '');
      dispatch(CDAresetDeletePhotoMsg());
    }
    if (DeleteGuardianPhotoMsg !== '') {
      toast.success(DeleteGuardianPhotoMsg);
      //setForm((prevForm) => ({ ...prevForm, localGuardianPhoto: '', }));              // delete photo
      onChange('localGuardianPhoto', '');
      dispatch(CDAresetDeletePhotoMsg());
    }
  }, [DeleteFamilyPhotoMsg, DeleteFatherPhotoMsg, DeleteMotherPhotoMsg, DeleteGuardianPhotoMsg]);

  //#endregion
  const [errors, setErrors] = useState({
    fatherQualification: false,
    fatherEmail: false,
    fatherOfficeName: false,
    fatherOfficeAddress: false,
    fatherDesignation: false,
    fatherDOB: false,
    fatherPhoto: false,
    fatherWeight: false,
    fatherHeight: false,
    fatherBloodGroup: false,
    fatherAadharCard: false,
    fatherAnnualIncome: false,

    // Mother's Information
    motherOccupation: false,
    motherQualification: false,
    motherEmail: false,
    motherOfficeName: false,
    motherOfficeAddress: false,
    motherDesignation: false,
    motherDOB: false,
    motherPhoto: false,
    motherWeight: false,
    motherHeight: false,
    motherAadharCard: false,
    motherBloodGroup: false,
    motherAnnualIncome: false,

    // Family Information
    marriageAnniversaryDate: false,
    localGuardianPhoto: false,
    familyMonthlyIncome: false,
    cwsn: false,
    relativeFullName: false,
    residencePhoneNumber: false,
    familyPhoto: false
  });


  //#region Sibling section
  // const [siblings, setSiblings] = useState([
  //   { name: '', age: 0, institution: '', standard: '' }
  // ]);

  // const handleAddSibling = () => {
  //   setSiblings([
  //     ...siblings,
  //     { name: '', age: 0, institution: '', standard: '' }
  //   ]);
  // };

  // const handleRemoveSibling = (index) => {
  //   const newSiblings = siblings.filter((_, i) => i !== index);
  //   setSiblings(newSiblings);
  // };

  // const handleChange = (index, field, value) => {
  //   const newSiblings = siblings.map((sibling, i) => {
  //     if (i === index) {
  //       return { ...sibling, [field]: value };
  //     }
  //     return sibling;
  //   });
  //   setSiblings(newSiblings);
  // };
  //#endregion

  const handleSave = () => {
    // Call the onSave function passed as a prop
    // onSave(form);
  };
  const onSelectDate = (value) => {
    SetSelectDate(value);
  };


  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      {IsAdditionalFieldsApplicable && (
        <>
          <Typography variant="h4" color="initial" py={1} pb={1}>
            Father's Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                name="fatherOccupation"
                label="Father Occupation "
                variant="outlined"
                value={family.fatherOccupation}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherQualification"
                label="Father Qualification "
                variant="outlined"
                value={family.fatherQualification}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherEmail"
                label="Father E-mail"
                variant="outlined"
                value={family.fatherEmail}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherOfficeName"
                label="Father Office Name"
                variant="outlined"
                value={family.fatherOfficeName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherOfficeAddress"
                label="Father Office Address"
                variant="outlined"
                value={family.fatherOfficeAddress}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherDesignation"
                label="Father Designation"
                variant="outlined"
                value={family.fatherDesignation}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Datepicker1
                DateValue={family.fatherDOB}
                onDateChange={handleDateChange('fatherDOB')}
                size={'medium'}
                label={
                  <span>
                    Father's DOB {(parseInt(schoolId) === 18) && <span style={{ color: "red" }}> *</span>}
                  </span>
                }
                error={parseInt(schoolId) === 18 && !!invalidFields.find(field => field.field === "fatherDOB")}
                helperText={parseInt(schoolId) === 18 && invalidFields.find(field => field.field === "fatherDOB") ? "Father's Date of Birth should not be blank." : ''}
                maxDate={moment().format("YYYY-MM-DD")} // Disable future dates
              />
            </Grid>

            {/* fatherPhoto */}
            <Grid item xs={12} md={2}>
              <SingleFile
                ValidFileTypes={ValidFileTypes2}
                MaxfileSize={MaxfileSize2}
                FileName={family.fatherPhoto}
                ChangeFile={(value) => handlePhotoChange('fatherPhoto', value)}
                FileLabel={'Father Photo'}
                width={'100%'}
                height={'52px'}
                isMandatory={false}
                errorMessage={fileNameError}
              />
            </Grid>
            <Grid item xs={1} md={1}>
              <>
                <Tooltip title={'View'}>
                  <IconButton
                    onClick={() => viewPhoto('fatherPhoto')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: '#223354',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>

                <Tooltip title={'Delete'}>
                  <IconButton
                    onClick={() => deleteImageReusable('fatherPhoto', CDADeleteFatherPhoto, 'Are you sure you want to delete father photo?')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherWeight"
                label="Father Weight (Kg)"
                variant="outlined"
                type="number"
                value={family.fatherWeight}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 0,
                  step: '0.1'
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherHeight"
                label="Father Height (Cm)"
                variant="outlined"
                type="number"
                value={family.fatherHeight}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 0,
                  step: '0.1'
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherBloodGroup"
                label="Father Blood Group"
                variant="outlined"
                value={family.fatherBloodGroup}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherAadharCard"
                label="Father Aadhar Card Number"
                variant="outlined"
                value={family.fatherAadharCard}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="fatherAnnualIncome"
                label="Father Annual Income"
                variant="outlined"
                value={family.fatherAnnualIncome}
                onChange={handleInputChange}
                inputProps={{
                  maxLength: 10,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 10);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      )}
      {IsAdditionalFieldsApplicable && (
        <>
          <Typography variant="h4" color="initial" pt={2} pb={1}>
            Mother's Details
          </Typography>
          {/* Mother's Information */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                name="motherOccupation"
                label="Mother Occupation"
                variant="outlined"
                value={family.motherOccupation}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherQualification"
                label="Mother Qualification"
                variant="outlined"
                value={family.motherQualification}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherEmail"
                label="Mother E-mail"
                variant="outlined"
                value={family.motherEmail}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherOfficeName"
                label="Mother Office Name"
                variant="outlined"
                value={family.motherOfficeName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherOfficeAddress"
                label="Mother Office Address"
                variant="outlined"
                value={family.motherOfficeAddress}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherDesignation"
                label="Mother Designation"
                variant="outlined"
                value={family.motherDesignation}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Datepicker1
                DateValue={family.motherDOB}
                onDateChange={handleDateChange('motherDOB')}
                size={'medium'}
                label={
                  <span>
                    Mother's DOB {parseInt(schoolId) === 18 && <span style={{ color: "red" }}> *</span>}
                  </span>
                }
                error={parseInt(schoolId) === 18 && !!invalidFields.find(field => field.field === "motherDOB")}
                helperText={parseInt(schoolId) === 18 && invalidFields.find(field => field.field === "motherDOB") ? "Mother's Date of Birth should not be blank." : ''}
                maxDate={new Date()}
              />
            </Grid>

            {/* motherPhoto */}
            <Grid item xs={12} md={2}>
              <SingleFile
                ValidFileTypes={ValidFileTypes2}
                MaxfileSize={MaxfileSize2}
                FileName={family.motherPhoto}
                ChangeFile={(value) => handlePhotoChange('motherPhoto', value)}
                FileLabel={'Mother Photo'}
                width={'100%'}
                height={'52px'}
                isMandatory={false}
                errorMessage={fileNameError}
              />
            </Grid>

            <Grid item xs={1} md={1}>
              <>
                <Tooltip title={'View'}>
                  <IconButton
                    onClick={() => viewPhoto('motherPhoto')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: '#223354',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>

                <Tooltip title={'Delete'}>
                  <IconButton
                    onClick={() => deleteImageReusable('motherPhoto', CDADeleteMotherPhoto, 'Are you sure you want to delete mother photo?')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherWeight"
                label="Mother Weight (Kg)"
                variant="outlined"
                type="number"
                value={family.motherWeight}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 0,
                  step: '0.1'
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherHeight"
                label="Mother Height (Cm)"
                variant="outlined"
                type="number"
                value={family.motherHeight}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 0,
                  step: '0.1'
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherBloodGroup"
                label="Mother Blood Group"
                variant="outlined"
                value={family.motherBloodGroup}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherAadharCard"
                label="Mother Aadhar Card Number"
                variant="outlined"
                value={family.motherAadharCard}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="motherAnnualIncome"
                label="Mother Annual Income"
                variant="outlined"
                value={family.motherAnnualIncome}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  maxLength: 10,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 10);
                }}
              />
            </Grid>
          </Grid>
        </>)}
      <Grid container spacing={2} pt={2} pb={1}>
        {IsAdditionalFieldsApplicable && (
          <>
            <Grid item xs={12} md={3}>
              <Datepicker1
                DateValue={family.marriageAnniversaryDate}
                onDateChange={handleDateChange('marriageAnniversaryDate')}
                size={'medium'}
                label={
                  <span>
                    Marriage Anniversary Date {parseInt(schoolId) === 18 && <span style={{ color: "red" }}> *</span>}
                  </span>
                }
                error={parseInt(schoolId) === 18 && !!invalidFields.find(field => field.field === "marriageAnniversaryDate")}
                helperText={parseInt(schoolId) === 18 && invalidFields.find(field => field.field === "marriageAnniversaryDate") ? "Marriage Anniversary Date should not be blank." : ''}
                maxDate={new Date()}
              />
            </Grid>

            {/* localGuardianPhoto */}
            <Grid item xs={12} md={2}>
              <SingleFile
                ValidFileTypes={ValidFileTypes2}
                MaxfileSize={MaxfileSize2}
                FileName={family.localGuardianPhoto}
                ChangeFile={(value) => handlePhotoChange('localGuardianPhoto', value)}
                FileLabel={'Local Guadian Photo'}
                width={'100%'}
                height={'52px'}
                isMandatory={false}
                errorMessage={fileNameError}
              />
            </Grid>
            <Grid item xs={1} md={1}>
              <>
                <Tooltip title={'View'}>
                  <IconButton
                    onClick={() => viewPhoto('localGuardianPhoto')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: '#223354',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>

                <Tooltip title={'Delete'}>
                  <IconButton
                    onClick={() => deleteImageReusable('localGuardianPhoto', CDADeleteGuardianPhoto, 'Are you sure you want to delete guardian Photo?')}
                    sx={{
                      color: '#223354',
                      mt: 0.7,
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="familyMonthlyIncome"
                label="Family Monthly Income"
                variant="outlined"
                value={family.familyMonthlyIncome}
                onChange={handleInputChange}
                inputProps={{
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '');
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="cwsn"
                label="CWSN"
                variant="outlined"
                value={family.cwsn}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="relativeFullName"
                label="Relative Full Name"
                variant="outlined"
                value={family.relativeFullName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} md={3}>
          <TextField
            name="residencePhoneNumber"
            label="Residence Phone Number"
            variant="outlined"
            value={family.residencePhoneNumber}
            onChange={handleContactNoChange}
            // error={family.residencePhoneNumber.toString() !== '' && family.residencePhoneNumber.toString().length < 10 ? true : false}
            // helperText={
            //   family.residencePhoneNumber.toString() !== '' && family.residencePhoneNumber.toString().length < 10 ? 'Mobile number should be a 10 digit number.' : ''
            // }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="neighbourPhoneNumber"
            label="Neighbour's Phone Number"
            variant="outlined"
            value={family.neighbourPhoneNumber}
            onChange={handleContactNoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="officePhoneNumber"
            label="Office Phone Number"
            variant="outlined"
            value={family.officePhoneNumber}
            onChange={handleContactNoChange}
            fullWidth
          />
        </Grid>

        {/* familyPhoto */}
        <Grid item xs={12} md={2}>
          <SingleFile
            ValidFileTypes={ValidFileTypes2}
            MaxfileSize={MaxfileSize2}
            FileName={family.familyPhoto}
            ChangeFile={(value) => handlePhotoChange('familyPhoto', value)}
            FileLabel={'Family Photo'}
            width={'100%'}
            height={'52px'}
            isMandatory={false}
            errorMessage={fileNameError}
          />
        </Grid>
        <Grid item xs={1} md={1}>
          <>
            <Tooltip title={'View'}>
              <IconButton
                onClick={() => viewPhoto('familyPhoto')}
                sx={{
                  color: '#223354',
                  mt: 0.7,
                  '&:hover': {
                    color: '#223354',
                    cursor: 'pointer'
                  }
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Delete'}>
              <IconButton
                onClick={() => deleteImageReusable('familyPhoto', CDADeleteFamilyPhoto, 'Are you sure you want to delete family photo?')}
                sx={{
                  color: '#223354',
                  mt: 0.7,
                  '&:hover': {
                    color: 'red',
                    backgroundColor: red[100]
                  }
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </>
        </Grid>
      </Grid>

      {IsAdditionalFieldsApplicable && (

        <>
          {/* Sibling Details */}
          <Typography variant="h4" color="initial" pt={2} pb={1}>
            Details of Brothers and Sisters of the Student
          </Typography>

          {/* {siblings.map((sibling, index) => ( */}
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid item xs={12} md={3}>
              <TextField
                name="name1"
                label="Name"
                variant="outlined"
                value={family.name1}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="age1"
                label="Age"
                variant="outlined"
                value={family.age1}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  min: 0,
                  maxLength: 2,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 2);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="institution1"
                label="Institution"
                variant="outlined"
                value={family.institution1}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="standard1"
                label="Standard"
                variant="outlined"
                value={family.standard1}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="name2"
                label="Name"
                variant="outlined"
                value={family.name2}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="age2"
                label="Age"
                variant="outlined"
                value={family.age2}
                onChange={handleInputChange}
                inputProps={{
                  min: 0,
                  maxLength: 2,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, '').slice(0, 2);
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="institution2"
                label="Institution"
                variant="outlined"
                value={family.institution2}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="standard2"
                label="Standard"
                variant="outlined"
                value={family.standard2}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={12} md={0.5}>
            {siblings.length > 1 && (
              <Tooltip title={'Delete'}>
                <IconButton
                  onClick={() => handleRemoveSibling(index)}
                  sx={{
                    color: '#223354',
                    mt: 0.7,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>*/}
          </Grid>
        </>
      )}
      {/* ))} */}

      {/* <Grid item xs={12} pt={2}>
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleAddSibling}
        >
          Add Sibling
        </Button>
      </Grid> */}

      {/* Save & Next Button */}
      {/* <Grid
        item
        xs={12}
        pt={2}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleSave}
        >
          Save And Next
        </Button>
      </Grid> */}
    </Box>
  );
};

export default FamilyDetails;
