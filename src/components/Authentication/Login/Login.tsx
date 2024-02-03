import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginApi from 'src/api/Authentication/Login';
import RegisterDeviceTokenApi from 'src/api/RegisterDeviceToken/RegisterDeviceToken';
import regulas from 'src/assets/img/Shool_Logo/regulas.jpg';
import { Styles } from 'src/assets/style/student-style';
import { logoURL } from 'src/components/Common/Util';
import {
  IAuthenticateUser,
  IAuthenticateUserResult
} from 'src/interfaces/Authentication/Login';
import {
  GetAllSchoolsResult,
  ISchoolList
} from 'src/interfaces/Authentication/SchoolList';
import { ISchoolSettings } from 'src/interfaces/Authentication/SchoolSettings';
import { IPushNotificationFCM } from 'src/interfaces/FCMDeviceRegistration/FCMDeviceRegistration';
import { ISaveUserLoginDetailsBody } from 'src/interfaces/Student/dashboard';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  CardDetail10,
  CardDetail11,
  InputStyle,
  UsernameStyle
} from 'src/libraries/styled/CardStyle';
import { HeadingStyle } from 'src/libraries/styled/HeadingStyled';
import {
  getSchoolList,
  getSchoolSettingsValue
} from 'src/requests/Authentication/SchoolList';
import { getSaveUserLoginDetail } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';

function SelectSchool() {
  // Test

  const styleroot = Styles();
  const classes = Styles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const styles = { paperContainer: { backgroundColor: 'white' } };
  const SchoolName = localStorage.getItem('SchoolName');
  const [img_src, setimg_src] = useState('');

  const schoolId = localStorage.getItem('localSchoolId');
  const values = { username: '', password: '', showPassword: false };

  let schoolSettingAPIBody: ISchoolSettings = null;

  const [formValues, setFormValues] = useState(values);
  const [show, setShow] = useState(true);
  const [value, setValue] = useState<GetAllSchoolsResult>();
  const [inputValue, setInputValue] = useState('');

  const schoolListData = useSelector(
    (state: RootState) => state.SchoolList.SchoolList
  );
  const schoolSettingList = useSelector(
    (state: RootState) => state.SchoolSettings.SchoolSettings
  );
  const res = localStorage.getItem('auth');
  useEffect(() => {
    if (schoolId != null && schoolId != undefined) {
      localStorage.setItem(
        'SchoolSettingsValue',
        JSON.stringify(schoolSettingList)
      );

      if (res === null) {
        dispatch(getSchoolSettingsValue({ asSchoolId: schoolId }));
        setShow(false);
      } else {
        // console.log("auth",res)
        setSession(JSON.parse(res));
      }

      schoolSettingAPIBody = {
        asSchoolId: schoolId
      };
    }

    const ListData: ISchoolList = {
      asSchoolId: 'Default'
    };
    dispatch(getSchoolList(ListData));
    //Logo is set during localstorage setting. On refresh its again displayed through here
    setimg_src(
      logoURL +
        localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') +
        '_logo.png'
    );
  }, []);
  // end select School

  useEffect(() => {
    if (value !== undefined && value !== null) {
      console.log(value, 'value');
      window.sessionStorage.setItem('authenticateuser', JSON.stringify(value));
      sessionStorage.setItem('SchoolId', value.SchoolId);
      localStorage.setItem('localSchoolId', value.SchoolId);
      localStorage.setItem('SchoolName', value.SchoolName);
      localStorage.setItem('SiteURL', value.SiteURL);
      localStorage.setItem('TermsSchoolName', value.TermsSchoolName);
      localStorage.setItem('FolderName', value.FolderName);
      setimg_src(
        logoURL + value.TermsSchoolName?.split(' ').join('%20') + '_logo.png'
      );
    }
  }, [value]);

  const errorOccur = (value) => {
    toast.error(value, { toastId: 'error1' });
    setTimeout(() => {}, 3000);
  };

  const setSession = async (response) => {
    const result: IAuthenticateUserResult = await response.data
      .AuthenticateUserResult;
    const studentDetails: any = await response.data.StudentDetails;
    const teacherDetails: any = await response.data.TeacherDetails;
    const adminDetails: any = await response.data.AdminStaffDetails
      .GetAdminStaffResult;
    const UserLoginD: ISaveUserLoginDetailsBody = {
      asSchoolId: schoolId,
      asUserId: result.Id
    };
    dispatch(getSaveUserLoginDetail(UserLoginD));

    if (result.RoleName === 'Student') {
      sessionStorage.setItem('AuthenticateUserResult', JSON.stringify(result));
      sessionStorage.setItem('DivisionId', studentDetails.DivisionId);
      sessionStorage.setItem('Class', studentDetails.Class);
      sessionStorage.setItem('StandardId', studentDetails.StandardId);
      sessionStorage.setItem('RollNo', studentDetails.RollNo);
      sessionStorage.setItem('AcademicYearId', studentDetails.AcademicYearId);
      sessionStorage.setItem('AcademicYear', studentDetails.AcademicYear);
      sessionStorage.setItem('StudentId', studentDetails.StudentId);
      sessionStorage.setItem(
        'StandardDivisionId',
        studentDetails.StandardDivisionId
      );
      sessionStorage.setItem('Address', studentDetails.Address);
      sessionStorage.setItem(
        'ResidencePhoneNumber',
        studentDetails.ResidencePhoneNumber
      );
      sessionStorage.setItem(
        'CasteAndSubCaste',
        studentDetails.CasteAndSubCaste
      );
      sessionStorage.setItem('UDISENumber', studentDetails.UDISENumber);
      sessionStorage.setItem('BirthPlace', studentDetails.BirthPlace);
      sessionStorage.setItem('Nationality', studentDetails.Nationality);
      sessionStorage.setItem('MotherTongue', studentDetails.MotherTongue);
      sessionStorage.setItem('Blood_Group', studentDetails.Blood_Group);
      sessionStorage.setItem('EndDate', studentDetails.EndDate);
      sessionStorage.setItem('StartDate', studentDetails.StartDate);
      sessionStorage.setItem('Language', studentDetails.asLanguage);
      sessionStorage.setItem('ParentStaffID', studentDetails.aiParentStaffId);
      sessionStorage.setItem('StartRowIndex', studentDetails.aiStartRowIndex);
      sessionStorage.setItem(
        'SortRowIndexExpression',
        studentDetails.asSortExpression
      );
      sessionStorage.setItem('BookTittleName', studentDetails.asBookTitle);
      sessionStorage.setItem('UserName', studentDetails.asUserName);
      sessionStorage.setItem('ExamID', studentDetails.asExamId);
      sessionStorage.setItem('DOB', studentDetails.DOB);
      sessionStorage.setItem('MobileNumber', studentDetails.MobileNumber);
      sessionStorage.setItem('MobileNumber2', studentDetails.MobileNumber2);
      sessionStorage.setItem('Religion', studentDetails.Religion);
      sessionStorage.setItem('CategoryName', studentDetails.CategoryName);
      sessionStorage.setItem(
        'FamilyPhotoFilePath',
        studentDetails.FamilyPhotoFilePath
      );
      sessionStorage.setItem(
        'SchoolwiseStudentId',
        studentDetails.SchoolwiseStudentId
      );
      // sessionStorage.setItem("StudentSiblingList", result.StudentSiblingList === undefined ?
      //     "" : JSON.stringify(result.StudentSiblingList));
      sessionStorage.setItem(
        'StudentSiblingList',
        studentDetails.StudentSiblingList === undefined
          ? ''
          : JSON.stringify(studentDetails.StudentSiblingList)
      );
    }

    if (result.RoleName === 'Teacher') {
      sessionStorage.setItem('AuthenticateUserResult', JSON.stringify(result));
      sessionStorage.setItem('TeacherId', teacherDetails.TeacherId);
      sessionStorage.setItem('Address', teacherDetails.Address);
      sessionStorage.setItem('IsClassTeacher', teacherDetails.IsClassTeacher);
      sessionStorage.setItem('DesignationName', teacherDetails.DesignationName);
      sessionStorage.setItem('DivisionId', teacherDetails.DivisionId);
      sessionStorage.setItem('StandardId', teacherDetails.StandardId);
      sessionStorage.setItem(
        'StandardDivisionId',
        teacherDetails.StandardDivisionId
      );
      sessionStorage.setItem('ClassName', teacherDetails.ClassName);
      sessionStorage.setItem('AcademicYearId', teacherDetails.AcademicYearId);
      sessionStorage.setItem('EndDate', teacherDetails.EndDate);
      sessionStorage.setItem('StartDate', teacherDetails.StartDate);
      sessionStorage.setItem('SchoolName', teacherDetails.asSchoolName);
      sessionStorage.setItem('DOB', teacherDetails.DOB);
      sessionStorage.setItem('MobileNumber', teacherDetails.MobileNumber);
    }

    if (result.RoleName === 'Admin Staff') {
      sessionStorage.setItem('AcademicYearId', adminDetails.AcademicYearId);
      sessionStorage.setItem('Address', adminDetails.Address);
      sessionStorage.setItem('DesignationName', adminDetails.DesignationName);
      sessionStorage.setItem('EndDate', adminDetails.EndDate);
      sessionStorage.setItem('StartDate', adminDetails.StartDate);
      sessionStorage.setItem('DOB', adminDetails.DOB);
      sessionStorage.setItem('SchoolName', adminDetails.SchoolName);
      sessionStorage.setItem('asSchoolName', adminDetails.asSchoolName);
      sessionStorage.setItem('MobileNumber', adminDetails.MobileNumber);
    }

    sessionStorage.setItem('Id', result.Id);
    sessionStorage.setItem('RoleId', result.RoleId);
    sessionStorage.setItem('StudentName', result.Name);
    sessionStorage.setItem('PhotoFilePath', result.PhotoFilePath);
    sessionStorage.setItem('Userlogin', result.UserLogin);
    sessionStorage.setItem('TermsAccepted', result.TermsAccepted);
    sessionStorage.setItem(
      'LastPasswordChangeDate',
      result.LastPasswordChangeDate
    );

    localStorage.setItem('UserId', result.Id);
    localStorage.setItem('RoleName', result.RoleName);

    const url = localStorage.getItem('url');

    if (url != null && url !== '/') {
      navigate(url);
    } else if (
      result.RoleName == 'Student' ||
      result.RoleName == 'Teacher' ||
      result.RoleName == 'Admin Staff'
    ) {
      navigate('/extended-sidebar/landing/landing');
    }
    //  deviceRegistrationFCM(result.Id)
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },

    onSubmit: (values) => {
      loginform();
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.userName) {
        errors.userName = 'Username is Required ';
      }
      if (!values.password) {
        errors.password = 'Password is Required ';
      }

      return errors;
    }
  });

  const deviceRegistrationFCM = async (userId) => {
    const data: IPushNotificationFCM = {
      asSchoolId: schoolId,
      asUserId: userId.toString(),
      asRegistrationId: localStorage.getItem('FCMdeviceToken'),
      asDeviceId: localStorage.getItem('deviceId'),
      asDeviceType:
        localStorage.getItem('deviceType') === 'ios'
          ? 'APPLE'
          : localStorage.getItem('deviceType')
    };
    const response: any = await RegisterDeviceTokenApi.RegisterFCMToken(data);
  };

  const changeschool = () => {
    setShow(true);
    setValue(null);
    let LoginVersion = localStorage.getItem('LoginVersion');
    localStorage.clear();
    localStorage.setItem('LoginVersion', LoginVersion);
  };

  const forgotPassword = () => {
    navigate('/forgotPassword');
  };

  const schoolNotice = () => {
    navigate('/schoolNotice');
  };

  const handleClickShowPassword = () => {
    setFormValues({
      ...formValues,
      showPassword: !formValues.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginform = async () => {
    const body: IAuthenticateUser = {
      asUserName: formik.values.userName,
      asPassword: formik.values.password,
      asSchoolId: schoolId,
      asIsSiblingLogin: false
    };

    const response: any = await LoginApi.AuthenticateUser(body);
    if (response.data != null) {
      if (
        response.data.AuthenticateUserResult.Message === '' ||
        response.data.AuthenticateUserResult.Message === null
      ) {
        const result: IAuthenticateUserResult = await response.data
          .AuthenticateUserResult;
        const TermsAccepted = result.TermsAccepted;
        sessionStorage.setItem('TermsAccepted', result.TermsAccepted);

        if (TermsAccepted !== 'Y') {
          sessionStorage.setItem('Id', result.Id);
          sessionStorage.setItem('RoleId', result.RoleId);
          sessionStorage.setItem('Userlogin', result.UserLogin);
          navigate('/TermAndCondition');
        } else {
          localStorage.setItem('auth', JSON.stringify(response));
          setSession(response);
        }
      } else errorOccur(response.data.AuthenticateUserResult.Message);
    } else {
      errorOccur('Invalid Username or Password');
    }
  };

  return (
    <Grid>
      {show && (
        <Dialog
          open={show}
          onClose={() => {
            setShow(false);
          }}
          fullWidth
          maxWidth={'xs'}
          sx={{
            '& .MuiDialog-paper': {
              height: '50%'
            }
          }}
        >
          <DialogTitle
            variant={'h4'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            Select or Switch School
            <IconButton
              size={'small'}
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseTwoTone fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    if (value == null) {
                      setShow(false);
                    }
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={schoolListData}
                  getOptionLabel={(Option: any) => Option.SchoolName}
                  // key={schoolListData.SchoolId}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={styleroot.root}
                      label="Select School"
                      required
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <a
                    href="https://www.regulusit.net"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={regulas} />
                  </a>
                  <Typography fontSize={12} sx={{ pb: '8px' }}>
                    Copyright © {new Date().getFullYear()} RegulusIT.net. All
                    rights reserved.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant={'contained'}
              size={'small'}
              color={'error'}
              onClick={() => {
                setShow(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        // justifyContent="center"
        style={{ minHeight: '100vh' }}
        columns={{ xs: 12, md: 12 }}
      >
        <Grid item xs={12} sx={{ mt: '30px' }}>
          <img src={img_src} width="100%" style={{ maxHeight: 200 }} />
        </Grid>
        <Grid item xs={12}>
          <HeadingStyle>{SchoolName}</HeadingStyle>
        </Grid>
        <Box sx={{ maxWidth: '90%' }}>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mr: 1 }} variant="standard">
                <UsernameStyle htmlFor="username">User Name</UsernameStyle>
                <InputStyle
                  id="username"
                  color="secondary"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue="Normal"
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={classes.error}>{formik.errors.userName}</div>
                ) : null}
              </FormControl>

              <FormControl fullWidth sx={{ mr: 1, mt: 1 }} variant="standard">
                <UsernameStyle htmlFor="standard-adornment-password">
                  Password
                </UsernameStyle>
                <InputStyle
                  color="secondary"
                  id="standard-adornment-password"
                  type={formValues.showPassword ? 'text' : 'password'}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue="Normal"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {formValues.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.touched.password && formik.errors.password ? (
                <div className={classes.error}>{formik.errors.password}</div>
              ) : null}

              <Grid sx={{ pt: 1, pb: 3 }}>
                <ButtonPrimary
                  color="primary"
                  type="submit"
                  onChange={formik.handleChange}
                >
                  Login
                </ButtonPrimary>
                <CardDetail11 onClick={forgotPassword}>
                  {' '}
                  Forgot Password{' '}
                </CardDetail11>
              </Grid>
            </Grid>
          </form>
        </Box>

        <Grid>
          <CardDetail10 onClick={changeschool}>
            Change School For Login
          </CardDetail10>
        </Grid>
        <Grid>
          <CardDetail10 onClick={schoolNotice}>School Notices</CardDetail10>
        </Grid>
        <br />

        <Grid item xs={12} textAlign="center">
          <CardDetail10>
            <a href="https://www.riteschool.in/privacy-policy">
              Privacy Policy
            </a>
          </CardDetail10>
        </Grid>
        <br />
        <Divider sx={{ background: '#5b5258', mx: '30px' }} />
        <Grid container textAlign="center">
          <Grid item xs={12}>
            <a
              href="https://www.regulusit.net"
              target="_blank"
              rel="noreferrer"
            >
              <img src={regulas} />
            </a>
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={12} sx={{ pb: '8px' }}>
              Copyright © {new Date().getFullYear()} RegulusIT.net. All rights
              reserved.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SelectSchool;
