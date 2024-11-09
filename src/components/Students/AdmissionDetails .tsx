import InfoIcon from '@mui/icons-material/Info';
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  IGetAllUserRolesBody,
  IGetSingleStudentDetailsBody,
  IMasterDatastudentBody,
  IStaffNameBody
} from 'src/interfaces/Students/IStudentUI';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAGetMasterData,
  CDAGetSingleStudentDetails,
  CDAStaffName,
  CDAUserRoles
} from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';

const AdmissionDetails = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { standardId, DivisionId } = location.state || {};
  const { AssignedDate } = useParams();

  const [form, setForm] = useState({
    newAdmission: false,
    isRTEApplicable: false,
    userName: '',
    formNumber: '',
    registrationNumber: '',
    admissionDate: '',
    joiningDate: '',
    studentRollNumber: '',
    sendSMS: false,
    rteCategory: '',
    rteApplicationForm: '',
    BoardRegistrationNumber: '',
    SaralNo: '',
    PENNumber: '',
    secondlanguage: '',
    thirdlanguage: '',
    applicableRules: '',
    staffUserRole: '',
    staffName: '',
    residenceTypes: ''
  });

  const ResidenceTypesDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISResidenceTypesDropdown
  );
  const FeeRuleConcession = useSelector(
    (state: RootState) => state.StudentUI.ISFeeRuleConcession
  );
  //Second & Third Land Dropdown
  const SecondLangDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISSecondlang
  );
  const ThirdLangDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISThirdLang
  );
  //Staff Dropdowns
  const StaffUserRoleDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISUserRoles
  );
  const StaffNameDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISStaffName
  );
  //
  const USGetSingleStudentDetails = useSelector(
    (state: RootState) => state.StudentUI.ISGetSingleStudentDetails
  );
  // console.log(USGetSingleStudentDetails, 'USGetSingleStudentDetails');

  // const GetStudentAdditionalDetails = useSelector(
  //   (state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails
  // );

  const GetStudentRecordDataResult: IMasterDatastudentBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asStandardId: standardId,
    asDivisionId: DivisionId
  };

  const GetAllUserRoles: IGetAllUserRolesBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId'))
  };

  // const GetStaffName: IStaffNameBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asUserRoleId: form.staffUserRole === 'Teacher' ? 2 : form.staffUserRole === 'Admin Staff' ? 6 : null
  // };

  const GetSingleStudentDetails: IGetSingleStudentDetailsBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asStudentId: 3556 // Number(sessionStorage.getItem('Id'))
  };

  useEffect(() => {
    dispatch(CDAGetMasterData(GetStudentRecordDataResult));
    dispatch(CDAUserRoles(GetAllUserRoles));
    dispatch(CDAGetSingleStudentDetails(GetSingleStudentDetails));
    //dispatch(CDAGetStudentAdditionalDetails(GetSingleStudentDetails))

  }, []);

  useEffect(() => {
    if (USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) {
      const studentData = USGetSingleStudentDetails[0]; // Get first item from array
      setForm(prevForm => ({
        ...prevForm,
        newAdmission: studentData.Is_New_Student === 'False' ? false : true,
        isRTEApplicable: studentData.Is_RTE_Student === 'False' ? false : true,
        userName: studentData.User_Id || '',
        formNumber: studentData.Enrolment_Number || '',
        registrationNumber: studentData.Enrolment_Number || '',
        admissionDate: studentData.Admission_date || '',
        joiningDate: studentData.Joining_Date || '',
        studentRollNumber: studentData.Roll_No || '',
        sendSMS: false,
        rteCategory: studentData.RTECategoryId || '',
        rteApplicationForm: studentData.RTEApplicationFormNo || '',
        BoardRegistrationNumber: studentData.BoardRegistrationNo || '',
        SaralNo: studentData.SaralNo || '',
        PENNumber: studentData.PENNumber || '',
        secondlanguage: studentData.SecondLanguageSubjectId || '',
        thirdlanguage: studentData.ThirdLanguageSubjectId || '',
        applicableRules: studentData.Rule_Id || '',
        staffUserRole: studentData.Roll_No || '',
        staffName: studentData.User_Id || '',
        residenceTypes: studentData.ResidenceTypeId || ''

      }));
    }
  }, [USGetSingleStudentDetails]);


  useEffect(() => {
    // const roleId = form.staffUserRole === 'Teacher' ? 2 : form.staffUserRole === 'Admin Staff' ? 6 : null;
    // console.log('staffUserRole', form.staffUserRole);
    // console.log('roleId', roleId);

    const GetStaffName: IStaffNameBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asUserRoleId: Number(form.staffUserRole) //=== 'Teacher' ? 2 : form.staffUserRole === 'Admin Staff' ? 6 : null
    }
    //  console.log("GetStaffName", GetStaffName)
    dispatch(CDAStaffName(GetStaffName));

  }, [form.staffUserRole]);

  //#region DataTransfer 
  useEffect(() => {
    onTabChange(form); // Sends the initial form state to the parent when component mounts
  }, [form]);
  //#endregion

  const [errors, setErrors] = useState({
    userName: false,
    formNumber: false,
    registrationNumber: false,
    admissionDate: false,
    joiningDate: false,
    studentRollNumber: false,
    rteCategory: false,
    rteApplicationForm: false
  });

  const [message, setMessage] = useState('');
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );

  const onSelectDate = (value) => {
    SetSelectDate(value);
  };

  const handleDropdownChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,

      ...(name === 'staffUserRole' && { staffName: '' })
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update error state when user types
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      userName: !form.userName,
      formNumber: !form.formNumber,
      registrationNumber: !form.registrationNumber,
      admissionDate: !form.admissionDate,
      joiningDate: !form.joiningDate,
      studentRollNumber: !form.studentRollNumber,
      rteCategory: form.isRTEApplicable && !form.rteCategory,
      rteApplicationForm: form.isRTEApplicable && !form.rteApplicationForm
    };
    setErrors(newErrors);
    console.log(!Object.values(newErrors).includes(true));
    return !Object.values(newErrors).includes(true);
  };
  const applicableRules = [
    { id: 1, Name: '50% Fee Concession' },
    { id: 2, Name: '75% Fee Concession' }
  ];
  const StaffUserRole = [
    { id: 1, Name: 'Teacher' },
    { id: 2, Name: 'Admin Staff' }
  ];
  const ResidenceType = [
    { id: 1, Name: 'Flat Owners' },
    { id: 2, Name: 'Tenants' }
  ];
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

  const handleSave = () => {
    const isValid = validateForm();
    //onSave(isValid);
    setMessage(
      isValid
        ? 'Draft saved successfully!'
        : 'Please fill in all required fields.'
    );
    setTimeout(() => setMessage(''), 2000);
  };

  const Constants = {
    S_SELECT: 'Select',
    S_ZERO: '0'
    // add other constants here
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      {message && (
        <Grid item xs={12}>
          <Alert
            severity={message.includes('successfully') ? 'success' : 'error'}
          >
            {message}
          </Alert>
        </Grid>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="userName"
            label={<span>User Name</span>}
            variant="outlined"
            value={form.userName}
            onChange={handleInputChange}
            error={errors.userName}
            helperText={errors.userName ? 'This field is required' : ''}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="sendSMS"
                checked={form.sendSMS}
                onChange={handleInputChange}
              />
            }
            label="Send SMS of User Name and Password"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="New Admission"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="isRTEApplicable"
                checked={form.isRTEApplicable}
                onChange={handleInputChange}
              />
            }
            label="Is RTE Applicable?"
          />
        </Grid>
        {form.isRTEApplicable && (
          <Grid container spacing={2} pt={2} pl={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="rteCategory"
                label="RTE Category"
                value={form.rteCategory}
                onChange={handleInputChange}
                fullWidth
                error={errors.rteCategory}
                helperText={errors.rteCategory ? 'This field is required' : ''}
                sx={{
                  backgroundColor: errors.rteCategory
                    ? 'red'
                    : form.rteCategory
                      ? 'lightblue'
                      : 'inherit'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="rteApplicationForm"
                label="RTE Application Form"
                value={form.rteApplicationForm}
                onChange={handleInputChange}
                fullWidth
                error={errors.rteApplicationForm}
                helperText={
                  errors.rteApplicationForm ? 'This field is required' : ''
                }
                sx={{
                  backgroundColor: errors.rteApplicationForm
                    ? 'red'
                    : form.rteApplicationForm
                      ? 'lightblue'
                      : 'inherit'
                }}
              />
            </Grid>
            <Grid item xs={6} mt={1.5}>
              <Typography variant="h5" color="textSecondary">
                <b>Note:</b> Student marked as RTE (Right To Education) will get
                100% concession on the school fees.
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="formNumber"
            label="Form Number"
            variant="outlined"
            value={form.formNumber}
            onChange={handleInputChange}
            error={errors.formNumber}
            helperText={errors.formNumber ? 'This field is required' : ''}
            sx={{
              backgroundColor: errors.registrationNumber
                ? 'white'
                : form.registrationNumber
                  ? 'white'
                  : 'inherit'
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Tooltip title="Valid Prefix(s): No Prefix, PP">
            <TextField
              name="registrationNumber"

              label={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Registration Number <span style={{ color: 'red' }}> *</span>
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <InfoIcon fontSize="small" color="primary" />
                  </IconButton>
                </span>
              }
              variant="outlined"
              //defaultValue={USGetSingleStudentDetails[0].Enrolment_Number}
              value={form.registrationNumber}
              defaultValue={form.registrationNumber}
              onChange={handleInputChange}
              error={errors.registrationNumber}
              helperText={
                errors.registrationNumber ? 'This field is required' : ''
              }
              sx={{ cursor: 'pointer' }}
              fullWidth
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Datepicker
            DateValue={SelectDate}
            onDateChange={onSelectDate}
            // label={'Start Date'}
            size={'medium'}
            label={'Admission Date'}

          />
          {/* <TextField
            name="admissionDate"
            label={
              <span>
                Admission Date <span style={{ color: 'red' }}> *</span>
              </span>
            }
            type="date"
            variant="outlined"
            value={form.admissionDate}
            onChange={handleInputChange}
            error={errors.admissionDate}
            helperText={errors.admissionDate ? 'This field is required' : ''}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />*/}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Datepicker
            DateValue={SelectDate}
            onDateChange={onSelectDate}
            // label={'Start Date'}
            size={'medium'}
            label={'Joining Date'}
          />
          {/* <TextField
            name="joiningDate"
            label={
              <span>
                Joining Date <span style={{ color: 'red' }}> *</span>
              </span>
            }
            variant="outlined"
            type="date" // Optional: use a date input
            value={form.joiningDate}
            onChange={handleInputChange}
            error={errors.joiningDate}
            helperText={errors.joiningDate ? 'This field is required' : ''}
            sx={{
              backgroundColor: errors.registrationNumber
                ? 'white'
                : form.registrationNumber
                ? 'white'
                : 'inherit'
            }}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="studentRollNumber"
            label={
              <span>
                Student Roll Number <span style={{ color: 'red' }}> *</span>
              </span>
            }
            variant="outlined"
            value={form.studentRollNumber}
            onChange={handleInputChange}
            error={errors.studentRollNumber}
            helperText={
              errors.studentRollNumber ? 'This field is required' : ''
            }
            sx={{
              backgroundColor: errors.registrationNumber
                ? 'white'
                : form.registrationNumber
                  ? 'white'
                  : 'inherit'
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="StudentUDISEnumber"
            label="Student UDISE number"
            variant="outlined"
            value={form.studentRollNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="BoardRegistrationNumber"
            label="Board Registration Number"
            variant="outlined"
            value={form.BoardRegistrationNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="SaralNo"
            label="Saral No"
            variant="outlined"
            value={form.SaralNo}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="PENNumber "
            label="PEN Number"
            variant="outlined"
            value={form.PENNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={
              SecondLangDropdown.length > 0
                ? SecondLangDropdown
                : [{ Text: Constants.S_SELECT, Value: Constants.S_ZERO }]
            }
            onChange={(value) => handleDropdownChange('secondlanguage', value)}
            label={'Second Language'}
            defaultValue={form.secondlanguage}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={
              ThirdLangDropdown.length > 0
                ? ThirdLangDropdown
                : SecondLangDropdown.length > 0
                  ? SecondLangDropdown
                  : [{ Text: Constants.S_SELECT, Value: Constants.S_ZERO }]
            }
            onChange={(value) => handleDropdownChange('thirdlanguage', value)}
            label={'Third Language'}
            defaultValue={form.thirdlanguage}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={FeeRuleConcession}
            onChange={(value) => handleDropdownChange('applicableRules', value)}
            label={'Applicable Rule'}
            defaultValue={form.applicableRules}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffUserRoleDropdown}
            onChange={(value) => handleDropdownChange('staffUserRole', value)}
            defaultValue={form.staffUserRole}
            label={'Staff User Role'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffNameDropdown}
            onChange={(value) => handleDropdownChange('staffName', value)}
            label={'Staff Name'}
            defaultValue={form.staffName}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={ResidenceTypesDropdown}
            onChange={(value) => handleDropdownChange('residenceTypes', value)}
            defaultValue={form.residenceTypes}
            label={' Residence Type'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '15vw' }}
            ItemList={ResidenceType}
            onChange={handleInputChange}
            label={'Fee Area Name'}
            //defaultValue={form.parentOccupation}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="userName"
            label="RFID"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is Staff Kid?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is Only Child?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is Rise & Shine?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is Minority?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is For Day Boarding?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="newAdmission"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is For Day Boarding?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="isHandicapped"
                checked={form.newAdmission}
                onChange={handleInputChange}
              />
            }
            label="Is Handicapped?"
          />
        </Grid>
      </Grid>

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

export default AdmissionDetails;
