import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMasterDatastudentBody } from 'src/interfaces/Students/IStudentUI';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetStudentRecordData } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';

const AdmissionDetails = ({
  onSave
}: {
  onSave: (isSuccessful: boolean) => void;
}) => {
  const dispatch = useDispatch();

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
    PENNumber: ''
  });

  const ResidenceTypesDropdown = useSelector((state: RootState) => state.StudentUI.ISResidenceTypesDropdown);
  //console.log('ResidenceTypesDropdown', ResidenceTypesDropdown);

  const GetStudentRecordDataResult: IMasterDatastudentBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asStandardId: 1082,
    asDivisionId: 1299
  };

  useEffect(() => {
    dispatch(CDAGetStudentRecordData(GetStudentRecordDataResult));
  }, []);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));

    const handleDropdownChange = (name: string, value: any) => {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
      setErrors(prev => ({ ...prev, [name]: false }));
    };

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
    onSave(isValid);
    setMessage(
      isValid
        ? 'Draft saved successfully!'
        : 'Please fill in all required fields.'
    );
    setTimeout(() => setMessage(''), 2000);
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
            label={
              <span>
              User Name
              </span>
            }
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
        <Grid item xs={12} sm={6} md={4} lg={3} >
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
<<<<<<< HEAD
        <Grid item xs={3}>
          <TextField
            name="userName"
            label="User Name"
            variant="outlined"
            value={form.userName}
            onChange={handleInputChange}
            required
            error={errors.userName}
            helperText={errors.userName ? 'This field is required' : ''}
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
        <Grid item xs={3}>
=======
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
>>>>>>> 050f254749c96edef461fd1e1699f4cc1997e927
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
          <Tooltip title="Valid Prefix(s) : No Prefix, PP">
            <TextField
              name="registrationNumber"
              label={
                <span>
                 Registration Number <span style={{ color: 'red' }}> *</span>
                </span>
              }
              variant="outlined"
              value={form.registrationNumber}
              onChange={handleInputChange}
  
              error={errors.registrationNumber}
              helperText={
                errors.registrationNumber ? 'This field is required' : ''
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
          </Tooltip>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        name="admissionDate"
                        label="Admission Date"
                        variant="outlined"
                        type="date" // Optional: use a date input
                        value={form.admissionDate}
                        onChange={handleInputChange}
                        required
                        error={errors.admissionDate}
                        helperText={errors.admissionDate ? "This field is required" : ""}
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid> */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
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
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
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
          />
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
            ItemList={applicableRules}
            // onChange={onClickClass}
            label={'Second Language'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={applicableRules}
            // onChange={onClickClass}
            label={'Third Language'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={applicableRules}
            // onChange={onClickClass}
            label={'Applicable Rule'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffUserRole}
            // onChange={onClickClass}
            label={'Staff User Role'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffUserRole}
            // onChange={onClickClass}
            label={'Staff Name'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={ResidenceTypesDropdown}
            // onChange={onClickClass}
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
            size={"medium"}

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
<<<<<<< HEAD
        <Grid item xs={3}>
          <TextField
            name="userName"
            label="Admission Standard"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>

        </Grid>
        <Grid item xs={3}>
=======
       
      
        <Grid item xs={12} sm={6} md={4} lg={3}>
>>>>>>> 050f254749c96edef461fd1e1699f4cc1997e927
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
