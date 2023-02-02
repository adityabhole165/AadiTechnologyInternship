import React, { useState, useEffect } from 'react';
import { ISchoolList, GetAllSchoolsResult } from "src/interfaces/Authentication/SchoolList"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getSchoolList, getSchoolSettingsValue } from 'src/requests/Authentication/SchoolList';
import { RootState } from 'src/store';
import school5 from 'src/assets/img/school5.jpg';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginApi from 'src/api/Authentication/Login';
import { IAuthenticateUser, IAuthenticateUserResult } from 'src/interfaces/Authentication/Login'
import { Route, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import school2 from 'src/assets/img/Shool_Logo/school2.png';
import bf from 'src/assets/img/stuff/Bright Future School_logo.png';
import regulas from 'src/assets/img/Shool_Logo/regulas.jpg';
import { Styles } from "src/assets/style/student-style";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ISchoolSettings } from 'src/interfaces/Authentication/SchoolSettings';
import { HeadingStyle } from 'src/libraries/styled/HeadingStyled';
import { CardDetail1, CardDetail10, CardDetail11, InputStyle, UsernameStyle } from 'src/libraries/styled/CardStyle';
import { Divider, Paper, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import { logoURL } from 'src/components/Common/Util';
import PushNotification from '../../../libraries/PushNotification/PushNotification';
import { IPushNotificationFCM } from "src/interfaces/FCMDeviceRegistration/FCMDeviceRegistration";
import RegisterDeviceTokenApi from 'src/api/RegisterDeviceToken/RegisterDeviceToken';

function SelectSchool() {
    const styleroot = Styles();
    const classes = Styles();

    const styles = {
        paperContainer: {
            // backgroundImage: `url(${school5})`,
            backgroundColor: "white"
        },

    };
    const [show, setShow] = useState(true);
    const [LoginButtonDisabled, setLoginButtonDisabled] = useState("auto");

    const changeschool = () => {
        setShow(true);
        setValue(null);
        localStorage.clear();
    }

    const clearLocal = () => {
        localStorage.clear();
    }
    const forgotPassword = () => {
        navigate('/forgotPassword');
    }
    const schoolNotice = () => {
        navigate('/schoolNotice');
    }
    const PrivacyPolicy = () => {
        window.location.href = "http://riteschool.com/PrivacyPolicy.aspx";
        //<Route path="http://riteschool.com/PrivacyPolicy.aspx" />
    }

    //   select School
    const dispatch = useDispatch();
    const schoolListData = useSelector((state: RootState) => state.SchoolList.SchoolList);
    const schoolSettingList = useSelector((state: RootState) => state.SchoolSettings.SchoolSettings);

    const [value, setValue] = React.useState<GetAllSchoolsResult>();
    const [inputValue, setInputValue] = React.useState('');

    if ((value !== undefined) && (value !== null)) {
        window.sessionStorage.setItem("authenticateuser", JSON.stringify(value));
        sessionStorage.setItem("SchoolId", value.SchoolId);
        localStorage.setItem("localSchoolId", value.SchoolId);
        localStorage.setItem("SchoolName", value.SchoolName);
        localStorage.setItem("SiteURL", value.SiteURL);
        localStorage.setItem("TermsSchoolName", value.TermsSchoolName);
    }
    const Id = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const SchoolName = localStorage.getItem('SchoolName')
    //const img_src = localStorage.getItem('SiteURL') + "/images/" + localStorage.getItem('SchoolName')?.split(' ').join('%20') + "_logo.png";
    // const img_src = "https://riteschoolmobileservicehttpsnewui.riteschool.com/images/" + localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') + "_logo.png";
    const img_src = logoURL + localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') + "_logo.png";
    const schoolId = localStorage.getItem('localSchoolId')
    if ((schoolId != null && schoolId != undefined)) {
        localStorage.setItem("SchoolSettingsValue", JSON.stringify(schoolSettingList));
    }

    let schoolSettingAPIBody: ISchoolSettings = null;
    if ((schoolId != null && schoolId != undefined)) {
        schoolSettingAPIBody = {
            asSchoolId: schoolId
        }
    }
    // end select School

    // Login form
    const navigate = useNavigate();
    const values = { username: "", password: "", showPassword: false };
    const [formValues, setFormValues] = useState(values);

    const handleClickShowPassword = () => {
        setFormValues({
            ...formValues,
            showPassword: !formValues.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },

        onSubmit: values => {
            loginform();
            setLoginButtonDisabled("none");
        },

        validate: values => {

            const errors: any = {}

            if (!values.userName) {
                errors.userName = "Username is Required "
            }
            if (!values.password) {
                errors.password = "Password is Required "
            }

            return errors
        }
    })

    const setSession = async (response) => {
        const result: IAuthenticateUserResult = await response.data.AuthenticateUserResult
        const studentDetails: any = await response.data.StudentDetails
        const teacherDetails: any = await response.data.TeacherDetails
        const adminDetails: any = await response.data.AdminStaffDetails.GetAdminStaffResult


        if (result.RoleName === "Student") {
            window.sessionStorage.setItem("AuthenticateUserResult", JSON.stringify(result));
            sessionStorage.setItem('DivisionId', studentDetails.DivisionId);
            sessionStorage.setItem('Class', studentDetails.Class);
            sessionStorage.setItem('StandardId', studentDetails.StandardId);
            sessionStorage.setItem('RollNo', studentDetails.RollNo);
            sessionStorage.setItem('AcademicYearId', studentDetails.AcademicYearId);
            sessionStorage.setItem('AcademicYear', studentDetails.AcademicYear);
            sessionStorage.setItem('StudentId', studentDetails.StudentId);
            sessionStorage.setItem('StandardDivisionId', studentDetails.StandardDivisionId);
            sessionStorage.setItem('Address', studentDetails.Address);
            sessionStorage.setItem('ResidencePhoneNumber', studentDetails.ResidencePhoneNumber);
            sessionStorage.setItem('CasteAndSubCaste', studentDetails.CasteAndSubCaste);
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
            sessionStorage.setItem('SortRowIndexExpression', studentDetails.asSortExpression);
            sessionStorage.setItem('BookTittleName', studentDetails.asBookTitle);
            sessionStorage.setItem('UserName', studentDetails.asUserName);
            sessionStorage.setItem('ExamID', studentDetails.asExamId);
            localStorage.setItem('DOB', studentDetails.DOB);
            localStorage.setItem("UserId", result.Id);
            localStorage.setItem("RoleName", result.RoleName);
        }


        if (result.RoleName === "Teacher") {
            sessionStorage.setItem('TeacherId', teacherDetails.TeacherId);
            sessionStorage.setItem('Address', teacherDetails.Address);
            sessionStorage.setItem('IsClassTeacher', teacherDetails.IsClassTeacher);
            sessionStorage.setItem('DesignationName', teacherDetails.DesignationName);
            sessionStorage.setItem('DivisionId', teacherDetails.DivisionId);
            sessionStorage.setItem('StandardId', teacherDetails.StandardId);
            sessionStorage.setItem('StandardDivisionId', teacherDetails.StandardDivisionId);
            sessionStorage.setItem('ClassName', teacherDetails.ClassName);
            sessionStorage.setItem('AcademicYearId', teacherDetails.AcademicYearId);
            sessionStorage.setItem('EndDate', teacherDetails.EndDate);
            sessionStorage.setItem('StartDate', teacherDetails.StartDate);
            sessionStorage.setItem('SchoolName', teacherDetails.asSchoolName);
            localStorage.setItem("RoleName", result.RoleName);
            localStorage.setItem("DOB", teacherDetails.DOB);

        }

        if (result.RoleName === "Admin Staff") {
            sessionStorage.setItem('AcademicYearId', adminDetails.AcademicYearId);
            sessionStorage.setItem('Address', adminDetails.Address);
            sessionStorage.setItem('DesignationName', adminDetails.DesignationName);
            sessionStorage.setItem('EndDate', adminDetails.EndDate);
            sessionStorage.setItem('StartDate', adminDetails.StartDate);
            localStorage.setItem("RoleName", result.RoleName);
            localStorage.setItem("DOB", adminDetails.DOB);
            sessionStorage.setItem('SchoolName', adminDetails.SchoolName);
            sessionStorage.setItem('asSchoolName', adminDetails.asSchoolName);

        }


        sessionStorage.setItem("Id", result.Id);
        sessionStorage.setItem("RoleId", result.RoleId);
        sessionStorage.setItem("StudentName", result.Name);
        sessionStorage.setItem("PhotoFilePath", result.PhotoFilePath);
        sessionStorage.setItem("Userlogin", result.UserLogin);
        const url = localStorage.getItem("url");
        if (url != null) {
            navigate(url);
        }
        else if (result.RoleName == "Student") {
            navigate('/extended-sidebar/landing/landing');
        }
        else if (result.RoleName == "Teacher") {
            navigate('/extended-sidebar/landing/landing');
        }
        else if (result.RoleName == "Admin Staff") {
            navigate('/extended-sidebar/landing/landing');
        }
        console.log("$$$ Result ID to backend $$$ - " + result.Id)
        deviceRegistrationFCM(result.Id)
    }

    const loginform = async () => {
        const body: IAuthenticateUser = {
            asUserName: formik.values.userName,
            asPassword: formik.values.password,
            asSchoolId: schoolId,
            asIsSiblingLogin: false
        };

        const response: any = await LoginApi.AuthenticateUser(body)
        if (response.data != null) {
            if (response.data.AuthenticateUserResult.Message === "" ||
            response.data.AuthenticateUserResult.Message === null) {

                localStorage.setItem("auth", JSON.stringify(response));
                setSession(response);
            }
            else
                errorOccur(response.data.AuthenticateUserResult.Message)
        }
        else {
            errorOccur("Invalid Username or Password")
        }
    };
    const errorOccur = (value) => {

        toast.error(value);
        setTimeout(() => {
            setLoginButtonDisabled("auto");
        }, 3000);
    }

    const deviceRegistrationFCM = async (userId) => {
        const data: IPushNotificationFCM = {
            asSchoolId: schoolId,
            asUserId: userId.toString(),
            asRegistrationId: localStorage.getItem('FCMdeviceToken'),
            asDeviceId: localStorage.getItem('deviceId'),
            asDeviceType: localStorage.getItem('deviceType')
        }
        console.log("$$$ Data to backend $$$ - " + JSON.stringify(data))
        const response: any = await RegisterDeviceTokenApi.RegisterFCMToken(data)
        console.log("$$$ Device registration Response $$$ - " + response)
    }

    // End Login form
    const ListData: ISchoolList = {
        "asSchoolId": "Default"
    }

    useEffect(() => {
        dispatch(getSchoolList(ListData))
        if ((schoolId != null && schoolId != undefined)) {
            dispatch(getSchoolSettingsValue(schoolSettingAPIBody))
        }
        if (schoolId !== null) {
            const res = localStorage.getItem("auth")
            if (res === null) {
                setShow(false);
            } else {
                setSession(JSON.parse(res))
            }
        }
    }, [value]);


    return (
        <Grid style={styles.paperContainer} >

            {
                show ?
                    <>

                        <Grid
                            container
                            spacing={0}
                            direction="column"

                            textAlign="center"
                            style={{ minHeight: '100vh' }}
                            columns={{ xs: 12, md: 12 }}
                        >
                            <PushNotification />
                            <Grid item xs={12} alignItems="center" sx={{ mt: "30px" }} >
                                <img src={school2} />
                            </Grid>


                            <Grid item xs={12} sx={{ mx: "30px" }}>
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        if (value == null) {
                                            setShow(false)
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
                                    renderInput={(params) => <TextField {...params} className={styleroot.root} label="Select School" required variant="standard"
                                    />}
                                />
                            </Grid>
                            <Grid container sx={{ position: "absolute ", mt: "200px", disply: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Grid item xs={12}  >
                                    <a href='https://www.regulusit.net' target="_blank" rel="noreferrer">
                                        <img src={regulas} />
                                    </a>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Typography fontSize={12} sx={{ pb: "8px" }}>Copyright © {new Date().getFullYear()} isulusIT.net. All rights reserved.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </>
                    :

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        // justifyContent="center"
                        style={{ minHeight: '100vh' }}
                        columns={{ xs: 12, md: 12 }}
                    >

                        <Grid item xs={12} sx={{ mt: "30px" }}>
                        <img src={img_src} width='100%' style={{maxHeight:200}}/>
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
                                        {
                                            formik.touched.userName && formik.errors.userName ? (<div className={classes.error}>{formik.errors.userName}</div>) : null
                                        }
                                    </FormControl>

                                    <FormControl fullWidth sx={{ mr: 1, mt: 1 }} variant="standard">
                                        <UsernameStyle htmlFor="standard-adornment-password">Password</UsernameStyle>
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
                                                        {formValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {
                                        formik.touched.password && formik.errors.password ? (<div className={classes.error}>{formik.errors.password}</div>) : null
                                    }

                                    <Grid sx={{ pt: 1, pb: 3 }}>
                                        <ButtonPrimary color="primary" type="submit" onChange={formik.handleChange}

                                        >
                                            Login
                                        </ButtonPrimary>
                                        <CardDetail11 onClick={forgotPassword}> Forgot Password </CardDetail11>

                                    </Grid>

                                </Grid>
                            </form>
                        </Box>

                        <Grid>
                            <CardDetail10 onClick={changeschool}>Change School For Login</CardDetail10>
                        </Grid>
                        <Grid>
                            <CardDetail10 onClick={schoolNotice}>School Notices</CardDetail10>
                        </Grid>
                        <br />

                        <Box sx={{ flex: 1, zIndex: 9999, }} className={classes.footer}>
                            <Grid item xs={12} textAlign="center">
                                <CardDetail10>
                                    <a href='http://riteschool.com/PrivacyPolicy.aspx'>Privacy Policy</a>
                                </CardDetail10>
                            </Grid>
                            <br />
                            <Divider sx={{ background: '#5b5258', mx: "30px" }} />
                            <Grid container textAlign="center">
                                <Grid item xs={12}  >
                                    <a href='https://www.regulusit.net' target="_blank" rel="noreferrer">
                                        <img src={regulas} />
                                    </a>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Typography fontSize={12} sx={{ pb: "8px" }}>Copyright © {new Date().getFullYear()} RegulusIT.net. All rights reserved.</Typography>
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>

            }



        </Grid >
    )

}

export default SelectSchool