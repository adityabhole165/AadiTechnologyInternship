import React, { useState, useEffect } from 'react';
import { ISchoolList, GetAllSchoolsResult } from "src/Interface/Authentication/SchoolList"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getSchoolList } from 'src/Client_Api/Authentication/SchoolList';
import { RootState } from 'src/store';
import school5 from 'src/assets/img/school5.jpg';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginApi from 'src/api/Authentication/Login';
import { IAuthenticateUser, IAuthenticateUserResult } from 'src/Interface/Authentication/Login'
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import school2 from 'src/assets/img/Shool_Logo/school2.png';
import { Styles } from "src/assets/style/student-style";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';


function SelectSchool() {
    const styleroot = Styles();
    const classes = Styles();

    const styles = {
        paperContainer: {
            backgroundImage: `url(${school5})`,
            backgroundColor: "#2c171738"
        },

    };
    const [show, setShow] = useState(true);
   
    const changeschool = () => {
        setShow(true);
        setValue(null);
        localStorage.clear();
    }

    const schoolNotice = () => {
        navigate('/schoolNotice');
    }

    //   select School
    const dispatch = useDispatch();
    const schoolListData = useSelector((state: RootState) => state.SchoolList.SchoolList);
    const [value, setValue] = React.useState<GetAllSchoolsResult>();
    const [inputValue, setInputValue] = React.useState('');

    if ((value !== undefined) && (value !== null)) {
        window.sessionStorage.setItem("authenticateuser", JSON.stringify(value));
        sessionStorage.setItem("SchoolId", value.SchoolId);
        localStorage.setItem("localSchoolId", value.SchoolId);
        localStorage.setItem("SchoolName", value.SchoolName);
        localStorage.setItem("SiteURL", value.SiteURL);
    }
    const Id = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const SchoolId = sessionStorage.getItem('SchoolId');
    const SchoolName = localStorage.getItem('SchoolName')
    const img_src = localStorage.getItem('SiteURL') + "/images/" + localStorage.getItem('SchoolName')?.split(' ').join('%20') + "_logo.png";
    const localschoolId=localStorage.getItem('localSchoolId')

    // end select School

    // Login form
    const navigate = useNavigate();
    const values = { username: "", password: "", showPassword: false };
    const [formValues, setFormValues] = useState(values);
    const [formError, setFormError] = useState<any>({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const [responseErr, setresponseErr] = useState('')


   
    const handleClickShowPassword = () => {
        setFormValues({
            ...formValues,
            showPassword: !formValues.showPassword,
        });
    };
       
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

   

    const formik=useFormik({
        initialValues:{
            userName:'',
            password:'',
        },

        onSubmit:values=>{
          loginform()
        },
        
        validate:values=>{ 
        
          const errors:any={}
     
          if(!values.userName){
            errors.userName="Username is Required "
        }
        if(!values.password){
          errors.password="Password is Required "
        }
   
      return errors}
      })

    const loginform = async () => {
        const body: IAuthenticateUser = {
            asUserName: formik.values.userName,
            asPassword: formik.values.password,
            asSchoolId: localschoolId
        };

       const response:any = await LoginApi.AuthenticateUser(body) 
       if(response.data != null){
        const result:IAuthenticateUserResult = await response.data.AuthenticateUserResult
        const studentDetails:any= await response.data.StudentDetails
        const teacherDetails:any= await response.data.TeacherDetails
        const adminDetails:any= await response.data.TeacherDetails
        // const adminDetails:any= await response.data.AdminStaffDetails.GetAdminStaffResult


        if(result.RoleName === "Student"){
                window.sessionStorage.setItem("AuthenticateUserResult", JSON.stringify(result));
                sessionStorage.setItem('DivisionId', studentDetails.DivisionId);
                sessionStorage.setItem('Class', studentDetails.Class);
                sessionStorage.setItem('StandardId', studentDetails.StandardId);
                sessionStorage.setItem('RollNo', studentDetails.RollNo);
                sessionStorage.setItem('AcademicYearId', studentDetails.AcademicYearId);
                sessionStorage.setItem('StudentId', studentDetails.StudentId);
                sessionStorage.setItem('StandardDivisionId', studentDetails.StandardDivisionId);
                sessionStorage.setItem('Address',studentDetails.Address);
                sessionStorage.setItem('Residence_Phone_Number',studentDetails.Residence_Phone_Number);
                sessionStorage.setItem('CasteAndSubCaste',studentDetails.CasteAndSubCaste);
                sessionStorage.setItem('UDISENumber',studentDetails.UDISENumber);
                sessionStorage.setItem('Birth_Place',studentDetails.Birth_Place);
                sessionStorage.setItem('Nationality',studentDetails.Nationality);
                sessionStorage.setItem('Mother_Tongue',studentDetails.Mother_Tongue);
                sessionStorage.setItem('Blood_Group',studentDetails.Blood_Group);
                sessionStorage.setItem('EndDate',studentDetails.EndDate);
                sessionStorage.setItem('StartDate',studentDetails.StartDate);
                sessionStorage.setItem('Language',studentDetails.asLanguage);
                sessionStorage.setItem('ParentStaffID',studentDetails.aiParentStaffId);
                sessionStorage.setItem('StartRowIndex',studentDetails.aiStartRowIndex);
                sessionStorage.setItem('SortRowIndexExpression',studentDetails.asSortExpression);
                sessionStorage.setItem('BookTittleName',studentDetails.asBookTitle);
                sessionStorage.setItem('UserName',studentDetails.asUserName);
                sessionStorage.setItem('ExamID',studentDetails.asExamId);

        }
       

        if(result.RoleName === "Teacher"){
                sessionStorage.setItem('TeacherId', teacherDetails.TeacherId);
                sessionStorage.setItem('IsClassTeacher', teacherDetails.IsClassTeacher);
                sessionStorage.setItem('DesignationName', teacherDetails.DesignationName);
                sessionStorage.setItem('DivisionId', teacherDetails.DivisionId);
                sessionStorage.setItem('StandardId', teacherDetails.StandardId);
                sessionStorage.setItem('ClassName',teacherDetails.ClassName);
                sessionStorage.setItem('AcademicYearId',teacherDetails.AcademicYearId);
                sessionStorage.setItem('EndDate',teacherDetails.EndDate);
                sessionStorage.setItem('StartDate',teacherDetails.StartDate);
        
        }
        if(result.RoleName === "Admin Staff"){
            sessionStorage.setItem('AcademicYearId', adminDetails.AcademicYearId);
            sessionStorage.setItem('DesignationName', adminDetails.DesignationName);
            sessionStorage.setItem('EndDate',adminDetails.EndDate);
            sessionStorage.setItem('StartDate',adminDetails.StartDate);
    }
    

        sessionStorage.setItem("Id", result.Id);
        sessionStorage.setItem("RoleId", result.RoleId);
        sessionStorage.setItem("StudentName", result.Name);
        sessionStorage.setItem("PhotoFilePath", result.PhotoFilePath);
        sessionStorage.setItem("Userlogin", result.UserLogin);

        if (result.RoleName == "Student") {
            navigate('/extended-sidebar/landing/landing');
        }
        else if (result.RoleName == "Teacher"){
            navigate('/extended-sidebar/landing/landing');
        }
        else if (result.RoleName == "Admin Staff"){
            navigate('/extended-sidebar/landing/landing');
        }
       }
       else{
         toast.error("Invalid Username or Password");
       }
    };
    // End Login form
    const ListData: ISchoolList = {
        "asSchoolId": "Default"
    }

    useEffect(() => {
        dispatch(getSchoolList(ListData))
        if (localschoolId !== null) {
            setShow(false);
        }   
    }, []);

   

    return (
        <Grid style={styles.paperContainer}>

            {
                show ?
                    <Grid>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '100vh', backgroundColor: "#fff5f582" }}
                            columns={{ xs: 12, md: 12 }}
                        >
                            <Grid alignItems="center" >
                                <img src={school2} />
                            </Grid>

                            <Box component="form" sx={{ maxWidth: '75%' }} >

                                <Grid item xs={12}>
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
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} className={styleroot.root} label="Select School" required variant="standard" fullWidth
                                        />}
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    :

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh', backgroundColor: "#fff5f582" }}
                        columns={{ xs: 12, md: 12 }}
                    >

                     <Box>
                        <Grid alignItems="" >
                            <img src={img_src} className={styleroot.logo}/>
                        </Grid> 
                     </Box>

                     <Box sx={{pb:5}} style={{textShadow:"7px 7px 10px gray",fontSize: "12px"}}>
                        <h1>{SchoolName}</h1>
                     </Box>

                     <Box sx={{ maxWidth: '90%'}}>
                       <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                             <Grid item xs={12}>
                                <FormControl fullWidth sx={{ mr: 1 }} variant="standard">
                                    <InputLabel htmlFor="username"
                                        sx={{
                                                color: "#362b32cf",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                    >Username</InputLabel>
                                    <Input
                                         sx={{
                                                marginTop: '20px !important',
                                                fontSize: "15px !important",
                                            }}
                                            id="username"
                                            color="secondary"
                                            name="userName"
                                            value={formik.values.userName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            defaultValue="Normal"
                                     />
                                     {
                                     formik.touched.userName && formik.errors.userName ? (<div className={classes.error}>{formik.errors.userName}</div>):null
                                     }
                                    </FormControl>
                               
                                    <FormControl fullWidth sx={{ mr: 1 , mt:1}} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password"
                                            sx={{
                                                color: "#362b32cf",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >Password</InputLabel>
                                        <Input
                                            sx={{
                                                marginTop: '20px !important',
                                                fontSize: "15px !important",
                                            }}
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
                                     formik.touched.password && formik.errors.password ? (<div className={classes.error}>{formik.errors.password}</div>):null
                                     }
                                   
                                    <Grid sx={{ mr: "auto", pt: 1,pb:3 }}>
                                            <Button variant="contained" color="success" sx={{ml:"auto"}} type="submit"  onChange={formik.handleChange}>
                                                Login
                                            </Button>
                                           <span style={{ color: "blue",float:"right",marginTop:"14px"}}> Forgot Password </span>
                                    </Grid>

                                </Grid>
                            </form>
                        </Box>
                        <Grid>
                            <span style={{ color: "blue", textDecorationLine: "none",paddingTop:3 }} onClick={changeschool}>Change School For Login</span>
                        </Grid>
                        <Grid>
                        <span style={{ color: "blue ", marginTop: '-0.7rem', textDecorationLine: 'none' }} onClick={schoolNotice}>School Notices</span>
                        </Grid>
                    </Grid>
            }
        
        </Grid>
       
    )

}

export default SelectSchool