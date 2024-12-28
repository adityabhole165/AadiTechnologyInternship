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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  ICheckIfAttendanceMarkedBody,
  IGetAllUserRolesBody,
  IIsAnyExamPublishedBody,
  IIsOnLeaveBody,
  IStaffNameBody
} from 'src/interfaces/Students/IStudentUI';
import Datepicker1 from 'src/libraries/DateSelector/Datepicker1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAAnyExamPublished,
  CDACheckIfAttendanceMarked,
  CDAIsOnLeave,
  CDAStaffName,
  CDAUserRoles
} from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
import { decodeURL, getCalendarDateFormatDateNew } from '../Common/Util';
//validationMessages,isValid
const AdmissionDetails = ({ admission, onChange, invalidFields, unacceptableFields }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision } = location.state || {};
  let {
    AssignedDate
  } = useParams();

  // Decode in-place
  AssignedDate = decodeURL(AssignedDate);

  const schoolId = localStorage.getItem('SchoolId');

  // const [form, setForm] = useState({
  //   userName: '',
  //   sendSMS: false,
  //   newAdmission: false,
  //   isRTEApplicable: false,
  //   rteCategory: '',
  //   rteApplicationForm: '',
  //   formNumber: '',
  //   registrationNumber: '',
  //   admissionDate: '',
  //   joiningDate: '',
  //   studentRollNumber: '',
  //   UDISENumber: '',
  //   BoardRegistrationNumber: '',
  //   SaralNo: '',
  //   PENNumber: '',
  //   secondlanguage: '',
  //   thirdlanguage: '',
  //   applicableRules: '',
  //   staffUserRole: '',
  //   staffName: '',
  //   residenceTypes: '',
  //   feeAreaNames: '',
  //   RFID: '',
  //   isStaffKid: false,
  //   isOnlyChild: false,
  //   isRiseAndShine: false,
  //   isMinority: false,
  //   isForDayBoarding: false,
  //   isDayBoardingFeePaid: false,
  //   isHandicapped: false,
  // });

  useEffect(() => {
    //console.log('1️⃣admission data from parent', admission);
    //console.log('🎈🎈From Parent', admission.joiningDate);
  }, [admission]);

  const FeeAreaNamesDrop = useSelector((state: RootState) => state.StudentUI.ISFeeAreaNames);
  const DisabilitiesDropdown = useSelector((state: RootState) => state.StudentUI.ISDisabilitiesDropdown);
  const ResidenceTypesDropdown = useSelector((state: RootState) => state.StudentUI.ISResidenceTypesDropdown);
  const FeeRuleConcession = useSelector((state: RootState) => state.StudentUI.ISFeeRuleConcession);
  //Second & Third Land Dropdown
  const SecondLangDropdown = useSelector((state: RootState) => state.StudentUI.ISSecondlang);
  const ThirdLangDropdown = useSelector((state: RootState) => state.StudentUI.ISThirdLang);
  //Staff Dropdowns
  const StaffUserRoleDropdown = useSelector((state: RootState) => state.StudentUI.ISUserRoles);
  const StaffNameDropdown = useSelector((state: RootState) => state.StudentUI.ISStaffName);
  //
  //const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  //console.log(USGetSingleStudentDetails, 'USGetSingleStudentDetails');

  //const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);
  //const GetFromNumber = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.IGetFormNumber);
  const IsAnyExamPublished = useSelector((state: RootState) => state.StudentUI.ISAnyExamPublished);
  const examListResult = IsAnyExamPublished?.[0];
  const isExamPublished = examListResult?.IsExamPublishedStatus; // Check the condition
  //console.log('📃IsAnyExamPublished', isExamPublished);

  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  const IsRTEApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsRTEApplicable || false;
  const ShowDayBoardingOptionOnStudentsScreen = UsGetSchoolSettings?.GetSchoolSettingsResult?.ShowDayBoardingOptionOnStudentsScreen || false;
  const IsConcessionApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsConcessionApplicable || false;
  const IsAdditionalFieldsApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable || false;

  //console.log(GetFromNumber, 'GetFromNumber');

  // const GetStudentRecordDataResult: IMasterDatastudentBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStandardId: standardId,
  //   asDivisionId: DivisionId
  // };

  const GetAllUserRoles: IGetAllUserRolesBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId'))
  };


  // const GetSingleStudentDetails: IGetSingleStudentDetailsBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
  // };

  const IsOnLeaveBody: IIsOnLeaveBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asYearwiseStudentId: YearWise_Student_Id
  };

  const AnyExamPublishedBody: IIsAnyExamPublishedBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    asStandardId: standardId,
    asDivisionId: DivisionId,
    asIsExamPublished: 0
  };

  const formatDate = (date) => {
    try {
      // Handle DD-MM-YYYY format with or without time
      if (date.includes('-')) {
        const [day, month, year] = date.split(' ')[0].split('-');
        if (day.length === 2) {
          return `${year}-${month}-${day}`;
        }
      }

      // If already in YYYY-MM-DD format or needs conversion
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const CheckAttendanceMarkedBody: ICheckIfAttendanceMarkedBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    dateTime: formatDate(admission.joiningDate) || "2014-06-09",
    asDivisionId: DivisionId,
    asStandardId: standardId
  };

  // const FeeAreaNamesBody: IGetFeeAreaNamesBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  // };
  // const FormNumberBody: IGetFormNumberBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asStudentId: 3556
  // };
  useEffect(() => {
    //dispatch(CDAGetMasterData(GetStudentRecordDataResult));
    dispatch(CDAUserRoles(GetAllUserRoles));
    //dispatch(CDAGetSingleStudentDetails(GetSingleStudentDetails));
    dispatch(CDAIsOnLeave(IsOnLeaveBody));
    dispatch(CDAAnyExamPublished(AnyExamPublishedBody));
    dispatch(CDACheckIfAttendanceMarked(CheckAttendanceMarkedBody));
    //dispatch(CDAFeeAreaNames(FeeAreaNamesBody));
    //dispatch(GetFormNumber(FormNumberBody));

  }, []);

  // useEffect(() => {
  //   if ((USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) || (GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0) || (GetFromNumber && GetFromNumber.length > 0)) {
  //     const studentData = USGetSingleStudentDetails[0];
  //     const AdditionalData: any = GetStudentAdditionalDetails; // Get first item from array
  //     const FormNumber = GetFromNumber[0];
  //     setForm(prevForm => ({
  //       ...prevForm,
  //       userName: studentData.User_Login || '',
  //       sendSMS: studentData.Send_SMS === 'False' ? false : true,
  //       newAdmission: studentData.Is_New_Student === 'False' ? false : true,
  //       isRTEApplicable: studentData.Is_RTE_Student === 'False' ? false : true,
  //       rteCategory: studentData.RTECategoryId || '',
  //       rteApplicationForm: studentData.RTEApplicationFormNo || '',
  //       formNumber: FormNumber?.FormNumber || '',
  //       registrationNumber: studentData.Enrolment_Number || '0',        //remember to add   studentData.Enrolment_Number ||
  //       admissionDate: studentData.Admission_date || '',
  //       joiningDate: studentData.Joining_Date || '',
  //       studentRollNumber: studentData.Roll_No || '',
  //       UDISENumber: studentData.UDISENumber || '',
  //       BoardRegistrationNumber: studentData.BoardRegistrationNo || '',
  //       SaralNo: studentData.SaralNo || '',
  //       PENNumber: studentData.PENNumber || '', // Not found
  //       secondlanguage: studentData.SecondLanguageSubjectId || '',
  //       thirdlanguage: studentData.ThirdLanguageSubjectId || '',
  //       applicableRules: studentData.Rule_Id || '',
  //       staffUserRole: studentData.User_Role_Id || '',
  //       staffName: studentData.staffName || '',
  //       residenceTypes: studentData.ResidenceTypeId || '',
  //       feeAreaNames: AdditionalData?.FeeAreaName || '',
  //       RFID: AdditionalData?.RFID || '', // not found
  //       isStaffKid: studentData.IsStaffKid === 'False' ? false : true,
  //       isOnlyChild: studentData.IsOnlyChild === 'False' ? false : true,
  //       isRiseAndShine: studentData.IsRiseAndShine === 'False' ? false : true,
  //       isMinority: studentData.Minority === 'False' ? false : true,
  //       isForDayBoarding: studentData.IsForDayBoarding === 'False' ? false : true,
  //       isDayBoardingFeePaid: studentData.IsDayBoardingFeePaid === 'False' ? false : true,
  //       isHandicapped: AdditionalData?.IsHandicapped || false, // not found

  //     }));
  //   }
  // }, [USGetSingleStudentDetails, GetStudentAdditionalDetails, GetFromNumber]);


  useEffect(() => {
    const GetStaffName: IStaffNameBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asUserRoleId: Number(admission.staffUserRole) //=== 'Teacher' ? 2 : form.staffUserRole === 'Admin Staff' ? 6 : null
    }
    //console.log("GetStaffName", GetStaffName)
    dispatch(CDAStaffName(GetStaffName));

  }, [admission.staffUserRole]);


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

  // const handleDropdownChange = (name: string, value: any) => {
  //   setForm((prevForm) => {
  //     const updatedForm = { ...prevForm, [name]: value };
  //     onTabChange(updatedForm); // Notify parent of updated data
  //     return updatedForm;
  //   });

  //   setErrors((prev) => ({ ...prev, [name]: false }));
  // };

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
    //console.log('🎯', e.target)
    // setForm((prevForm) => {
    //   const updatedForm = { ...prevForm, [name]: fieldValue };
    //   onTabChange(updatedForm); // Notify parent of updated data
    //   return updatedForm;

    // });
    onChange(name, fieldValue);
    //onTabChange({ firstName: fieldValue, })
    // Remove error when the user starts filling the field
    setErrors({ ...errors, [name]: false });
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    //const formattedDate = date ? moment(date).format('YYYY-MM-DD') : ''; // Use an empty string if the date is null

    onChange(name, date); // Pass the formatted date to parent

  };
  // useEffect(() => {
  //   if (!ShowDayBoardingOptionOnStudentsScreen) {
  //     setForm((prevForm) => ({ ...prevForm, isForDayBoarding: false }));
  //   }
  // }, [ShowDayBoardingOptionOnStudentsScreen]);

  // const validateForm = () => {
  //   const newErrors = {
  //     userName: !form.userName,
  //     formNumber: !form.formNumber,
  //     registrationNumber: !form.registrationNumber,
  //     admissionDate: !form.admissionDate,
  //     joiningDate: !form.joiningDate,
  //     studentRollNumber: !form.studentRollNumber,
  //     rteCategory: form.isRTEApplicable && !form.rteCategory,
  //     rteApplicationForm: form.isRTEApplicable && !form.rteApplicationForm
  //   };
  //   setErrors(newErrors);
  //   //console.log(!Object.values(newErrors).includes(true));
  //   return !Object.values(newErrors).includes(true);
  // };


  // const handleSave = () => {
  //   const isValid = validateForm();
  //   //onSave(isValid);
  //   setMessage(
  //     isValid
  //       ? 'Draft saved successfully!'
  //       : 'Please fill in all required fields.'
  //   );
  //   setTimeout(() => setMessage(''), 2000);
  // };

  const Constants = {
    S_SELECT: 'Select',
    S_ZERO: '0'
    // add other constants here
  };
  //#region DataTransfer 
  // useEffect(() => {
  //   onTabChange(form); // Sends the initial form state to the parent when component mounts
  // }, [form]);
  //#endregion

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
            value={admission.userName}
            onChange={handleInputChange}
            //error={errors.userName}
            //helperText={errors.userName ? 'This field is required' : ''}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="sendSMS"
                checked={admission.sendSMS}
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
                checked={admission.newAdmission}
                onChange={handleInputChange}
                disabled={true} // Checkbox is always disabled
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
                checked={admission.isRTEApplicable}
                onChange={handleInputChange}
                disabled={IsRTEApplicable && admission.isRTEApplicable === true ? false : true} // Checkbox is always disabled
              />
            }
            label="Is RTE Applicable?"
          />
        </Grid>
        {admission.isRTEApplicable && (
          <Grid container spacing={2} pt={2} pl={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SearchableDropdown
                sx={{ minWidth: '300px' }}
                ItemList={IsRTEApplicable ? DisabilitiesDropdown : []}
                onChange={(value) => onChange('rteCategory', IsRTEApplicable ? value : '0')}
                defaultValue={admission.rteCategory}
                label={'RTE Category'}
                size={'medium'}
                disabled={!IsRTEApplicable} // Checkbox is always disabled
              />
              {/* <TextField
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
              /> */}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="rteApplicationForm"
                label="RTE Application Form No."
                value={admission.rteApplicationForm}
                onChange={handleInputChange}
                fullWidth
                disabled={!IsRTEApplicable}
              />
            </Grid>

            {/* Annual Income Field */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="annualIncome"
                label="Annual Income"
                value={admission.annualIncome}
                onChange={handleInputChange}
                fullWidth
                disabled={!admission.isRTEApplicable || parseInt(schoolId) === 11}
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
        {/* Amout Section */}
        {admission.isRTEStudent && admission.rteCategoryId === 2 && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="amount"
              label="Amount"
              value={admission.amount}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="formNumber"
            label={
              <span>
                Form Number {parseInt(schoolId) === 71 && <span style={{ color: "red" }}> *</span>}
              </span>
            }
            variant="outlined"
            value={admission.formNumber}
            onChange={handleInputChange}
            error={parseInt(schoolId) === 71 && !!invalidFields.find(field => field.field === "formNumber")}
            helperText={parseInt(schoolId) === 71 && invalidFields.find(field => field.field === "formNumber") ? 'Form Number should not be blank.' : ''}
            fullWidth
            inputProps={{
              maxLength: 15, // Restricts the input length to 50 characters
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Tooltip title="Valid Prefix(s): No Prefix, PP">
            <TextField
              name="registrationNumber"

              label={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Registration Number {(parseInt(schoolId) === 18 || parseInt(schoolId) === 122) && <span style={{ color: "red" }}> *</span>}
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <InfoIcon fontSize="small" color="primary" />
                  </IconButton>
                </span>
              }
              variant="outlined"
              //defaultValue={USGetSingleStudentDetails[0].Enrolment_Number}
              value={admission.registrationNumber}
              defaultValue={admission.registrationNumber}
              onChange={handleInputChange}
              error={!!invalidFields.find(field => field.field === "registrationNumber") ||
                !!unacceptableFields.find(field => field.field === "registrationNumber")
              }
              helperText={invalidFields.find(field => field.field === "registrationNumber") ?
                'Registration Number should not be blank.' :
                unacceptableFields.find(field => field.field === "registrationNumber")
                  ? 'Registration number should not be zero.'
                  : ''}
              sx={{ cursor: 'pointer' }}
              fullWidth
              inputProps={{
                maxLength: 15, // Restricts the input length to 50 characters
              }}
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Datepicker1
            DateValue={admission.admissionDate}
            onDateChange={handleDateChange('admissionDate')}
            size={'medium'}
            label={'Admission Date'}
            error={!!invalidFields.find(field => field.field === "admissionDate")}
            helperText={invalidFields.find(field => field.field === "admissionDate") ? 'Addmission date should not be blank.' : ''}
            maxDate={moment().format("YYYY-MM-DD")} // Disable future dates
          />
          {/* {validationMessages.admissionDate && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {validationMessages.admissionDate}
              </Typography>
            )} */}
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
          <Datepicker1
            DateValue={admission.joiningDate}
            onDateChange={handleDateChange('joiningDate')}
            // label={'Start Date'}
            size={'medium'}
            label={'Joining Date'}
            error={!!invalidFields.find(field => field.field === "joiningDate")}
            helperText={invalidFields.find(field => field.field === "joiningDate") ? 'Joining date should not be blank.' : ''}
            maxDate={new Date()}
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
            value={admission.studentRollNumber}
            onChange={handleInputChange}
            error={!!invalidFields.find(field => field.field === "studentRollNumber")}
            helperText={invalidFields.find(field => field.field === "studentRollNumber") ? 'Student Roll Number should not be blank.' : ''}
            fullWidth
            inputProps={{
              maxLength: 3, // Restricts the input length to 50 characters
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="UDISENumber"
            label="Student UDISE number"
            variant="outlined"
            value={admission.UDISENumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="boardRegistrationNumber"
            label="Board Registration Number"
            variant="outlined"
            value={admission.boardRegistrationNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="saralNo"
            label="Saral No"
            variant="outlined"
            value={admission.saralNo}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="PENNumber"
            label="PEN Number"
            variant="outlined"
            value={admission.PENNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={SecondLangDropdown.length > 0 ? SecondLangDropdown : [{ Text: Constants.S_SELECT, Value: Constants.S_ZERO }]}
            onChange={(value) => onChange('secondlanguage', value)}
            label={'Second Language'}
            defaultValue={admission.secondlanguage}
            size={'medium'}
            disabled={isExamPublished}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={ThirdLangDropdown.length > 0 ? ThirdLangDropdown : [{ Text: Constants.S_SELECT, Value: Constants.S_ZERO }]}
            onChange={(value) => onChange('thirdlanguage', value)}
            label={'Third Language'}
            defaultValue={admission.thirdlanguage}
            size={'medium'}
            disabled={isExamPublished}
          />
        </Grid>
        {IsConcessionApplicable &&
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={IsConcessionApplicable == true ? FeeRuleConcession : []}
              onChange={(value) => onChange('applicableRules', value)}
              label={'Applicable Rule'}
              defaultValue={IsConcessionApplicable == true ? admission.applicableRules : '0'}
              size={'medium'}
            />
          </Grid>
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffUserRoleDropdown}
            onChange={(value) => onChange('staffUserRole', value)}
            defaultValue={admission.staffUserRole}
            label={'Staff User Role'}
            size={'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={StaffNameDropdown}
            onChange={(value) => onChange('staffName', value)}
            label={'Staff Name'}
            defaultValue={admission.staffName}
            size={'medium'}
          />
        </Grid>
        {IsAdditionalFieldsApplicable && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={ResidenceTypesDropdown}
              onChange={(value) => onChange('residenceTypes', value)}
              defaultValue={admission.residenceTypes}
              label={' Residence Type'}
              size={'medium'}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchableDropdown
            sx={{ minWidth: '15vw' }}
            ItemList={FeeAreaNamesDrop}
            onChange={(value) => {
              if (schoolId && parseInt(schoolId) === 122) {
                onChange('feeAreaNames', value);
              } else {
                onChange('feeAreaNames', '0');
              }
            }}
            label={'Fee Area Name'}
            defaultValue={schoolId && parseInt(schoolId) === 122 ? admission.feeAreaNames : '0'}
            size={'medium'}
          />
        </Grid>
        {IsAdditionalFieldsApplicable && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="RFID"
              label="RFID"
              variant="outlined"
              value={admission.RFID}
              onChange={handleInputChange}
              fullWidth
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
        )}
        {IsConcessionApplicable &&
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isStaffKid"
                  checked={admission.isStaffKid}
                  onChange={handleInputChange}
                />
              }
              label="Is Staff Kid?"
            />
          </Grid>
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="isOnlyChild"
                checked={admission.isOnlyChild}
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
                name="isRiseAndShine"
                checked={admission.isRiseAndShine}
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
                name="isMinority"
                checked={admission.isMinority}
                onChange={handleInputChange}
              />
            }
            label="Is Minority?"
          />
        </Grid>
        {ShowDayBoardingOptionOnStudentsScreen &&
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isForDayBoarding"
                  checked={admission.isForDayBoarding}
                  onChange={handleInputChange}
                />
              }
              label="Is For Day Boarding?"
            />
          </Grid>
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="isDayBoardingFeePaid"
                checked={admission.isDayBoardingFeePaid}
                onChange={handleInputChange}
              />
            }
            label="Is Day Boarding Fee Paid?"
          />
        </Grid>
        {IsAdditionalFieldsApplicable && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isHandicapped"
                  checked={admission.isHandicapped}
                  onChange={handleInputChange}
                />
              }
              label="Is Handicapped?"
            />
          </Grid>
        )}
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
